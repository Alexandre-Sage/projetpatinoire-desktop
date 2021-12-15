import React from "react";
import {Component} from "react";
import InscriptionForm from "./components/InscriptionForm.jsx";
import ConnexionForm from "./components/ConnexionForm.jsx";
import "./App.css"



export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            displayInscriptionForm: false,
            displayConnexionForm: false,
            displayButtonsTitle: true
        }
    } componentDidMount(){

    } addInsciptionForm(event){
        event.preventDefault();
        {!this.state.displayInscriptionForm?  this.setState({displayInscriptionForm : true}) : this.setState({displayInscriptionForm : false})}
        {this.state.displayButtonsTitle? this.setState({displayButtonsTitle: false}): this.setState({displayButtonsTitle: true})};

    } addConexionForm(event){
        event.preventDefault();
        {!this.state.displayConexionForm?  this.setState({displayConexionForm : true}) : this.setState({displayButtonsTitle : false})}
    } render(){
        const ButtonsTitleLandingPage=(
                    <React.Fragment>
                        <h1 className="landingPageTitle">lorem ipsum</h1>
                        <button className="connexionButton" type="button">Connexion</button>
                        <button className="incriptionButton" type="button" onClick={(click)=>this.addInsciptionForm(click)}>Inscription</button>
                    </React.Fragment> )
        return(
            <div className="mainContainerLandingPage">
                {this.state.displayButtonsTitle? ButtonsTitleLandingPage: null}
                {this.state.displayInscriptionForm? <InscriptionForm addInsciptionForm={(event)=>this.addInsciptionForm(event)}/> : null}
                <ConnexionForm/>
            </div>
        );
    }
};
