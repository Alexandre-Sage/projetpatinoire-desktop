import React from "react";
import {Component} from "react";
import InscriptionForm from "./components/LandingPageComp/InscriptionForm.jsx";
import ConnexionForm from "./components/LandingPageComp/ConnexionForm.jsx";
import PictureUpload from "./components/PictureUpload.jsx"
import "./App.css"
import "./cssBouton/btn-linear-flat.css";



export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            displayInscriptionForm: false,
            displayConnexionForm: false,
            displayButtonsTitle: true,
            image:null,
        }
    } componentDidMount(){

    }  addInsciptionForm(event){
        event.preventDefault();
        {!this.state.displayInscriptionForm?  this.setState({displayInscriptionForm : true}) : this.setState({displayInscriptionForm : false})}
        {this.state.displayButtonsTitle? this.setState({displayButtonsTitle: false}): this.setState({displayButtonsTitle: true})};

    } addConnexionForm(event){
        event.preventDefault();
        {!this.state.displayConnexionForm?  this.setState({displayConnexionForm : true}) : this.setState({displayConnexionForm : false})};
        {this.state.displayButtonsTitle? this.setState({displayButtonsTitle: false}): this.setState({displayButtonsTitle: true})};
    } render(){
        //console.log(this.state);
        const ButtonsTitleLandingPage=(
            <React.Fragment>
                <h1 className="landingPageTitle">lorem ipsum</h1>
                <div className="landingPageButtonsContainer">
                    <div className="btn-linear-flat" onClick={(click)=>this.addConnexionForm(click)}>
                       <p>CONNEXION</p>
                    </div>
                    <div className="btn-linear-flat" onClick={(click)=>this.addInsciptionForm(click)}>
                       <p>INSCRIPTION</p>
                    </div>
                </div>
            </React.Fragment> )
        return(
            <main className="mainContainerLandingPage">
                <div className="blackBackLandingPage">
                    {this.state.displayButtonsTitle? ButtonsTitleLandingPage: null}
                    
                    {this.state.displayInscriptionForm? <InscriptionForm addInsciptionForm={(event)=>this.addInsciptionForm(event)}/> : null}
                    {this.state.displayConnexionForm? <ConnexionForm addConnexionForm={(event)=>this.addConnexionForm(event)}/> : null}
                </div>
        </main>
        );
    }
};
