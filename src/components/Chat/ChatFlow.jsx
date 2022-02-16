import React from "react";
import {Component} from "react";
import moment from "moment"
import ParamsReader from "../Modules/ParamsReader";
import {Link} from "react-router-dom";

class ChatFlow extends Component{
    constructor(props){
        super(props)
        this.state={
            chatMessages:[],
            newMessage: null
        }
    } componentDidMount(){
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
            case "sendMessageButton":
                if(this.state.newMessage && this.state.newMessage.content){
                    fetch(`${process.env.REACT_APP_API_URL}chat/messages/send`,{
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(this.state.newMessage),
                        credentials: 'include',
                    })
                    .then(response => response.json())
                    .then(data =>{
                        this.setState({message: data})
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
                    })
                    .catch(err => {console.log(err)})
            }else{
                alert("Message vide")
            }
            break;
        }
    } render(){
        console.log(this.state);
        const messageJsx= this.state.chatMessages.map((message, key)=>(
            <div key={key}>
                {message.userName===this.props.params.userName?<h3>Vous</h3>: <Link to={`/${this.props.params.userName}/${this.props.params.userId}/userprofil/${message.userName}/${message.userId}`}>{message.userName}</Link>}
                <p>{message.content}</p>
                <p>{moment(message.messageSendingDate).fromNow()}</p>
                <p>{`Le: ${moment(message.messageSendingDate).format("d/mm/yyyy | hh:mm")}`}</p>
            </div>
        ));

        const sendMessageFormJsx=
            <form>
                <label htmlFor="message">Nouveau message:</label>
                <input type="textarea" name="message" onChange={(event)=>this.newMessageHandler(event)}/>
                <button name="sendMessageButton" type="button" onClick={(click)=>this.newMessageHandler(click)}>Envoyer</button>
            </form>
        return(
            <main>
                <div>
                    {messageJsx}
                </div>
                {sendMessageFormJsx}
            </main>
        )
    }
} export default ParamsReader(ChatFlow)
