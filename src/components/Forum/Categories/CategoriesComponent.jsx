import React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import AddTopicForm from "./AddTopicForm"
import ParamsReader from "../../Modules/ParamsReader";
//Composant affichant les sujets contenue dans une catégories permet aussi d'afficher le formulaire de création des nouveau sujets.
class CategoriesComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            forumTopics:[],
            displayAddTopicForm: false
        }
    } componentDidMount(){
        //Fetch de tout les sujets contenue dans une catégories
        fetch(`${process.env.REACT_APP_API_URL}forum/topics/${this.props.params.id}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({forumTopics: data}))
          .catch(err => {console.log(err)})
    } handleDisplayAddTopicForm(event){
        //FOnction perméttant d'afficher le formulaires d'ajout des sujet (Pas encore utiliser)
        this.state.displayAddTopicForm? this.setSate({displayAddTopicForm: false}):this.setSate({displayAddTopicForm: true})
    } render(){
        //Element jsx affichant un sujet (dynamique)
        const topicDisplayJsx=
            <ul>
                {this.state.forumTopics.map((topic, key)=>(
                    <li key={key}>
                        <Link to={`/${this.props.params.userName}/forum/category/${this.props.params.id}/${this.props.params.category}/topic/${topic.topicId}/${topic.topicTitle}`}>{topic.topicTitle}</Link>
                    </li>
                ))}
            </ul>
        return(
            <main>
                <h1>{this.props.params.category}</h1>
                {topicDisplayJsx}
                <h2>FORM</h2>
                <AddTopicForm categoryId={this.props.params.id} categoryName={this.props.params.category} userName={this.props.params.userName}/>
            </main>
        )
    }
}
export default ParamsReader(CategoriesComponent)
