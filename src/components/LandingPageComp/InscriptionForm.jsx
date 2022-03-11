import React from "react";
import {Component} from "react";
import PopUp from "../Modules/popUp/PopUp.jsx";
import  "./css/ScssInscriptionForm.scss";

export default class InscriptionForm extends Component{
    constructor(props){
        super(props);
        this.state={
            countries:[],
            towns:[],
            answers:{},
            confirmationPassword: "",
            message: null,
            displayForm: true,
            displayPopUp: false,
        }
    } componentDidMount(){
        fetch(`${process.env.REACT_APP_API_URL}inscription/countriesInscriptionForm`)
        .then(response => response.json())
        .then(data => this.setState({countries: [data]}));
    } handleCountryChange(selectedCountry){
        fetch(`${process.env.REACT_APP_API_URL}inscription/townsInscriptionForm/${selectedCountry.target.value}`)
        .then(response => response.json())
        .then(data => this.setState({towns: [data]}))
        this.setState({answers:{...this.state.answers, "country": selectedCountry.target.value}})

    } handleTownChange(selectedTown){
        this.setState({answers:{...this.state.answers, "town":selectedTown.target.value}})
    } handleInputChange(event){
        event.target.name==="passwordConfirmation"? this.setState({confirmationPassword: event.target.value}) : this.setState({answers: {...this.state.answers, [event.target.name]: event.target.value}})
    } handleSubmit(event){
        event.preventDefault()
        //eslint-disable-next-line
        if(Object.entries(this.state.answers).length===8){
            //eslint-disable-next-line
            Object.entries(this.state.answers).map(([objectKeys, keyValues])=>{
                let confirmation=false;
                if(objectKeys==="password"){
                    keyValues===this.state.confirmationPassword? confirmation=true : confirmation=false
                    if (confirmation===false){
                        alert("Mot de passe incorect")
                    }else if(confirmation && keyValues.length< 2){
                        alert("Pas asser de caractère dans le mot de passe")
                    }else{
                        fetch(`${process.env.REACT_APP_API_URL}inscription/sendInscriptionForm`,{
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(this.state.answers),
                            credentials: 'include',
                        })
                            .then(response => response.json())
                            .then(data =>{ console.log(data);
                                this.setState({
                                    message: data.message,
                                    displayPopUp: true,
                                    displayForm: false
                                });
                            })
                            .catch(err => {console.log(err);})
                    }
                }
            })
        }else{
            alert("Veuillez renseigner tout les champ")
        }
    } render(){
        const {addInsciptionForm}= this.props;
        const countrySelectorJsx= this.state.countries.map((countries)=>countries.map((country)=><option key={country.countryId} value={country.countryId} name="country">{country.countryName}</option>));

        const townSelectroJsx= this.state.towns.map((towns)=>towns.map((town, key)=><option key={key} value={town.townId} name="town">{town.townName}</option>));
        const inscriptionFormJsx=
            <React.Fragment>
                <div className="titleCloseButtonContainer">
                    <h2>INSCRIPTION</h2>
                    <div className="closeInscriptionFormBtn" onClick={(click)=>addInsciptionForm(click)}>
                    </div>
                </div>
                <form>
                    <div className="selectContainer">
                        <select
                        onChange={(value)=>this.handleCountryChange(value)}>
                            <option>Pays</option>
                            {countrySelectorJsx}
                        </select>

                        <select
                        onChange={(value)=>this.handleTownChange(value)}>
                            <option>Ville</option>
                            {townSelectroJsx}
                        </select>

                        <label htmlFor="birthday">Date de naissance: </label>
                        <input type="date"  onChange={(birthday)=>this.handleInputChange(birthday)} name="birthday"/>
                    </div>

                    <div className="namesCointainer">
                        <label htmlFor="firstName">Nom: </label>
                        <input onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="firstName"/>

                        <label htmlFor="lastName">Prénom: </label>
                        <input onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="lastName"/>
                    </div>

                    <div className="pseudoMailcontainer">
                        <label htmlFor="email">Email: </label>
                        <input onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="email"/>

                        <label htmlFor="userName">Pseudo: </label>
                        <input onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="userName" />
                    </div>
                    <div className="passwordButtonCountainer">
                        <div className="passwordCountainer">
                            <label htmlFor="password">Mot de Passe: </label>
                            <input onChange={(password)=>this.handleInputChange(password)} type="password" name="password"/>

                            <label htmlFor="passwordConfirmation">Confirmation Mot de Passe</label>
                            <input onChange={(password)=>this.handleInputChange(password)} type="password" name="passwordConfirmation"/>
                        </div>
                        <div className="sendInscriptionFormBtn" onClick={(click)=>this.handleSubmit(click)}>
                           <p>INSCRIPTION</p>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        return(
            <div className="mainContInscriptionForm">
                {this.state.displayForm? inscriptionFormJsx : null}
                {this.state.displayPopUp?<PopUp message={this.state.message} function={()=>this.props.popUpFunction()} seconds={5000}/> : null}
            </div>
        )
    }
}
