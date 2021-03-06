import React from "react";
import {Component} from "react";
import ProfilHeader from "./userHeader/ProfilHeader";
import UserForumHistory from "./HistoryComp/UserForumHistory.jsx";
import PictureHistory from "./HistoryComp/PictureHistory.jsx";
import UserImages from "./UserComp/UserImages.jsx";
import UserInfo from "./userInfo/UserInfo.jsx";
import FirstConnexion from "./FirstConn/FirstConnexion.jsx";
import "./css/userPage.css";
import "../../cssBouton/btn-linear-flat.css";
import ParamsReader from "../Modules/ParamsReader";
import {Link, Navigate} from "react-router-dom";

class UserPage extends Component{
    constructor(props){
        super(props);
        this.state={
            userProfil: [],
            displayHistory: true,
            displayUserImages: false,
            displayUserInfo: false,
            owner: null,
            redirectToFlow: false,
            flowId: null,
            firstConnexion: null,
        }
    } componentDidMount(){
        this.handleProfilsRefresh()
        document.body.classList.add("userPageBody");
        document.body.classList.remove("landingPageBody", "forumPageTopicsBody", "forumPageBody", "chatPageBody");
        window.addEventListener("popstate", this.onPopstate);

    } onPopstate(event){
        //Fonction pour le bouton précédent
        event.preventDefault()
        window.history.replaceState({"test":"test"})
        console.log(event);
        alert("RETOUR")
    } handleProfilsRefresh(){
        fetch(`${process.env.REACT_APP_API_URL}users/userProfil/${this.props.params.userId}` ,{
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => this.setState({
                userProfil: data.userDetails,
                owner: data.profilOwner,
                firstConnexion: data.firstConnexion
            })
        )
        .catch(err => {console.log(err)})
    } handleFirstConnexion(){
        this.setState({
            displayFisrtConnexionComponent: true,
            displayHistory: false
        })
    } handlePictureComponentDisplay(event){
        !this.state.displayUserImages? this.setState({
            displayUserImages: true,
            displayHistory: false,
            displayUserInfo: false
        }):this.setState({
            displayUserImages: false,
            displayHistory: true,
            displayUserInfo: false
        })
    } handleUserComponentsDisplay(event){
        if(event.target.id==="UserImagesDisplay" || event.target.id=== "firstConnexionFrameStartButton"){
            !this.state.displayUserImages? this.setState({
                displayUserImages: true,
                displayHistory: false,
                displayUserInfo: false
            }):this.setState({
                displayUserImages: false,
                displayHistory: true,
                displayUserInfo: false
            })
        } else if(event.target.id==="userInfosDisplay"){
            !this.state.displayUserInfo?this.setState({
                displayUserInfo: true,
                displayHistory: false,
                displayUserImages: false
            }):this.setState({
                displayHistory: true,
                displayUserInfo: false,
                displayUserImages: false
            })
        } else{
            this.setState({
                displayHistory: true,
                displayUserInfo: false,
                displayUserImages: false
            })
        }
    } handleChatFlowCreation(event){
        fetch(`${process.env.REACT_APP_API_URL}chat/newFlow/${this.props.params.ownerId}/${this.props.params.userId}`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            //body: JSON.stringify(this.state.answers),
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data =>{
            this.setState({
                redirectToFlow: data.validator,
                flowId: data.flowId
            })
        })
        .catch(err => {console.log(err)})
    } render(){
        //console.log(this.props.history);
        console.log(this.state)
        const navBarJsx=
            <nav className="userNavContainer">
                <ul className="userNavBar">
                    <li className="userNavBarListItems">
                        <div id="UserImagesDisplay" className="btn-linear-flat navBarButton" onClick={(click)=>this.handleUserComponentsDisplay(click)}>
                           <p>{!this.state.displayUserImages? "PHOTOS":"PROFIL"}</p>
                        </div>
                    </li>
                    <li className="userNavBarListItems">
                        <div id="userInfosDisplay" className="btn-linear-flat navBarButton" onClick={(click)=>this.handleUserComponentsDisplay(click)}>
                           <p>{this.state.displayUserInfo? "PROFIL":"INFO UTILISATEUR"}</p>
                        </div>
                    </li>
                    <li className="userNavBarListItems">
                       <Link className="btn-linear-flat navBarButton" style={{"textDecoration":"none", "color":"white"}} to={this.state.owner?`/${this.props.params.userName}/${this.props.params.userId}/forum/categories`:`/${this.props.params.ownerUserName}/${this.props.params.ownerId}/forum/categories`}>FORUM</Link>
                    </li>
                    <li className="userNavBarListItems">
                        <div className="btn-linear-flat navBarButton">
                           <p>COVOIT</p>
                        </div>
                    </li>
                    <li className="userNavBarListItems">
                         {this.state.owner?<Link className="btn-linear-flat navBarButton" style={{"textDecoration":"none", "color":"white"}} to={`/userProfil/${this.props.params.userName}/${this.props.params.userId}/chat`}>MESSAGERIE</Link>:<div className="btn-linear-flat navBarButton" onClick={(event)=>this.handleChatFlowCreation(event)}>Envoyer un message</div>}
                    </li>
                </ul>
            </nav>
        return(
            <React.Fragment>
                <ProfilHeader userProfil={this.state.userProfil} handleUserComponentsDisplay={(event)=>this.handleUserComponentsDisplay(event)} firstConnexion={this.state.firstConnexion}/>
                {navBarJsx}
                <main className="userPageMainTag">
                    {this.state.displayHistory && !this.state.firstConnexion?<PictureHistory profilOwner={this.state.owner}/>: null}
                    {this.state.displayHistory && !this.state.firstConnexion?<UserForumHistory/>: null}
                    {this.state.displayUserImages?<UserImages profilOwner={this.state.owner} handleProfilsRefresh={(event)=>this.handleProfilsRefresh(event)}/>: null}
                    {this.state.displayUserInfo?<UserInfo userProfil={this.state.userProfil} profilOwner={this.state.owner} handleProfilRefresh={(event)=>this.handleProfilsRefresh(event)}/>: null}
                </main>
                {this.state.redirectToFlow?<Navigate to={`/userProfil/${this.props.params.ownerUserName}/${this.props.params.ownerId}/chat/chatFlow/${this.state.flowId}`}/>:null}
            </React.Fragment>

        );
    };
}
export default ParamsReader(UserPage)
