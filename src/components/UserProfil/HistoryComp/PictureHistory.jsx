import React from "react";
import {Component} from "react";
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
            <img key={key} className="pictureHistoryImg" src={`${process.env.REACT_APP_API_URL}${picture.imagePath}`} alt="" />
       ))
        return(
            <div className="pictureHistoryMainContainer">
                {pictureHistoryJsx}
            </div>
        )
    }
}
export default ParamsReader(PictureHistory)
