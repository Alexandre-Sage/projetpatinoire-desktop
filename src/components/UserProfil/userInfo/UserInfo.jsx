import React from "react";
import {Component} from "react";
import ProfilModificationForm from "./ProfilModificationForm";

export default class UserInfo extends Component{
    constructor(props){
        super(props)
        this.state={
            userProfil: [],
            displayForm: false,
        }
    } componentDidMount(){
        this.setState({userProfil: this.props.userProfil})
    } displayUpdateForm(){
        {this.state.displayForm? this.setState({displayForm: false}):this.setState({displayForm: true})}
    } render(){
        //this.setState({userProfil: this.props.userProfil})
        //let userInfoJsx=<p>Eror</p>
        //if(this.state.userProfil){
            const userInfoJsx=this.state.userProfil.map((detail,key)=>(
                <React.Fragment key={key}>
                    <h2>Prénom: {detail.firstName}</h2>
                    <h2>Nom: {detail.LastName}</h2>
                    <h2>Pseudo: {detail.userName}</h2>
                    <h3>Date de naissance: {detail.birthday}</h3>
                    <h3>Email: {detail.email}</h3>
                    <h3>Ville: {detail.townName}</h3>
                    <h3>Home Spot: {detail.homeSpot}</h3>
                    <div className="btn-linear-flat" onClick={(click)=>this.displayUpdateForm(click)}>
                       <p>MODIFIER</p>
                    </div>
                </React.Fragment>
            ))
    //}
        return(
            <div>

                {this.state.displayForm? <ProfilModificationForm userProfil={this.state.userProfil}/>: userInfoJsx}
            </div>
        )
    }
}
