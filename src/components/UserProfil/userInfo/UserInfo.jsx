import React from "react";
import {Component} from "react";
import ProfilModificationForm from "./ProfilModificationForm";
import PasswordModification from "./PasswordModification";
import ParamsReader from "../../Modules/ParamsReader";

class UserInfo extends Component{
    constructor(props){
        super(props)
        this.state={
            userProfil: this.props.userProfil,
            displayForm: false,
            displayPassForm: false,
            displayInfo: true,
            owner: false
        }
    } componentDidMount(){
        // eslint-disable-next-line
        window.location==`${process.env.REACT_APP_URL}userProfil/${this.props.params.userName}`? this.setState({owner: true}): this.setState({owner: false})
    } displayUpdateForm(event){
        switch(event.target.id){
            case "buttonInfoModificationForm":
                this.state.displayForm? this.setState({displayForm: false, displayInfo: true}):this.setState({displayForm: true, displayInfo: false})
            break;
            case "buttonPasswordModificationForm":
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
            </React.Fragment>
        ))
        const modificationButton=
            <React.Fragment>
                <div id="buttonInfoModificationForm" className="btn-linear-flat" onClick={(info)=>this.displayUpdateForm(info)}>
                   <p>MODIFIER INFO</p>
                </div>
                <div id="buttonPasswordModificationForm" className="btn-linear-flat" onClick={(pass)=>this.displayUpdateForm(pass)}>
                   <p>MODIFIER MOT DE PASS</p>
                </div>
            </React.Fragment>

        return(
            <div>
                {this.state.displayInfo? userInfoJsx: null}
                {this.props.profilOwner? modificationButton: null}
                {this.state.displayForm? <ProfilModificationForm userProfil={this.state.userProfil}/>: null}
                {this.state.displayPassForm? <PasswordModification/>: null}
            </div>
        )
    }
}
export default ParamsReader(UserInfo)
