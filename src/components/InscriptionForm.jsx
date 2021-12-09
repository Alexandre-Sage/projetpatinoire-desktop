import React from "react";
import {Component} from "react";

export default class InscriptionForm extends Component{
    constructor(props){
        super(props);
        this.state={
            countries:[],
            towns:[],
        }
        /*this.handleChange=this.handleChange.bind(this);*/

    } componentDidMount(){
        fetch("http://localhost:4000/users/countriesInscriptionForm")
          .then(response => response.json())
          .then(data => this.setState({countries: [data]}));

    } handleChange(value){
        fetch(`http://localhost:4000/users/townsInscriptionForm/`+value.target.value)
        .then(response => response.json())
        .then(data => this.setState({towns: [data]}))


    } render(){
        const countrySelectorJsx= this.state.countries.map((countries)=>countries.map((country)=><option key={country.countryId} value={country.countryId}>{country.countryName}</option>));

        const townSelectroJsx= this.state.towns.map((towns)=>towns.map((town, key)=><option key={key} value={town.townId}>{town.townName}</option>));
        return(
            <div>

                <form>
                    <label htmlFor="countriesSelector">Pays</label>
                    <select onChange={(value)=>this.handleChange(value)} name="countriesSelector">
                            {countrySelectorJsx}
                    </select>

                    <label></label>
                    <select>
                        <option>Default</option>
                        {townSelectroJsx}
                    </select>

                    <label htmlFor="firstName">Nom: </label>
                    <input type="text" name="firstName"  />

                    <label htmlFor="lastName">Prénom: </label>
                    <input type="text" name="lastName"  />

                    <label htmlFor="userName">Pseudo: </label>
                    <input type="text" name="userName"  />

                    <label htmlFor="eMail">Email: </label>
                    <input type="text" name="eMail"/>

                    <label htmlFor="password">Mot de Passe: </label>
                    <input type="password" name="password"/>

                    <label htmlFor="passwordConfirmation">Confirmation Mot de Passe</label>
                    <input type="password" name="passwordConfirmation"/>
                    <button type="button">INSCRIPTION</button>
                </form>
            </div>
        )
    }
}
