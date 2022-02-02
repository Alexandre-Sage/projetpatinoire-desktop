import React from "react";
import {Component} from "react";
import UserForumHistory from "./HistoryComp/UserForumHistory.jsx";
import PictureHistory from "./HistoryComp/PictureHistory.jsx";
import UserImages from "./UserComp/UserImages.jsx";
import UserInfo from "./userInfo/UserInfo.jsx";
import "./css/userPage.css";
import "../../cssBouton/btn-linear-flat.css";
import ParamsReader from "../Modules/ParamsReader";
//import {Navigate} from "react-router-dom";

class OthersProfil extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    } componentDidMount(){
        
    } render(){
        console.log(this.props.params);
        return(
            <h1>HELLLLLLLOOOOOOOO</h1>
        )
    }
}
export default ParamsReader(OthersProfil)
