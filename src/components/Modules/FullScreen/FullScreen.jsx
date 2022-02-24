import React from "react";
import {Component} from "react";
import "./FullScreen.css"
import "../../../cssBouton/btn_croix.css";

export default class FullScreen extends Component{
     componentDidMount(){
    } render(){
        console.log(this.props);
        const displayFullScreenDescriptionJsx=
            <React.Fragment>
                <p className="fullsScreenDescriptionTitle">Desicription</p>
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
        const fullScreenFunctionButtonJsx=
            <React.Fragment>
                <p className="btn-linear-flat" onClick={(event)=>this.props.function(event)} value={this.props.imageId}>Changer photo profil</p>
            </React.Fragment>
        return(

            <div className="fullScreenContainer">
                <div className="btn-croix fullScreenCloseButton" onClick={(event)=>this.props.closeFunction(event)}></div>
                {this.props.imageTitle? dipsplayFullScreenTitleJsx:null}
                <img className="fullScreenImage" src={this.props.imagePath} alt="" />
                {this.props.imageDescription==="null"? null: displayFullScreenDescriptionJsx}
                {this.props.uploadDate? displayFullScreenDateJsx: null}
                {this.props.profilOwner?this.props.function?fullScreenFunctionButtonJsx: null: null}
            </div>
        )
    }
}
