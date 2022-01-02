import React from "react";
import {Component} from "react";
import UserForumHistory from "./HistoryComp/UserForumHistory.jsx";
import PictureHistory from "./HistoryComp/PictureHistory.jsx";
import UserImages from "./UserComp/UserImages.jsx";
import "./css/userPage.css";
import "../../cssBouton/btn-linear-flat.css";

export default class UserPage extends Component{
    constructor(props){
        super(props);
        this.state={
            userProfil: [],
            displayHistory: true,
            displayUserImages: false,
        }
    } componentDidMount(){
        fetch(`${process.env.REACT_APP_API_URL}users/userProfil/` ,{
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({userProfil: data}))
          .catch(err => {console.log(err)})
    } handleUserImagesDisplay(event){
        event.preventDefault()
        if(!this.state.displayUserImages){
            this.setState({displayUserImages: true})
            this.setState({displayHistory: false})
        } else {
            this.setState({displayUserImages: false})
            this.setState({displayHistory: true})
        }
    } render(){
        const headerProfilJsx= this.state.userProfil.map((user, key)=> (
            <header className="userPageHeader" key={key}>
                <h2 className="userPageTitle">Profil de: {user.firstName} {user.LastName} </h2>
                <div className="userPageHeaderInfoContainer">
                    <h3 className="userPageHeaderInfo">Nom d'utilisateur: {user.userName}</h3>
                    <h3 className="userPageHeaderInfo">Spot principale: {user.homeSpot}</h3>
                    <h3 className="userPageHeaderInfo">Ville: {user.townName}</h3>
                </div>
                <img className="userPageProfilPicture" src={`${process.env.REACT_APP_API_URL}${user.imagePath}`} alt="" />
            </header>
        ))
        return(
            <div className="userPageMainContainer">
                {headerProfilJsx}
                <nav className="userNavBar">
                    <ul>
                        <li>
                            <div className="btn-linear-flat" onClick={(click)=>this.handleUserImagesDisplay(click)}>
                               <p>{!this.state.displayUserImages? "Photos":"Profil"}</p>
                            </div>
                        </li>
                        <li>
                            <div className="btn-linear-flat">
                               <p>INFO PROFIL</p>
                            </div>
                        </li>
                        <li>
                            <div className="btn-linear-flat">
                               <p>FORUM</p>
                            </div>
                        </li>
                        <li>
                            <div className="btn-linear-flat">
                               <p>COVOIT</p>
                            </div>
                        </li>
                    </ul>
                </nav>
                <main>
                    {this.state.displayHistory?<PictureHistory/>: null}
                    {this.state.displayHistory?<UserForumHistory/>: null}
                    {this.state.displayUserImages?<UserImages/>: null}
                </main>
            </div>
        );
    };
}
