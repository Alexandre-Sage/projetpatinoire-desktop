import React from "react";
import {Component} from "react";
import ProfilModificationForm from "./ProfilModificationForm";

export default class UserInfo extends Component{
    constructor(props){
        super(props)
        this.state={
            userProfil: this.props.userProfil,
            displayForm: false,
            displayPassForm: false,
            displayInfo: true,
        }
    } displayUpdateForm(event){
        switch(event.target.id){
            case "info":
                this.state.displayForm? this.setState({displayForm: false, displayInfo: true}):this.setState({displayForm: true, displayInfo: false})
            break;
            case "pass":
                this.state.displayPassForm? this.setState({displayPassForm: false, displayInfo: true}):this.setState({displayPassForm: true, displayInfo: false})
            break;
            default:
                this.setState({displayInfo: true, displayForm: false, displayPassForm: false})
            break;
        }

    } render(){
        const userInfoJsx=this.state.userProfil.map((detail,key)=>(
            <React.Fragment key={key}>
                <h2>Prénom: {detail.firstName}</h2>
                <h2>Nom: {detail.LastName}</h2>
                <h2>Pseudo: {detail.userName}</h2>
                <h3>Date de naissance: {detail.birthday}</h3>
                <h3>Email: {detail.email}</h3>
                <h3>Ville: {detail.townName}</h3>
                <h3>Home Spot: {detail.homeSpot}</h3>
                <div id="info" className="btn-linear-flat" onClick={(info)=>this.displayUpdateForm(info)}>
                   <p>MODIFIER INFO</p>
                </div>
                <div id="pass" className="btn-linear-flat" onClick={(pass)=>this.displayUpdateForm(pass)}>
                   <p>MODIFIER MOT DE PASS</p>
                </div>
                </React.Fragment>
            ))
            const passForm=<p>Hello</p>
    //}
        return(
            <div>
                {this.state.displayInfo? userInfoJsx: null}
                {this.state.displayForm? <ProfilModificationForm userProfil={this.state.userProfil}/>: null}
                {this.state.displayPassForm? passForm: null}
            </div>
        )
    }
}
