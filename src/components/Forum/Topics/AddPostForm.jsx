import React from "react";
import {Component} from "react";
import PopUp from "../../Modules/popUp/PopUp.jsx";
import "../../../cssBouton/btn-linear-flat.css";
import "./css/AddPostForm.css"
//Composant d'ajout des post sur un sujet du forum afficher sur la route TopicsComponent
export default class AddTopicForm extends Component{
    constructor(props){
        super(props)
        this.state={
            //Nouveau post
            answers:{},
            imageUpload: null,
            //State du redirect
            postAccepted: false,
            //Message
            message: null,
            displayPopUp: false,
            displayErrorPopUp: false,
        }
    } handleAddPostInput(event){
        //Fonction traitant les input
        // eslint-disable-next-line
        switch(event.target.name){
            case "postContent":
                this.setState({answers:{[event.target.name]: event.target.value}})
            break;
            case "imageUpload":
                this.setState({imageUpload: event.target.files[0]})
            break;
        }
    } handlePostSubmit(event){
        //Envoie les données a la base de données
        if(this.state.imageUpload){
            console.log("image fetch");
            const formData= new FormData()
            formData.append("image", this.state.imageUpload)
            formData.append("postContent",this.state.answers.postContent)
            fetch(`${process.env.REACT_APP_API_URL}forum/post/new/${this.props.params.id}` ,{
                method: "POST",
                body: formData,
                headers: { "Accept": "multipart/form-data" },
                credentials: "include",
            })
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    message: data.message,
                    postAccepted: data.validator,
                    displayPopUp: true,
                });
                if(this.state.postAccepted){
                    this.props.refreshOnPost(event);
                }
            })
            .catch(err => {console.log(err)})
        } else{
            fetch(`${process.env.REACT_APP_API_URL}forum/post/new/${this.props.params.id}`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state.answers),
                credentials: 'include',
            })
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    message: data.message,
                    postAccepted: data.validator,
                    displayPopUp: true,
                });
                if(this.state.postAccepted){
                    this.props.refreshOnPost(event);
                }
            })
            .catch(err => {console.log(err)})
        }
    } handlePopUp(){
        this.setState({displayPopUp: false})
    } render(){
        //console.log(decodeURI(window.location.history()));
        //console.log(this.props.params);
        console.log(this.state);
        return(
            <form className="addPostFormTag">
                <label className="addPostFormLabel" htmlFor="postContent">Nouveaux post: </label>
                <input className="addPostInput" onChange={(event)=>this.handleAddPostInput(event)} type="textarea" name="postContent" />
                <div className="addPostFormImageButtonContainer btn-linear-flat">
                    <label className="addPostFormImageLabel" htmlFor="imageUpload">Ajouter une image (facultatif)</label>
                    <input className="" onChange={(event)=>this.handleAddPostInput(event)} type="file" name="imageUpload"/>
                </div>
                <div className="btn-linear-flat" onClick={(event)=>this.handlePostSubmit(event)}>ENVOYER</div>
                {this.state.displayPopUp?<PopUp message={this.state.message} function={()=>this.handlePopUp()} seconds={3000}/>:null}
            </form>
        )
    }
}
