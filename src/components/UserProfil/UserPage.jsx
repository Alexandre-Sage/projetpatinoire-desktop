import React from "react";
import {Component} from "react";
import UserForumHistory from "./HistoryComp/UserForumHistory.jsx";
import PictureHistory from "./HistoryComp/PictureHistory.jsx";
import UserImages from "./UserComp/UserImages.jsx";
import UserInfo from "./userInfo/UserInfo.jsx";
import "./css/userPage.css";
import "../../cssBouton/btn-linear-flat.css";
import {Navigate} from "react-router-dom";

export default class UserPage extends Component{
    constructor(props){
        super(props);
        this.state={
            userProfil: [],
            displayHistory: true,
            displayUserImages: false,
            forumLinkClicked: false,
            displayUserInfo: false,
        }
    } componentDidMount(){
        document.body.classList.add("userPageBody");
        document.body.classList.remove("landingPageBody");
        fetch(`${process.env.REACT_APP_API_URL}users/userProfil/` ,{
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({userProfil: data}))
          .catch(err => {console.log(err)})
    } handleUserComponentsDisplay(event){
        switch(event.target.id){
            case "UserImagesDisplay":
                !this.state.displayUserImages? this.setState({displayUserImages: true, displayHistory: false, displayUserInfo: false}):this.setState({displayUserImages: false, displayHistory: true, displayUserInfo: false})
            break;
            case "userInfosDisplay":
                !this.state.displayUserInfo?this.setState({displayUserInfo: true, displayHistory: false, displayUserImages: false}):this.setState({displayHistory: true, displayUserInfo: false, displayUserImages: false})
            break;
            case "userToForumLink":
                this.setState({forumLinkClicked: true})
            break;
            default:
                this.setState({displayHistory: true, displayUserInfo: false, displayUserImages: false})
            break;
        }
    }  render(){
        const headerProfilJsx= this.state.userProfil.map((user, key)=> (
            <header className="userPageHeader" key={key}>
                <h2 className="userPageTitle">Profil de: {user.firstName} {user.LastName} </h2>
                <div className="userPageHeaderInfoPictureContainer">
                    <img className="userPageProfilPicture" src={`${process.env.REACT_APP_API_URL}${user.imagePath}`} alt="" />
                    <div className="userPageHeaderInfoContainer">
                        <h3 className="userPageHeaderInfo">Nom d'utilisateur: {user.userName}</h3>
                        <h3 className="userPageHeaderInfo">Spot principale: {user.homeSpot}</h3>
                        <h3 className="userPageHeaderInfo">Ville: {user.townName}</h3>
                    </div>
                </div>
            </header>
        ))
        return(
            <div className="userPageMainContainer">
                {headerProfilJsx}
                <nav className="userNavContainer">
                    <ul className="userNavBar">
                        <li>
                            <div id="UserImagesDisplay" className="btn-linear-flat" onClick={(click)=>this.handleUserComponentsDisplay(click)}>
                               <p>{!this.state.displayUserImages? "PHOTOS":"PROFIL"}</p>
                            </div>
                        </li>
                        <li>
                            <div id="userInfosDisplay" className="btn-linear-flat" onClick={(click)=>this.handleUserComponentsDisplay(click)}>
                               <p>{this.state.displayUserInfo? "PROFIL":"INFO UTILISATEUR"}</p>
                            </div>
                        </li>
                        <li>
                            <div id="userToForumLink" className="btn-linear-flat" onClick={(click)=>this.handleUserComponentsDisplay(click)}>
                               <p>FORUM</p>
                            </div>
                        </li>
                        <li>
                            <div className="btn-linear-flat">
                               <p>COVOIT</p>
                            </div>
                        </li>
                        <li>
                            <div className="btn-linear-flat">
                               <p>MESSAGERIE</p>
                            </div>
                        </li>
                    </ul>
                </nav>
                <main className="userPageMainTag">

                    {this.state.displayHistory?<PictureHistory/>: null}
                    {this.state.displayHistory?<UserForumHistory/>: null}
                    {this.state.displayUserImages?<UserImages/>: null}
                    {this.state.displayUserInfo?<UserInfo userProfil={this.state.userProfil}/>: null}
                </main>
                {this.state.forumLinkClicked? <Navigate to="/forum/categories"/>:null}
            </div>
        );
    };
}
