import React from "react";
import {Component} from "react";
import  "./css/CssConnexionForm.css"
import {Navigate} from "react-router-dom";

export default class ConnexionForm extends Component{
    constructor(props){
        super(props);
        this.state={
            answers:{},
            connected: false,
            params: null,
            message: null
        }
    } handleInputChange(input){
        this.setState({answers: {...this.state.answers, [input.target.name]: input.target.value}});
    } handleConnexionButton(event){
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}users`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state.answers),
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data =>this.setState({
                        connected: data.validator,
                        params: data.userName,
                        message: data.message
                    })
                )
        .catch(err => {console.log(err);})
    } render(){
        const {addConnexionForm}= this.props;
        console.log(this.state.message);
        return(
            <div className="connexionFromMainContainer">
                <div className="closeButtonTitleConnexionFormContainer">
                    <h3 className="connexionFormTitle">Connexion</h3>
                    <div onClick={(click)=>addConnexionForm(click)} className="btn-croix">
                    </div>
                </div>
                <form className="connexionForm">
                    <div className="connexionFormEmailPasswordContainer">
                        <label className="connexionFormLabel" htmlFor="emailInput">Email utilisateur: </label>
                        <input className="connexionFormInput" type="text" name="emailInput" onChange={(email)=>this.handleInputChange((email))}/>
                        <label  className="connexionFormLabel" htmlFor="passwordInput">Mot de passe utilisateur</label>
                        <input className="connexionFormInput" type="password" name="passwordInput" onChange={(password)=>this.handleInputChange((password))} />
                    </div>
                    <div className="btn-linear-flat" onClick={(event)=>this.handleConnexionButton(event)}>
                       <p>CONNEXION</p>
                    </div>
                </form>
                {this.state.connected? <Navigate to={`/userProfil/${this.state.params}`}/>:null}
            </div>
        );
    }
}
