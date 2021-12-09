import React from "react";
import {Component} from "react";

export default class InscriptionForm extends Component{
    constructor(props){
        super(props);
        this.state={
            countries:[],
            towns:[],
            answers:{}
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
        this.setState({answers:{"country": selectedCountry.target.value}})

    } handleTownChange(selectedTown){
        this.setState({answers:{...this.state.answers, "town":selectedTown.target.value}})
    } handleInputChange(){
    
    } handleSubmit(){

    } render(){
        console.log("answers",this.state.answers);
        console.log("town", this.state.towns);
        const countrySelectorJsx= this.state.countries.map((countries)=>countries.map((country)=><option key={country.countryId} value={country.countryId}>{country.countryName}</option>));

        const townSelectroJsx= this.state.towns.map((towns)=>towns.map((town, key)=><option key={key} value={town.townId}> {town.townName}</option>));
        return(
            <div class="mainContInscriptionForm">
                <form Class="inscriptionForm">
                    <label htmlFor="countriesSelector">Pays</label>
                    <select Class="countriesSelector" onChange={(value)=>this.handleCountryChange(value)} name="countriesSelector">
                        <option>Default</option>
                            {countrySelectorJsx}
                    </select>

                    <label  htmlFor="townsSelector"></label>
                    <select class="townsSelector" onChange={(value)=>this.handleTownChange(value)}>
                        <option>Default</option>
                        {townSelectroJsx}
                    </select>

                    <label htmlFor="firstName">Nom: </label>
                    <input class="firstNameInput" type="text" name="firstName"  />

                    <label  htmlFor="lastName">Prénom: </label>
                    <input class="lasNameInput" type="text" name="lastName"  />

                    <label htmlFor="userName">Pseudo: </label>
                    <input type="text" name="userName"  />

                    <label htmlFor="eMail">Email: </label>
                    <input class="mailInput" type="text" name="eMail"/>

                    <label htmlFor="password">Mot de Passe: </label>
                    <input class="passwordInut" type="password" name="password"/>

                    <label htmlFor="passwordConfirmation">Confirmation Mot de Passe</label>
                    <input class="passwordInut" type="password" value={this.value} name="passwordConfirmation"/>

                    <button type="submit">INSCRIPTION</button>
                </form>
            </div>
        )
    }
}
