import React from "react";
import {Component} from "react";

export default class InscriptionForm extends Component{
    constructor(pops){
        super(props);
        this.state={
            countries:[],
            towns:[]
        };
    } componentDidMount(){
        fetch(process.env.REACT_APP_API_URL)
          .then(response => response.json())
          .then(data => this.setState({countries: [data]}))
    } render(){
        return(
            <div>
                <form>
                    <label></label>
                    <select></select>

                    <label></label>
                    <select></select>

                    <label></label>
                    <input type="text" name="" value="" />

                    <label></label>
                    <input type="text" name="" value="" />

                    <label></label>
                    <input type="text" name="" value="" />

                    <label></label>
                    <input type="text" name="" value="" />

                    <label></label>
                    <input type="password" name="" value="" />

                    <label></label>
                    <input type="password" name="" value="" />
                </form>
            </div>
        )
    }
}
