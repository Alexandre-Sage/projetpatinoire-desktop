import React from "react";
import {Component} from "react";

export default class InscriptionForm extends Component{
    constructor(props){
        super(props);
        this.state={
            countries:[],
            towns:[],
            answers:{},
            confirmationPassword: ""
        }
        /*this.handleChange=this.handleChange.bind(this);*/

    } componentDidMount(){
        fetch("http://localhost:4000/users/countriesInscriptionForm")
          .then(response => response.json())
          .then(data => this.setState({countries: [data]}));

    } handleCountryChange(selectedCountry){
        fetch(`http://localhost:4000/users/townsInscriptionForm/`+selectedCountry.target.value)
        .then(response => response.json())
        .then(data => this.setState({towns: [data]}))
        this.setState({answers:{...this.state.answers, "country": selectedCountry.target.value}})

    } handleTownChange(selectedTown){
        this.setState({answers:{...this.state.answers, "town":selectedTown.target.value}})
    } handleInputChange(input){
        {input.target.name==="passwordConfirmation"? this.setState({confirmationPassword: input.target.value}) : this.setState({answers: {...this.state.answers, [input.target.name]: input.target.value}})}
    } handleSubmit(event){
        event.preventDefault()
        if(Object.entries(this.state.answers).length===8){
            Object.entries(this.state.answers).map(([objectKeys, keyValues])=>{
                let confirmation=false;
                if(objectKeys==="password"){
                    {keyValues===this.state.confirmationPassword? confirmation=true : confirmation=false}
                    if (confirmation===false){
                        alert("Mot de passe incorect")
                    }else if(keyValues.length< 2){
                        alert("Pas asser de caractère dans le mot de passe")
                    }else{
                        alert("ok")
                        fetch(`http://localhost:4000/users/sendInscriptionForm`,{
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(this.state.answers),
                        })

                            .then(response => response.json())
                            .then(data =>alert(data))
                    }
                }
            })
        }else{
            alert("Veuillez renseigner tout les champ")
        }
    } render(){
        console.log("answers",this.state.answers);
        console.log("confirmationPassword:", this.state.confirmationPassword);
        const countrySelectorJsx= this.state.countries.map((countries)=>countries.map((country)=><option key={country.countryId} value={country.countryId} name="country">{country.countryName}</option>));

        const townSelectroJsx= this.state.towns.map((towns)=>towns.map((town, key)=><option key={key} value={town.townId} name="town">{town.townName}</option>));
        return(
            <div className="mainContInscriptionForm">
                <form className="inscriptionForm">
                    <label htmlFor="countriesSelector">Pays</label>
                    <select className="countriesSelector" onChange={(value)=>this.handleCountryChange(value)} name="countriesSelector">
                        <option>Default</option>
                            {countrySelectorJsx}
                    </select>

                    <label  htmlFor="townsSelector"></label>
                    <select className="townsSelector" onChange={(value)=>this.handleTownChange(value)}>
                        <option>Default</option>
                        {townSelectroJsx}
                    </select>
                    <label htmlFor="birthday">Date de naissance: </label>
                    <input type="date" onChange={(birthday)=>this.handleInputChange(birthday)} name="birthday"/>

                    <label htmlFor="firstName">Nom: </label>
                    <input className="firstNameInput" onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="firstName"  />

                    <label  htmlFor="lastName">Prénom: </label>
                    <input className="lasNameInput" onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="lastName"  />

                    <label htmlFor="userName">Pseudo: </label>
                    <input className="userNameInput" onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="userName"  />

                    <label htmlFor="email">Email: </label>
                    <input className="mailInput" onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="email"/>

                    <label htmlFor="password">Mot de Passe: </label>
                    <input className="passwordInput" onChange={(password)=>this.handleInputChange(password)} type="password" name="password"/>

                    <label htmlFor="passwordConfirmation">Confirmation Mot de Passe</label>
                    <input class="passwordInput" onChange={(password)=>this.handleInputChange(password)} type="password" name="passwordConfirmation"/>

                    <button type="submit" onClick={(click)=>this.handleSubmit(click)}>INSCRIPTION</button>
                </form>
            </div>
        )
    }
}
