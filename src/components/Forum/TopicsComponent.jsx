import React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import ParamsReader from "./ParamsReader";

class TopicsComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            forumPosts:[],
        }
    } componentDidMount(){
        console.log(this.props.params);
        fetch(`${process.env.REACT_APP_API_URL}forum/posts/${this.props.params.id}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({forumPosts: data}))
          .catch(err => {console.log(err)})
    } render(){
        console.log(this.state.forumPosts);
        const forumPostsJsx= <ul>
                                {this.state.forumPosts.map((post, key)=>(
                                    <li key={key}>
                                        <div>
                                            <Link to={`${post.userId}`} >{post.userName}</Link>
                                            <p>{post.postCreationDate}</p>
                                        </div>
                                        <p>{post.postContent}</p>
                                    </li>
                                ))}
                            </ul>
        return(
            <div>
                {forumPostsJsx}
            </div>
        )
    }
}
export default ParamsReader(TopicsComponent)
