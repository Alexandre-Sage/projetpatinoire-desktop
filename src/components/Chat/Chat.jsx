import React from "react";
import {Component} from "react";
import {Link, Navigate} from "react-router-dom";
import ParamsReader from "../Modules/ParamsReader";
import "../../cssBouton/btn-linear-flat.css";
import "./css/Chat.css"

class Chat extends Component{
    constructor(props){
        super(props)
        this.state={
            chatFlow: [],
            profilButtonClicked:false,
            //Sate stockant les données du profils non owner a visiter lors du clique sur le bouton profil d'un des fils de discussions
            userId: null,
            userName: null
        }
         //this.handleProfilLink= this.handleProfilLink.bind (this);
    } componentDidMount(){
        document.body.classList.add("chatPageBody");
        document.body.classList.remove("userPageBody");
        fetch(`${process.env.REACT_APP_API_URL}chat` ,{
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => this.setState({
                chatFlow: data
            })
        )
        .catch(err => {console.log(err)})
    } handleProfilLink(event, linkUserId, linkUserName){
        event.preventDefault()
        this.setState({
            userId: linkUserId,
            userName: linkUserName,
            profilButtonClicked:true
        })
    } render(){
        const chatFlowDisplayJsx= this.state.chatFlow.map((flowDetails, key)=>(
            <React.Fragment key={key}>
                <div className="chatFlowDisplayJsxContainer">
                    <Link className="chatFlowDisplayJsxLinkContainer" style={{textDecoration: 'none', color: "white"}} to={`/userProfil/${this.props.params.userName}/${this.props.params.userId}/chat/chatFlow/${flowDetails.flowId}`}>
                        <div className="chatFlowDisplayJsxSmallContainer">
                            <h3 className="chatFlowDisplayJsxTitle">Discussions avec:</h3>

                            <p className="chatFlowDisplayJsxUserName">{flowDetails.sendingUserName===this.props.params.userName?flowDetails.receiverUserName:flowDetails.sendingUserName}</p>
                        </div>
                        <img className="chatFlowDisplayJsxImage" src={flowDetails.sendingUserName===this.props.params.userName? process.env.REACT_APP_API_URL+flowDetails.receiverPath:process.env.REACT_APP_API_URL+flowDetails.sendingUserPath} alt="" />
                    </Link>
                    <div className="chatFlowDisplayJsxButtonsContainer">
                        <Link className="btn-linear-flat chatBtn" to={`/userProfil/${this.props.params.userName}/${this.props.params.userId}/chat/chatFlow/${flowDetails.flowId}`}>Messages</Link>
                        {flowDetails.sendingUserName===this.props.params.userName?<p onClick={(event)=>this.handleProfilLink(event, flowDetails.receiverUserId, flowDetails.receiverUserName)} className="btn-linear-flat chatBtn">Profil</p>:<p onClick={(event)=>this.handleProfilLink(event, flowDetails.sendingUserId, flowDetails.sendingUserName)} className="btn-linear-flat chatBtn">Profil</p>}
                    </div>
                </div>
            </React.Fragment>
        ))
        return(
            <main className="chatJsxMainContainer">
                {chatFlowDisplayJsx}
                {this.state.profilButtonClicked?<Navigate to={`/${this.props.params.userName}/${this.props.params.userId}/userprofil/${this.state.userName}/${this.state.userId}`}/>:null}
            </main>
        )
    }
} export default ParamsReader(Chat)
