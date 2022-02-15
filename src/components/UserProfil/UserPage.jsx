import React from "react";
import {Component} from "react";
import ProfilHeader from "./ProfilHeader";
import UserForumHistory from "./HistoryComp/UserForumHistory.jsx";
import PictureHistory from "./HistoryComp/PictureHistory.jsx";
import UserImages from "./UserComp/UserImages.jsx";
import UserInfo from "./userInfo/UserInfo.jsx";
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
            flowId: null
        }
    } componentDidMount(){
        this.handleProfilsRefresh()
        document.body.classList.add("userPageBody");
        document.body.classList.remove("landingPageBody");
    } handleProfilsRefresh(){
        fetch(`${process.env.REACT_APP_API_URL}users/userProfil/${this.props.params.userId}` ,{
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => this.setState({
                userProfil: data.userDetails,
                owner: data.profilOwner
            })
        )
        .catch(err => {console.log(err)})
    } handleUserComponentsDisplay(event){
        switch(event.target.id){
            case "UserImagesDisplay":
                !this.state.displayUserImages? this.setState({
                    displayUserImages: true,
                    displayHistory: false,
                    displayUserInfo: false
                }):this.setState({
                    displayUserImages: false,
                    displayHistory: true,
                    displayUserInfo: false
                })
            break;
            case "userInfosDisplay":
                !this.state.displayUserInfo?this.setState({
                    displayUserInfo: true,
                    displayHistory: false,
                    displayUserImages: false
                }):this.setState({
                    displayHistory: true,
                    displayUserInfo: false,
                    displayUserImages: false
                })
            break;
            default:
                this.setState({
                    displayHistory: true,
                    displayUserInfo: false,
                    displayUserImages: false
                })
            break;
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
        console.log(this.state);
        const navBarJsx=
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
                       <Link className="btn-linear-flat" to={this.state.owner?`/${this.props.params.userName}/${this.props.params.userId}/forum/categories`:`/${this.props.params.ownerUserName}/${this.props.params.ownerId}/forum/categories`}>FORUM</Link>
                    </li>
                    <li>
                        <div className="btn-linear-flat">
                           <p>COVOIT</p>
                        </div>
                    </li>
                    <li>
                         {this.state.owner?<Link className="btn-linear-flat" to={`/userProfil/${this.props.params.userName}/${this.props.params.userId}/chat`}>MESSAGERIE</Link>:<div className="btn-linear-flat" onClick={(event)=>this.handleChatFlowCreation(event)}>Envoyer un message</div>}
                    </li>
                </ul>
            </nav>
        return(
            <React.Fragment>
                <ProfilHeader userProfil={this.state.userProfil}/>
                {navBarJsx}
                <main className="userPageMainTag">
                    {this.state.displayHistory?<PictureHistory profilOwner={this.state.owner}/>: null}
                    {this.state.displayHistory?<UserForumHistory/>: null}
                    {this.state.displayUserImages?<UserImages profilOwner={this.state.owner} handleProfilsRefresh={(event)=>this.handleProfilsRefresh(event)}/>: null}
                    {this.state.displayUserInfo?<UserInfo userProfil={this.state.userProfil} profilOwner={this.state.owner} handleProfilRefresh={(event)=>this.handleProfilsRefresh(event)}/>: null}
                </main>
                {this.state.redirectToFlow?<Navigate to={`/userProfil/${this.props.params.ownerUserName}/${this.props.params.ownerId}/chat/chatFlow/${this.state.flowId}`}/>:null}
            </React.Fragment>

        );
    };
}
export default ParamsReader(UserPage)
