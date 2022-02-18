import React from "react";
import {Component} from "react";
import moment from "moment";
import "./css/forumHistoryComp.css";
import ParamsReader from "../../Modules/ParamsReader";

class UserForumHistory extends Component{
    constructor(props){
        super(props)
        this.state={
            forumHistory: [],
        }
    } componentDidMount(){
        fetch(`${process.env.REACT_APP_API_URL}users/userProfilForumHistory/${this.props.params.userId}` ,{
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => this.setState({forumHistory:[data]}))
        .catch(err => {console.log(err)})
    } render(){
        console.log(this.state.forumHistory);
        const userHistroyJsx= this.state.forumHistory.map((postDetails)=>postDetails.map((detail, key)=>(
                <div className="userHistoryJsxContainer" key={key}>
                    <h3 className="userHistoryJsxTitle">{detail.topicTitle}</h3>
                    <div className="userHistroyJsxSmallContainer">
                        {detail.imagePath? <img className="userHistoryJsxImage" src={process.env.REACT_APP_API_URL+detail.imagePath}/>:null}
                        <p className="userHistoryJsxContent">{detail.postContent}</p>
                    </div>

                    <p className="userHistoryJsxDate">{moment(detail.postCreationDate).format("d/mm/yyyy | hh: mm")}</p>
                 </div>
             ))
        )
        return(
            <div className="userHistoryMainContainer">
                {userHistroyJsx}
            </div>
        )
    }
}
export default ParamsReader(UserForumHistory);
