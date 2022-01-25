import React from "react";
import {Component} from "react";
import {Navigate, withRouter } from "react-router-dom";
//import "./css/userPage.css";

export default class CategoriesComponent extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    } componentDidMount(){

    } render(){
            console.log(this.params);
        return(
            <h1>HELLOOOOOOOOOOOOOOOOOO</h1>
        )
    }
}
