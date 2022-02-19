import React from "react";
import {Component} from "react";
import "./FullScreen.css"

export default class FullScreen extends Component{
    constructor(props){
        super(props)
    } componentDidMount(){
    } render(){
        return(
            <div className="fullScreenContainer">
                <h3 className="fullsScreenTitle">{this.props.imageTitle}</h3>
                <img className="fullScreenImage" src={this.props.imagePath} alt="" />
                <p className="fulleScreenDescription">{this.props.imageDescription}</p>
                <p className="fullScreenUploadDate">{this.props.uploadDate}</p>
            </div>
        )
    }
}
