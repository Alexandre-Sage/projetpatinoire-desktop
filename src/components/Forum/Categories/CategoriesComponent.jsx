import React from "react";
import moment from "moment";
import {Component} from "react";
import {Link} from "react-router-dom";
import AddTopicForm from "./AddTopicForm";
import CategoryHeader from "./CategoryHeader.jsx";
import ParamsReader from "../../Modules/ParamsReader";
import "../../../cssBouton/btn-linear-flat.css";
import "./css/CategoriesComponent.css";
//Composant affichant les sujets contenue dans une catégories permet aussi d'afficher le formulaire de création des nouveau sujets.
class CategoriesComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            forumTopics:[],
            displayAddTopicForm: false,
            displayTopicsList: true
        }
    } componentDidMount(){
        //Fetch de tout les sujets contenue dans une catégories
        document.body.classList.add("forumPageTopicsBody");
        fetch(`${process.env.REACT_APP_API_URL}forum/topics/${this.props.params.categoryId}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({forumTopics: data}))
          .catch(err => {console.log(err)})
    } handleDisplayAddTopicForm(event){
        //FOnction perméttant d'afficher le formulaires d'ajout des sujet (Pas encore utiliser)
        this.state.displayAddTopicForm? this.setState({
            displayAddTopicForm: false,
            displayTopicsList: true
        }):this.setState({
            displayAddTopicForm: true,
            displayTopicsList: false,
        })
    } render(){
        //Element jsx affichant un sujet (dynamique)
        const topicDisplayJsx=
            <ul className="topicDisplayJsxList">
                {this.state.forumTopics.map((topic, key)=>(
                    <li className="topicDisplayJsxListItem" key={key}>
                        <Link className="topicDisplayJsxLink btn3dLeft" style={{"textDecoration":"none", "color":"white"}} to={`/${this.props.params.userName}/${this.props.params.userId}/forum/category/${this.props.params.categoryId}/${this.props.params.category}/topic/${topic.topicId}/${topic.topicTitle}`}>
                            <h3 className="topicTitle">{topic.topicTitle}</h3>
                            <p>{moment(topic.topicCreationDate).format("d/mm/yyyy | hh: mm")}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        return(
            <React.Fragment>
                <CategoryHeader categoryId={this.props.params.categoryId}/>
                <main className="categoriesComponentMainTag">
                    <p className="btn-linear-flat addTopicBtn" onClick={(event)=>this.handleDisplayAddTopicForm(event)}>{this.state.displayTopicsList?"Ajouter un sujet": "Annuler"}</p>
                    {this.state.displayTopicsList?<h2 className="categoriesSmallTitle">Sujets: </h2>: null}
                    {this.state.displayTopicsList?topicDisplayJsx: null}
                    {this.state.displayAddTopicForm?<AddTopicForm categoryId={this.props.params.categoryId} categoryName={this.props.params.category} userName={this.props.params.userName}/>:null}
                </main>
            </React.Fragment>
        )
    }
}
export default ParamsReader(CategoriesComponent)
