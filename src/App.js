import React from "react";
import {Component} from "react";
import InscriptionForm from "./components/InscriptionForm.jsx";

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    } componentDidMount(){

    } render(){

        return(
            <div>
                <h1>lorem ipsum</h1>
                <button type="button">Connexion</button>
                <button type="button">Inscription</button>
                <InscriptionForm/>

            </div>
        );
    }
};
