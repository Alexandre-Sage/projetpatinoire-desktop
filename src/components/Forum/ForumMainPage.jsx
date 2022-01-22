import React from "react";
import {Component} from "react";

export default class ForumMainPage extends Component{
    constructor(props){
        super(props)
        this.state={
            forumCategories: [],
        }
    } componentDidMount(){
        document.body.classList.add("forumPageBody")
        document.body.classList.remove("userPageBody")
    } render(){
        return(
            <h1>Hello</h1>
        )
    }
}
