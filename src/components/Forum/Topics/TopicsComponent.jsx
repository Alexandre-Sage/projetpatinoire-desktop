import React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import ParamsReader from "../../Modules/ParamsReader";
import AddPostForm from "./AddPostForm";
import "./css/TopicsComponent.css";
import "../../../cssBouton/btn-linear-flat.css";
//Composant affichant le contenue d'un topic affiche aussi le formulaire perméttant d'ajouter un nouveaux post, utilise le composant HOC ParamsReader pour récupérer les paramètre de l'url.
class TopicsComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            //Récupère le contenue des topic lors du fetch a l'api
            forumPosts:[],
            //Permet d'afficher le composant AddPostForm quand la valeur deviens true
            displayAddPostForm: false
        }
    } componentDidMount(){
        //Fetch de l'api perméttant de récuperer tout les post en fonction d'un topic
        document.body.classList.add("forumPageTopicsBody");
        fetch(`${process.env.REACT_APP_API_URL}forum/posts/${this.props.params.id}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({forumPosts: data}))
          .catch(err => {console.log(err)})
    } handledisplayAddPostForm(event){
        //Fonction perméttant d'afficher le formulaire d'ajout de post
        this.state.displayAddPostForm? this.setState({displayAddPostForm: false}): this.setState({displayAddPostForm: true})
    } handelTopicRefesh(event){
        fetch(`${process.env.REACT_APP_API_URL}forum/posts/${this.props.params.id}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => this.setState({forumPosts: data}))
        .catch(err => {console.log(err)})
    } render(){
        //Element jsx qui affiche les données récupérer via l'api
        const forumPostsJsx=
            <ul className={this.state.displayAddPostForm?"forumPostsJsxListContainerForm":"forumPostsJsxListContainer"}>
                {this.state.forumPosts.map((post, key)=>(
                    <li className="forumPostsJsxListItems" key={key}>
                        <div className="forumPostsJsxSamllContainer">
                            <Link className="forumPostsJsxLink" to={this.props.params.userName===post.userName?`/userProfil/${this.props.params.userName}/${post.userId}`:`/${this.props.params.userName}/${this.props.params.userId}/userprofil/${post.userName}/${post.userId}`} >{post.userName}</Link>
                            <p className="forumPostsJsxDate">Le: {moment(post.postCreationDate).format("d/mm/yyyy | hh:mm")}</p>
                        </div>
                        {post.imagePath?<div className="forumPostsJsxImageContainer"><img className="forumPostsJsxImage" src={`${process.env.REACT_APP_API_URL}${post.imagePath}`} alt="" /></div>:null}
                        <p className="forumPostsJsxContent" >{post.postContent}</p>
                    </li>
                ))}
            </ul>
        return(
            <main className="topicsComponentMainTag" >
                <h2 className="topicsComponentTitle" >Titre du sujet: {this.props.params.topic}</h2>
                <p onClick={(event)=>this.handledisplayAddPostForm(event)} className="btn-linear-flat addPostFormButton">Répondre au sujet</p>
                {forumPostsJsx}
                {this.state.displayAddPostForm?<AddPostForm params={this.props.params} refreshOnPost={(event)=>this.handelTopicRefesh(event)}/>:null}
            </main>
        )
    }
}
export default ParamsReader(TopicsComponent)
