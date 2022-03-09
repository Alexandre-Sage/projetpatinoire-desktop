import React from "react";
import {Component} from "react";
import PopUp from "../Modules/popUp/PopUp.jsx";
import  "./css/CssInscriptionForm.css";
import  "../../cssBouton/btn_croix.css";
import "../../cssBouton/btn-linear-flat.css";

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
        const countrySelectorJsx= this.state.countries.map((countries)=>countries.map((country)=><option key={country.countryId} className="inscriptionFormOptions" value={country.countryId} name="country">{country.countryName}</option>));

        const townSelectroJsx= this.state.towns.map((towns)=>towns.map((town, key)=><option key={key} className="inscriptionFormOptions" value={town.townId} name="town">{town.townName}</option>));
        const inscriptionFormJsx=
            <React.Fragment>
                <div className="titleCloseButtonContainer">
                    <h2 className="inscriptionTitle">INSCRIPTION</h2>
                    <div onClick={(click)=>addInsciptionForm(click)} className="btn-croix">
                    </div>
                </div>
                <form className="inscriptionForm">
                    <div className="selectContainer">
                        <select className="countriesTownsSelectors"
                        onChange={(value)=>this.handleCountryChange(value)}>
                            <option className="inscriptionFormOptions">Pays</option>
                            {countrySelectorJsx}
                        </select>

                        <select className="countriesTownsSelectors"
                        onChange={(value)=>this.handleTownChange(value)}>
                            <option className="inscriptionFormOptions">Ville</option>
                            {townSelectroJsx}
                        </select>

                        <label className="inscriptionFormLabel" htmlFor="birthday">Date de naissance: </label>
                        <input type="date" className="birthdaySelector" onChange={(birthday)=>this.handleInputChange(birthday)} name="birthday"/>
                    </div>

                    <div className="namesCointainer">
                        <label className="inscriptionFormLabel" htmlFor="firstName">Nom: </label>
                        <input className="nameInput" onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="firstName"/>

                        <label className="inscriptionFormLabel" htmlFor="lastName">Prénom: </label>
                        <input className="nameInput" onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="lastName"/>
                    </div>

                    <div className="pseudoMailcontainer">
                        <label className="inscriptionFormLabel" htmlFor="email">Email: </label>
                        <input className="mailUserNameInput" onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="email"/>

                        <label className="inscriptionFormLabel" htmlFor="userName">Pseudo: </label>
                        <input className="mailUserNameInput" onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="userName" />
                    </div>
                    <div className="passwordButtonCountainer">
                        <div className="passwordCountainer">
                            <label className="inscriptionFormLabel" htmlFor="password">Mot de Passe: </label>
                            <input className="passwordInput" onChange={(password)=>this.handleInputChange(password)} type="password" name="password"/>

                            <label className="inscriptionFormLabel" htmlFor="passwordConfirmation">Confirmation Mot de Passe</label>
                            <input className="passwordInput" onChange={(password)=>this.handleInputChange(password)} type="password" name="passwordConfirmation"/>
                        </div>
                        <div className="btn-linear-flat" onClick={(click)=>this.handleSubmit(click)}>
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
