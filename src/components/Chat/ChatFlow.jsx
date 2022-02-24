import React from "react";
import {Component} from "react";
import moment from "moment"
import ParamsReader from "../Modules/ParamsReader";
import {Link} from "react-router-dom";
import "./css/ChatFlow.css"
import "../../cssBouton/btn-linear-flat.css"

class ChatFlow extends Component{
    constructor(props){
        super(props)
        this.state={
            chatMessages:[],
            newMessage: null
        }
    } componentDidMount(){
        document.body.classList.add("chatPageBody");
        this.handleMessageRefreshing()
    } handleMessageRefreshing(){
        fetch(`${process.env.REACT_APP_API_URL}chat/messages/${this.props.params.flowId}` ,{
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => this.setState({
                chatMessages: data
            })
        )
        .catch(err => {console.log(err)})
    } newMessageHandler(event){
        event.preventDefault()
        switch(event.target.name){
            case "message":
                this.setState({newMessage: {
                    "content":event.target.value,
                    "flowId": this.props.params.flowId,
                    "userId": this.props.params.userId,
                }})
            break;
        }
    } handleMessageSending(event){
        if(this.state.newMessage && this.state.newMessage.content){
            fetch(`${process.env.REACT_APP_API_URL}chat/messages/send`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state.newMessage),
                credentials: 'include',
            })
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    message: data,
                })
                document.getElementById("newMessage").value=null
                this.handleMessageRefreshing()
            })
            .catch(err => {console.log(err)})
    }else{
        alert("Message vide")
    }
    } render(){
        //setInterval(this.handleMessageRefreshing(),35000)
        const messageJsx= this.state.chatMessages.map((message, key)=>(
            <div key={key} className={message.userName===this.props.params.userName?"ownerMessage":"otherMessage"}>
                {message.userName===this.props.params.userName?<h3 className="chatSenderName">Vous</h3>: <Link className="chatSenderName" style={{"textDecoration":"none", "color":"white"}} to={`/${this.props.params.userName}/${this.props.params.userId}/userprofil/${message.userName}/${message.userId}`}>{message.userName}</Link>}
                <p className="chatMessageContent">{message.content}</p>
                <p className="chatMessageSendingDateFromNow">{moment(message.messageSendingDate).fromNow()}</p>
                <p className="chatMessageSendingDate">{`Le: ${moment(message.messageSendingDate).format("d/mm/yyyy | hh:mm")}`}</p>
            </div>
        ));

        const sendMessageFormJsx=
            <form className="newMessageForm">
                <label className="newMessageFormLabel" htmlFor="message">Nouveau message:</label>
                <textarea id="newMessage" className="newMessageFormInput" type="textarea" name="message" onChange={(event)=>this.newMessageHandler(event)} ></textarea>
                <p className="newMessageSendingButton btn-linear-flat"  onClick={(click)=>this.handleMessageSending(click)}>Envoyer</p>
            </form>
        return(
            <main className="chatFlowMain">
                <div className="chatMessageContainer">
                    {messageJsx}
                </div>
                {sendMessageFormJsx}
            </main>
        )
    }
} export default ParamsReader(ChatFlow)
