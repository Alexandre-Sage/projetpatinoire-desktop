import React from "react";
import {Component} from "react";
import  "./css/ScssConnexionForm.scss"
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
    } handleInputChange(event){
        this.setState({answers: {...this.state.answers, [event.target.name]: event.target.value}});
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
                        params: data.userParams,
                        message: data.message
                    })
                )
        .catch(err => {console.log(err);})
    } render(){
        const {addConnexionForm}= this.props;
        console.log(this.state.message);
        return(
            <div className="connexionFromMainContainer">
                <div>
                    <h3>Connexion</h3>
                    <div onClick={(click)=>addConnexionForm(click)}>
                    </div>
                </div>
                <form>
                    <div className="connexionFormEmailPasswordContainer">
                        <label htmlFor="emailInput">Email utilisateur: </label>
                        <input type="text" name="emailInput" onChange={(email)=>this.handleInputChange((email))}/>
                        <label  htmlFor="passwordInput">Mot de passe utilisateur</label>
                        <input type="password" name="passwordInput" onChange={(password)=>this.handleInputChange((password))} />
                    </div>
                    <div className="sendConnexionFormBtn" onClick={(event)=>this.handleConnexionButton(event)}>
                       CONNEXION
                    </div>
                </form>
                {this.state.connected? <Navigate to={`/userProfil/${this.state.params.userName}/${this.state.params.userId}`}/>:null}
            </div>
        );
    }
}
