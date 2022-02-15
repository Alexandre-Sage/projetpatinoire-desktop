import React from "react";
import {Component} from "react";
import PopUp from "../../Modules/popUp/PopUp.jsx";

export default class PasswordModification extends Component{
    constructor(props){
        super(props)
        this.state={
            answers:{},
            newPasswordConfirmation:"",
            message: null,
            displayPopUp:false,
            displayPopUpError:false
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
            default:
                alert("WHAT?")
            break;
        }
    } handlePasswordSending(){
        //eslint-disable-next-line
        Object.entries(this.state.answers).map(([objectKeys, keyValues])=>{
            let confirmation=false;
            if(objectKeys==="newPassword"){
                keyValues===this.state.newPasswordConfirmation? confirmation=true : confirmation=false
                if(confirmation===false){
                    this.setState({
                        message: "Mot de passe incorect",
                        displayPopUpError:true,
                    })
                } else if (keyValues.length< 2) {
                    this.setState({
                        message:"Mot de passe trop court",
                        displayPopUpError:true,
                    })
                } else{
                    fetch(`${process.env.REACT_APP_API_URL}users/updatePassword`,{
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(this.state.answers),
                        credentials: 'include',
                    })
                    .then(response => response.json())
                    .then(data =>{ if (data.message==="Mot de passe changer avec succès"
                        /*Ligne 191 userProfils.js*/){
                            this.setState({
                                message: data.message,
                                displayPopUp:true
                            })
                        }else{
                            this.setState({
                                message:data.message,
                                displayPopUpError:true,
                            })
                        }
                    })
                    .catch(err => {console.log(err)})
                }
            }
        })
    } handleErrorPopUp(){
        this.setState({
            displayPopUpError:false
        })
    } render(){
        const passwordModificationFormJsx=
            <form>
                <label className="inscriptionFormLabel" htmlFor="actualPass">Entrez votre mot de passe</label>
                <input id="actualPassword" className="nameInput" type="password" name="actualPassword" onChange={(pass)=>this.handlePasswordInputActions(pass)} />

                <label className="inscriptionFormLabel" htmlFor="newPass">Nouveaux mot de passe </label>
                <input id="newPassword" className="nameInput" type="password" name="newPassword" onChange={(pass)=>this.handlePasswordInputActions(pass)} />

                <label className="inscriptionFormLabel" htmlFor="newPassConfirmation">Confirmation du nouveaux mot de passe</label>
                <input id="passwordConfirmation" className="nameInput" type="password" name="newPassConfirmation" onChange={(pass)=>this.handlePasswordInputActions(pass)} />

                <div id="sendPasswordModification" className="btn-linear-flat" onClick={(pass)=>this.handlePasswordSending(pass)}>
                   <p>MODIFIER MOT DE PASS</p>
                </div>
            </form>
        return(
            <React.Fragment>
                {!this.state.displayPopUp?passwordModificationFormJsx:null}
                {this.state.displayPopUp?<PopUp message={this.state.message} function={()=>this.props.handleDisplayPassModificationForm()} seconds={3000}/>: null}
                {this.state.displayPopUpError? <PopUp message={this.state.message} function={()=>this.handleErrorPopUp()} seconds={3000}/>:null}
            </React.Fragment>
        )
    }
}
