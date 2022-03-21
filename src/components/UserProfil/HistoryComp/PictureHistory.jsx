import React from "react";
import {Component} from "react";
//import "./css/pictureHistoryComp.css";
import "./css/PictureHistory.scss";
import ParamsReader from "../../Modules/ParamsReader";

class PictureHistory extends Component{
    constructor(props){
        super(props);
        this.state={
            pictureHistory: [],
            owner: null
        }
    } componentDidMount(){
        fetch(`${process.env.REACT_APP_API_URL}usersImages/history/${this.props.params.userId}` ,{
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => this.setState({pictureHistory: data}))
        .catch(err => {console.log(err)})
    } render(){
        const pictureHistoryJsx= this.state.pictureHistory.map((picture, key)=>(
            <div key={key} className="pictureHistoryJsxContainer">
                <img  className="pictureHistoryJsxImage" src={`${process.env.REACT_APP_API_URL}${picture.imagePath}`} alt="" />
            </div>

       ))
        return(
            <div className="pictureHistoryMainContainer">
                {pictureHistoryJsx}
            </div>
        )
    }
}
export default ParamsReader(PictureHistory)
