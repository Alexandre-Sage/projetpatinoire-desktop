import React from "react";
import {Component} from "react";
import InscriptionForm from "./components/LandingPageComp/InscriptionForm.jsx";
import ConnexionForm from "./components/LandingPageComp/ConnexionForm.jsx";
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

    } addConnexionForm(event){
        event.preventDefault();
        {!this.state.displayConnexionForm?  this.setState({displayConnexionForm : true}) : this.setState({displayButtonsTitle : false})};
        {this.state.displayButtonsTitle? this.setState({displayButtonsTitle: false}): this.setState({displayButtonsTitle: true})};
    } render(){
        const ButtonsTitleLandingPage=(
            <React.Fragment>
                <h1 className="landingPageTitle">lorem ipsum</h1>
                <button className="connexionButton" type="button" onClick={(click)=>this.addConnexionForm(click)}>Connexion</button>
                <button className="incriptionButton" type="button" onClick={(click)=>this.addInsciptionForm(click)}>Inscription</button>
            </React.Fragment> )
        return(
            <main className="mainContainerLandingPage">
                <div className="blackBackLandingPage">
                    {this.state.displayButtonsTitle? ButtonsTitleLandingPage: null}
                    {this.state.displayInscriptionForm? <InscriptionForm addInsciptionForm={(event)=>this.addInsciptionForm(event)}/> : null}
                    {this.state.displayConnexionForm? <ConnexionForm addInsciptionForm={(event)=>this.addConnexionForm(event)}/> : null}
                </div>
                <label htmlFor="file">Dossei</label>
                <input type="file" name="file"/>
            </main>
        );
    }
};
