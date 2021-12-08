import React from "react";
import {Component} from "react";

export default class App extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    } componentDidMount(){
        let users;
        fetch(process.env.REACT_APP_API_URL+"/users")
          .then(response => response.json())
          .then(data => this.setState({countries: [data]}))
    } render(){

        return(
            <div>
                <h1>lorem ipsum</h1>
                <button type="button">Connexion</button>
                <button type="button">Inscription</button>
            </div>
        );
    }
};
