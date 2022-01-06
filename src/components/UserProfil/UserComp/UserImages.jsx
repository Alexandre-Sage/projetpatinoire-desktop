import React from "react";
import {Component} from "react";

export default class UserImages extends Component{
    constructor(props){
        super(props);
        this.state={
            userImages: [],
            imageUpload: null,
            description: null,
            title: null,
            displayPictureUploadComponent: true,
        }
    } componentDidMount(){
        fetch(`${process.env.REACT_APP_API_URL}usersImages` ,{
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({userImages: data}))
          .catch(err => {console.log(err)})
    } handleTextInputChange(event){
        if(event.target.name==="imageTitle"){
            this.setState({title: event.target.value});
        }else{
            this.setState({description: event.target.value});
        };
    } handleFilesChange(event){
        this.setState({imageUpload: event.target.files[0]})
    } handlePictureUploads(event){
        event.preventDefault();
        const formData= new FormData()
        formData.append("image", this.state.imageUpload)
        formData.append("title",this.state.title)
        formData.append("description", this.state.description)
        fetch(`http://localhost:4000/usersImages/upload`,{
            method: "POST",
            body: formData,
            headers: { "Accept": "multipart/form-data" },
            credentials: "include",
        })
            .then(response => response.json())
            .then(response =>alert(response))
            .catch(err => {console.log(err)})
    } handleProfilPictureChange(event){
        event.preventDefault();
        fetch(`http://localhost:4000/usersImages/profilPictureChange/${parseInt(event.target.getAttribute("value"))}`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        })
            .then(response => response.json())
            .then(response =>alert(response))
            .catch(err => {alert(err)})

    } render(){
        const userImageJsx= this.state.userImages.map((image,key)=>(
            <div key={key} className="imageContainer">
                <h3 className="userImageTitle">TITRE: {image.imageTitle}</h3>
                <img className="userImage" src={`${process.env.REACT_APP_API_URL}${image.imagePath}`} alt=""/>
                <h4 className="userImageDescriptionTitle">DESCRIPTION: </h4>
                <p className="userImageDescription">{image.imageDescription}</p>
                <div onClick={(event)=>this.handleProfilPictureChange(event)} value= {image.imageId}>Changer photo du profils</div>
            </div>
        ))
        const pictureUploadsJsx=(
            <form encType="multipart/form-data" className="userImageUploadsForm">
                <label htmlFor="image">Importer une image</label>
                <input type="file" name="image" onChange={(event)=>this.handleFilesChange(event)}/>
                <label htmlFor="imageTitle">Titre de l'image</label>
                <input type="text" name="imageTitle" onChange={(event)=>this.handleTextInputChange(event)}/>
                <label htmlFor="imageDescription">Description de l'image</label>
                <input type="textarea" name="imageDescription" onChange={(event)=>this.handleTextInputChange(event)}/>
                <p type="submit" name="image" onClick={(event)=>this.handlePictureUploads(event)}>ENVOYER</p>
            </form>
        )
        return(
            <div className="userImagesMainContainer">
                {userImageJsx}
                {this.state.displayPictureUploadComponent?pictureUploadsJsx:null}
            </div>
        )
    }
}
