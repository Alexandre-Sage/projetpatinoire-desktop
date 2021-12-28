import React from "react";
import {Component} from "react";
import cookies from "js-cookies";

export default class UserPage extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    } componentDidMount(){

        console.log(document);
        const cookie=document.cookie;
        console.log(cookie);
        fetch("http://localhost:4000/users/userProfil/",{
            method: "GET",
            headers: { "Content-Type": "application/json" },
            //body: JSON.stringify(this.state.answers),
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => console.log(data));;
    } render(){
        //console.log(document.cookie);
        return(
            <h1>Hello</h1>
        );
    };
}
