import React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import ParamsReader from "../../Modules/ParamsReader";
import AddPostForm from "./AddPostForm";
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
        this.state.displayAddPostForm? this.setSate({displayAddPostForm: false}): this.setState({displayAddPostForm: true})
    } render(){
        //Element jsx qui affiche les données récupérer via l'api
        const forumPostsJsx= <ul>
                                {this.state.forumPosts.map((post, key)=>(
                                    <li key={key}>
                                        <div>
                                            <Link to={this.props.params.userName===post.userName?`/userProfil/${this.props.params.userName}`:`/otherProfil/${post.userId}/${post.userName}`} >{post.userName}</Link>
                                            <p>{post.postCreationDate}</p>
                                        </div>
                                        {post.imagePath?<img src={`${process.env.REACT_APP_API_URL}${post.imagePath}`} alt="" />:null}
                                        <p>{post.postContent}</p>
                                    </li>
                                ))}
                            </ul>
        return(
            <main>
                {forumPostsJsx}
                <h2>FORM</h2>
                <AddPostForm params={this.props.params}/>
            </main>
        )
    }
}
export default ParamsReader(TopicsComponent)
