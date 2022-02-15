import React from "react";
import {Component} from "react";
import InscriptionForm from "./components/LandingPageComp/InscriptionForm.jsx";
import ConnexionForm from "./components/LandingPageComp/ConnexionForm.jsx";
import "./App.css"
import "./cssBouton/btn-linear-flat.css";

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            displayInscriptionForm: false,
            displayConnexionForm: false,
            displayButtonsTitle: true,
        }

    } componentDidMount(){
        document.body.classList.add("landingPageBody");
    } addInsciptionForm(/*event*/){
        //event.preventDefault();
        !this.state.displayInscriptionForm?  this.setState({
            displayInscriptionForm : true,
            displayButtonsTitle: false
        }) : this.setState({
            displayInscriptionForm : false,
            displayButtonsTitle: true
        });
    } addConnexionForm(){
        !this.state.displayConnexionForm?this.setState({
            displayConnexionForm:true,
            displayInscriptionForm:false,
            displayButtonsTitle: false
        }): this.setState({
            displayConnexionForm : false,
            displayButtonsTitle: true
        });
    } render(){
        const ButtonsTitleLandingPage=(
            <React.Fragment>
                <h1 className="landingPageTitle">lorem ipsum</h1>
                <div className="landingPageButtonsContainer">
                    <div className="btn-linear-flat" onClick={(click)=>this.addConnexionForm(click)}>
                       <p>CONNEXION</p>
                    </div>
                    <div className="btn-linear-flat" onClick={(click)=>this.addInsciptionForm(click)} >
                       <p>INSCRIPTION</p>
                    </div>
                </div>
            </React.Fragment> )
        return(
            <main className="mainContainerLandingPage">
                <div className="blackBackLandingPage">
                    {this.state.displayButtonsTitle? ButtonsTitleLandingPage: null}
                    {this.state.displayInscriptionForm? <InscriptionForm addInsciptionForm={(event)=>this.addInsciptionForm(event)} function={()=>this.addConnexionForm()}/> : null}
                    {this.state.displayConnexionForm? <ConnexionForm addConnexionForm={(event)=>this.addConnexionForm(event)}/> : null}
                </div>
            </main>
        );
    }
};
