import React from "react";
import {Component} from "react";
import {Navigate} from "react-router-dom";
import PopUp from "../../Modules/popUp/PopUp.jsx";
import ParamsReader from "../../Modules/ParamsReader.jsx";

//Composant affichant le formulaire d'ajout de sujet composant aficher depuis la route du CategoriesComponent
class AddTopicForm extends Component{
    constructor(props){
        super(props)
        this.state={
            //Réponse du formulaire d'ajout de topic
            answers:{},
            imageUpload: null,
            //Récupération de l'id du nouveaux topic pour l'url
            newTopicId: null,
            //Message a envoyer au popup
            message: null,
            //Activation du navigate
            newTopicAccepted: false,
            displayPopUp: false,
            displayErrorPopUp: false,
        }
    } handleAddTopicFormActions(event){
        //Fonction traitant les input du formulaire d'ajout de topic
        switch(event.target.name){
            case "topicTitle":
                this.setState({answers:{...this.state.answers, [event.target.name]: event.target.value}})
            break;
            case "firstTopicPost":
                this.setState({answers:{...this.state.answers, [event.target.name]: event.target.value}})
            break;
            case "pictureUpload":
                this.setState({imageUpload: event.target.files[0]})
            break;
            default:
                alert("<TU><FAIS><QUOI><LA></LA></QUOI></FAIS></TU>")
            break;
        }
    } handleSubmitNewTopic(event){
        //Envoie du Nouveaux topic a la base de données
        if(this.state.imageUpload){
            console.log("image fetch");
            const formData= new FormData()
            formData.append("image", this.state.imageUpload)
            formData.append("topicTitle",this.state.answers.topicTitle)
            formData.append("firstTopicPost",this.state.answers.firstTopicPost)
            fetch(`${process.env.REACT_APP_API_URL}forum/topic/new/${this.props.categoryId}` ,{
                method: "POST",
                body: formData,
                headers: { "Accept": "multipart/form-data" },
                credentials: "include",
            })
                .then(response => response.json())
                .then(data =>{
                    if(data.message===`Votre nouveaux sujet à bien été ajouter`){
                        this.setState({
                            newTopicId: data.topicId,
                            message: data.message,
                            displayPopUp: true,
                        })
                    } else{
                        this.setState({
                            message: data.message,
                            displayErrorPopUp: true
                        })
                    }
                })
                .catch(err => {console.log(err)})
        }else{
            console.log("No image fetch");
            fetch(`${process.env.REACT_APP_API_URL}forum/topic/new/${this.props.categoryId}` ,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state.answers),
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data =>{
                    if(data.message===`Votre nouveaux sujet à bien été ajouter`){
                        this.setState({
                            newTopicId: data.topicId,
                            message: data.message,
                            displayPopUp: true,
                        })
                    } else{
                        this.setState({
                            message: data.message,
                            displayErrorPopUp: true
                        })
                    }
                })
                .catch(err => {console.log(err)})
        }
    } handlePopUp(){
        this.state.displayPopUp? this.setState({newTopicAccepted: true}):this.setState({displayErrorPopUp: false})
    } render(){
        console.log(this.state.message);
        return(
            <form>
                <label htmlFor="topicTitle">Nom du nouveaux sujet</label>
                <input onChange={(event)=>this.handleAddTopicFormActions(event)} type="text" name="topicTitle"/>
                <label htmlFor="firstTopicPost">Premier post</label>
                <input onChange={(event)=>this.handleAddTopicFormActions(event)} type="textarea" name="firstTopicPost"/>
                <label htmlFor="pictureUpload">Ajouter une image a votre premier post</label>
                <input onChange={(event)=>this.handleAddTopicFormActions(event)} type="file" name="pictureUpload"/>
                <div onClick={(event)=>this.handleSubmitNewTopic(event)}>ENVOYER</div>
                {this.state.displayPopUp?<PopUp message={this.state.message} function={()=>this.handlePopUp()} seconds={3000}/>:null}
                {this.state.displayErrorPopUp?<PopUp message={this.state.message} function={()=>this.handlePopUp()} seconds={3000}/>:null}
                {this.state.newTopicAccepted?<Navigate to={`/${this.props.params.userName}/${this.props.params.userId}/forum/category/${this.props.categoryId}/${this.props.categoryName}/topic/${this.state.newTopicId}/${this.state.answers.topicTitle}`}/>:null}
            </form>

        )
    }
}
export default ParamsReader(AddTopicForm)
