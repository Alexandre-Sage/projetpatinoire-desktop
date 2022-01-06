import React from "react";
import {Component} from "react";

export default class UserForumHistory extends Component{
    constructor(props){
        super(props)
        this.state={
            forumHistory: [],
        }
    } componentDidMount(){
            fetch(`${process.env.REACT_APP_API_URL}users/userProfilForumHistory` ,{
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            })
              .then(response => response.json())
              .then(data => this.setState({forumHistory:[data]}))
              .catch(err => {console.log(err)})
    } render(){
        const userHistroyJsx= this.state.forumHistory.map((postDetails)=>postDetails.map((detail, key)=>(
                <div key={key}>
                    <h3>{detail.topicTitle}</h3>
                    <p>{detail.postContent}</p>
                    <p>{detail.postCreationDate}</p>
                 </div>
             ))
        )
        return(
            <div>
            {userHistroyJsx}
        </div>
        )
    }
}
