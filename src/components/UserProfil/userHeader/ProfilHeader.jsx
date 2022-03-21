import React from "react";
import {Component} from "react";
import "./css/ProfilHeader.css"
import FirstConnexion from "../FirstConn/FirstConnexion.jsx";

export default class ProfilHeader extends Component{
    /*constructor(props) {
        super(props)
    }*/ render(){
        const headerProfilJsx= this.props.userProfil.map((user, key)=> (
            <header className="userPageHeader" key={key}>
                <div className="blueBand"></div>
                <h2 className="userPageTitle">Profil de: {user.firstName} {user.LastName} </h2>
                <div className="userPageHeaderInfoPictureContainer">
                    <img className="userPageProfilPicture" src={`${process.env.REACT_APP_API_URL}${user.imagePath}`} alt=""/>
                    <div className="userPageHeaderInfoContainer">
                        <h3 className="userPageHeaderInfo">Nom d'utilisateur: {user.userName}</h3>
                        <h3 className="userPageHeaderInfo">Spot principale: {user.homeSpot}</h3>
                        <h3 className="userPageHeaderInfo">Ville: {user.townName}</h3>
                    </div>
                </div>
                {this.props.firstConnexion?<FirstConnexion handleUserComponentsDisplay={(event)=>this.props.handleUserComponentsDisplay(event)}/>:null}
            </header>
        ))
        return(
            <React.Fragment>
                {headerProfilJsx}
            </React.Fragment>
        )
    }
}
