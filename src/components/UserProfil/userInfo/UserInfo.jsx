import React from "react";
import {Component} from "react";
import ProfilModificationForm from "./ProfilModificationForm";
import PasswordModification from "./PasswordModification";
import ParamsReader from "../../Modules/ParamsReader"
import "./css/UserInfo.scss";

class UserInfo extends Component{
    constructor(props){
        super(props)
        this.state={
            userProfil: this.props.userProfil,
            displayForm: false,
            displayPassForm: false,
            displayInfo: true,
            displayButtons: this.props.profilOwner
        }
    } componentDidMount(){
        this.props.handleProfilRefresh()
    } displayUpdateInfoForm(){
        this.state.displayForm? this.setState({
            displayForm: false,
            displayInfo: true,
            displayButtons: true
        }):this.setState({
            displayForm: true,
            displayInfo: false,
            displayButtons: false
        })
    } handleDisplayPassModificationForm(){
        this.state.displayPassForm? this.setState({
            displayPassForm: false,
            displayInfo: true,
            displayButtons: true
        }):this.setState({
            displayPassForm: true,
            displayInfo: false,
            displayButtons: false
        })
    } render(){
        const userInfoJsx=this.state.userProfil.map((detail,key)=>(
            <div className="userInfoJsxMainContainer" key={key}>
                <div>
                    <h2>Prénom: {detail.firstName}</h2>
                    <h2>Nom: {detail.LastName}</h2>
                    <h2>Pseudo: {detail.userName}</h2>
                </div>    
                <div>
                    <h3>Date de naissance: {detail.birthday}</h3>
                    <h3>Email: {detail.email}</h3>
                    <h3>Ville: {detail.townName}</h3>
                    <h3>Home Spot: {detail.homeSpot}</h3>
                </div>
            </div>
        ))
        const modificationButton=
            <div className="modificationButtonContainer">
                <div id="buttonInfoModificationForm" className="btn-linear-flat" onClick={(info)=>this.displayUpdateInfoForm(info)}>
                   <p>MODIFIER INFO</p>
                </div>
                <div id="buttonPasswordModificationForm" className="btn-linear-flat" onClick={(pass)=>this.handleDisplayPassModificationForm(pass)}>
                   <p>MODIFIER MOT DE PASS</p>
                </div>
            </div>

        return(
            <div className="infoMainContainer">
                {this.state.displayInfo? userInfoJsx: null}
                {this.state.displayButtons? modificationButton: null}
                {this.state.displayForm? <ProfilModificationForm userProfil={this.state.userProfil} handleProfilRefresh={(event)=>this.props.handleProfilRefresh(event)} displayUpdateInfoForm={(event)=>this.displayUpdateInfoForm(event)}/>: null}
                {this.state.displayPassForm? <PasswordModification handleDisplayPassModificationForm={(event)=>this.handleDisplayPassModificationForm(event)}/>: null}
            </div>
        )
    }
}
export default ParamsReader(UserInfo)
