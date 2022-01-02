import React from "react";
import {Component} from "react";

export default class PictureHistory extends Component{
    constructor(props){
        super(props);
        this.state={
            pictureHistory: [],
        }
    } componentDidMount(){
    fetch(`${process.env.REACT_APP_API_URL}usersImages/history` ,{
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
    })
      .then(response => response.json())
      .then(data => this.setState({pictureHistory: data}))
      .catch(err => {console.log(err)})
    } render(){
        //console.log("there",this.state);
        const pictureHistoryJsx= this.state.pictureHistory.map((picture, key)=>(
            <img key={key} className="pictureHistoryImg" src={`${process.env.REACT_APP_API_URL}${picture.imagePath}`} alt="" />
       ))
        return(
            <div className="pictureHistoryMainContainer">
                {pictureHistoryJsx}
            </div>
        )
    }
}
