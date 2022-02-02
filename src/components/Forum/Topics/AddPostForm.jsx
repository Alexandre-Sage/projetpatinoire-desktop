import React from "react";
import {Component} from "react";
import {Navigate, Redirect} from "react-router-dom";
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
        }
    } handleAddPostInput(event){
        //Fonction traitant les input
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
                this.setState({message: data.message, postAccepted: data.validator});
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
                    postAccepted: data.validator
                })
                if(this.state.postAccepted){
                    window.location.reload(true)
                }
            })
            .catch(err => {console.log(err)})
        }
    } render(){
        //console.log(decodeURI(window.location.history()));
        //console.log(this.props.params);
        console.log(this.state);
        return(
            <form>
                <label htmlFor="postContent">Nouveaux post: </label>
                <input onChange={(event)=>this.handleAddPostInput(event)} type="textarea" name="postContent" />
                <label htmlFor="imageUpload">Ajouter une image (facultatif)</label>
                <input onChange={(event)=>this.handleAddPostInput(event)} type="file" name="imageUpload"/>
                <div onClick={(event)=>this.handlePostSubmit(event)}>ENVOYER</div>
                {/*this.state.postAccepted? <Redirect to={`/${this.props.params.userName}/forum/category/${this.props.params.categoryId}/${this.props.params.category}/topic/${this.props.params.id}/${this.props.params.topic}`}/>: null*/}
            </form>
        )
    }
}
