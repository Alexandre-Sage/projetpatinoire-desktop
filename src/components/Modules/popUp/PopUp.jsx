import React from "react";
import {Component} from "react";

export default class PopUp extends Component{
    constructor(props){
        super(props)
        this.state={
            message: null,
        }
        console.log("from popup", this.props);
    } componentDidMount(){
        this.setState({
            message: this.props.message,
        })
        setTimeout(()=>{this.props.function()},this.props.seconds)
    } render(){
        console.log("from popup",this.state);
        return(
            <div className="popUpMainContainer">
                <h3 className="popUpTitle">Message: </h3>
                <p className="popUpMessage">{this.state.message}</p>
            </div>
        )
    }
}
