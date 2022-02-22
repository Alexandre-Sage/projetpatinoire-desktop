import React from "react";
import {Component} from "react";
import "./FullScreen.css"

export default class FullScreen extends Component{
    constructor(props){
        super(props)
    } componentDidMount(){
    } render(){
        console.log(this.props);
        const displayFullScreenDescriptionJsx=
            <React.Fragment>
                <p className="descriptionDescirtionTitle">Desicription</p>
                <p className="fulleScreenDescription">{this.props.imageDescription}</p>
            </React.Fragment>
        const displayFullScreenDateJsx=
            <React.Fragment>
                <p className="fullScreenDateTitle">Ajouter le: </p>
                <p className="fullScreenUploadDate">{this.props.uploadDate}</p>
            </React.Fragment>
        const dipsplayFullScreenTitleJsx=
            <React.Fragment>
                <h3 className="fullsScreenTitle">{this.props.imageTitle}</h3>
            </React.Fragment>
        return(
            <div className="fullScreenContainer">
                {this.props.imageTitle? dipsplayFullScreenTitleJsx:null}
                <img className="fullScreenImage" src={this.props.imagePath} alt="" />
                {this.props.imageDescription==="null"? null: displayFullScreenDescriptionJsx}
                {this.props.uploadDate? displayFullScreenDateJsx: null}
            </div>
        )
    }
}
