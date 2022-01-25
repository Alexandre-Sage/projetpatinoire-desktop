import React from "react";
import {Component} from "react";

export default class PasswordModification extends Component{
    constructor(props){
        super(props)
        this.state={
            answers:{},
            newPasswordConfirmation:""
        }
    } handlePasswordInputActions(event){
        switch(event.target.id){
            case "actualPassword":
                this.setState({answers: {...this.state.answers, [event.target.name]: event.target.value}})
            break;
            case "newPassword":
                this.setState({answers: {...this.state.answers, [event.target.name]: event.target.value}})
            break;
            case "passwordConfirmation":
                this.setState({newPasswordConfirmation: event.target.value})
            break;
            case "sendPasswordModification":
                Object.entries(this.state.answers).map(([objectKeys, keyValues])=>{
                    let confirmation=false;
                    if(objectKeys==="newPassword"){
                        console.log(keyValues);
                        keyValues===this.state.newPasswordConfirmation? confirmation=true : confirmation=false
                        if(confirmation===false){
                            alert("Mot de passe incorect")
                        } else if (keyValues.length< 2) {
                            alert("Mot de passe trop court")
                        } else{
                            fetch(`${process.env.REACT_APP_API_URL}users/updatePassword`,{
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(this.state.answers),
                                credentials: 'include',
                            })
                                .then(response => response.json())
                                .then(data =>console.log(data))
                                .catch(err => {console.log(err)})
                        }
                    }
                })
            break;
        }
    } render(){
        const passwordModificationFormJsx=  <form>
                                                <label className="inscriptionFormLabel" htmlFor="actualPass">Entrez votre mot de passe</label>
                                                <input id="actualPassword" className="nameInput" type="password" name="actualPassword" onChange={(pass)=>this.handlePasswordInputActions(pass)} />

                                                <label className="inscriptionFormLabel" htmlFor="newPass">Nouveaux mot de passe </label>
                                                <input id="newPassword" className="nameInput" type="password" name="newPassword" onChange={(pass)=>this.handlePasswordInputActions(pass)} />

                                                <label className="inscriptionFormLabel" htmlFor="newPassConfirmation">Confirmation du nouveaux mot de passe</label>
                                                <input id="passwordConfirmation" className="nameInput" type="password" name="newPassConfirmation" onChange={(pass)=>this.handlePasswordInputActions(pass)} />

                                                <div id="sendPasswordModification" className="btn-linear-flat" onClick={(pass)=>this.handlePasswordInputActions(pass)}>
                                                   <p>MODIFIER MOT DE PASS</p>
                                                </div>
                                            </form>
        return(
            <React.Fragment>
                {passwordModificationFormJsx}
            </React.Fragment>
        )
    }
}
