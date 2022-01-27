import React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import ParamsReader from "./ParamsReader";

class CategoriesComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            forumTopics:[],
        }
    } componentDidMount(){
        fetch(`${process.env.REACT_APP_API_URL}forum/topics/${this.props.params.id}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({forumTopics: data}))
          .catch(err => {console.log(err)})
    } render(){
        console.log(this.state.forumTopics);
        const topicDisplayJsx=
            <ul>
                {this.state.forumTopics.map((topic, key)=>(
                    <li key={key}>
                        <Link to={`/forum/category/${this.props.params.id}/${this.props.params.category}/topic/${topic.topicId}/${topic.topicTitle}`}>{topic.topicTitle}</Link>
                    </li>
                ))}
            </ul>
        return(
            <div>
                <h1>{this.props.params.category}</h1>
                {topicDisplayJsx}
            </div>
        )
    }
}
export default ParamsReader(CategoriesComponent)
