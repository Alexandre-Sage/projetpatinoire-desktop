import React from "react";
import {Component} from "react";
import PictureUpload from "../PictureUpload.jsx"
import UserForumHistory from "./UserForumHistory.jsx"

export default class UserPage extends Component{
    constructor(props){
        super(props);
        this.state={
            userProfil: [],
            displayHistory: true,
        }
    } componentDidMount(){;
        fetch(`${process.env.REACT_APP_API_URL}users/userProfil/` ,{
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({userProfil: data}))
          .catch(err => {console.log(err)})
    } render(){
        const headerProfilJsx= this.state.userProfil.map((user, key)=> (
            <header className="userPageHeader" key={key}>
                <h2 className="userPageTitle">Profil de: {user.firstName} {user.LastName} </h2>
                <div className="userPageHeaderInfoContainer">
                    <h3 className="userPageHeaderInfo">Nom d'utilisateur: {user.userName}</h3>
                    <h3 className="userPageHeaderInfo">Spot principale: {user.homeSpot}</h3>
                    <h3 className="userPageHeaderInfo">Ville: {user.townName}</h3>
                </div>
                <img className="userPageProfilPicture" src={`${process.env.REACT_APP_API_URL}${user.profilPicture}`} alt="" />
            </header>
        ))
        return(

            <div className="userPageMainContainer">
                    {headerProfilJsx}
                    <nav>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </nav>
                    {this.state.displayHistory?<UserForumHistory/>: null}
                    <PictureUpload/>

            </div>
        );
    };
}
