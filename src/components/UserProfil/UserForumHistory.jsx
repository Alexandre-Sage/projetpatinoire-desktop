import React from "react";
import {Component} from "react";

export default class UserForumHistory extends Component{
    constructor(props){
        super(props)
        this.state={
            ForumHistory: [],
        }
    } componentDidMount(){
            fetch("http://localhost:4000/users/userProfilHistory/",{
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            })
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(err => {console.log(err)})
    } render(){
        return(
            <main>
            <h1>HELLO</h1>
            </main>
        )
    }
}
