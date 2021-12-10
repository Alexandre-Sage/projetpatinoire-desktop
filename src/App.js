import React from "react";
import {Component} from "react";
import InscriptionForm from "./components/InscriptionForm.jsx";
import "./App.css"



export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            displayInscriptionForm: false,
            displayInscriptionButton: true,
            displayConnexionForm: false,
            displayConnexionButton: true,
            displayMainTitle: true
        }
    } componentDidMount(){

    } addInsciptionForm(event){
        event.preventDefault();
        {!this.state.displayInscriptionForm?  this.setState({displayInscriptionForm : true}) : this.setState({displayInscriptionForm : false})}

        {this.state.displayInscriptionButton? this.setState({displayInscriptionButton: false}): this.setState({displayInscriptionButton: true})};

        {this.state.displayConnexionButton?this.setState({displayConnexionButton: false}):this.setState({displayConnexionButton:true})};

        {this.state.displayMainTitle?this.setState({displayMainTitle: false}):this.setState({displayMainTitle: true})}
        ;
    } addConexionForm(event){
        event.preventDefault();
        {!this.state.displayConexionForm?  this.setState({displayConexionForm : true}) : this.setState({displayConexionForm : false})}
        this.setState({displayInscriptionButton: false});
        this.setState({displayConnexionButton: false});
        this.setState({displayMainTitle: false});
    } render(){

        return(
            <div className="mainContainerLandingPage">
                {this.state.displayMainTitle? <h1>lorem ipsum</h1> : null}
                {this.state.displayConnexionButton? <button type="button">Connexion</button>: null}
                {this.state.displayInscriptionButton? <button type="button" onClick={(click)=>this.addInsciptionForm(click)}>Inscription</button> : null}
                {this.state.displayInscriptionForm? <InscriptionForm addInsciptionForm={(event)=>this.addInsciptionForm(event)}/> : null}

            </div>
        );
    }
};
