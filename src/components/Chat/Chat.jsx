import React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import ParamsReader from "../Modules/ParamsReader";

class Chat extends Component{
    constructor(props){
        super(props)
        this.state={
            chatFlow: [],
        }
    } componentDidMount(){
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
    } render(){
        const chatFlowDisplayJsx= this.state.chatFlow.map((flowDetails, key)=>(
            <React.Fragment key={key}>
                <Link to={`/userProfil/${this.props.params.userName}/${this.props.params.userId}/chat/chatFlow/${flowDetails.flowId}`}>
                    <h3>Discussions avec:</h3>
                    <p>{flowDetails.sendingUserName===this.props.params.userName?flowDetails.receiverUserName:flowDetails.sendingUserName}</p>
                </Link>


            </React.Fragment>
        ))
        return(
            <main>
                {chatFlowDisplayJsx}
            </main>
        )
    }
} export default ParamsReader(Chat)
