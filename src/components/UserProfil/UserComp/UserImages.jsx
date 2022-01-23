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
            logger: null
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
    } handleUserImagesActions(event){
        switch(event.target.id){
            case "userImageTitle":
                this.setState({title: event.target.value});
            break;
            case "userImageDescription":
                this.setState({description: event.target.value});
            break;
            case "imageFileInput":
                this.setState({imageUpload: event.target.files[0]})
            break;
            case "submitImage":
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
            break;
            case "userProfilPictureChange":
                event.preventDefault();
                fetch(`http://localhost:4000/usersImages/profilPictureChange/${parseInt(event.target.getAttribute("value"))}`,{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    credentials: "include",
                })
                    .then(response => response.json())
                    .then(response =>alert(response))
                    .catch(err => {alert(err)})
            break;
            default:
                alert("What did you do")
            break;
        }
    } render(){
        const userImageJsx= this.state.userImages.map((image,key)=>(
            <div key={key} className="imageContainer">
                <h3 className="userImageTitle">TITRE: {image.imageTitle}</h3>
                <img className="userImage" src={`${process.env.REACT_APP_API_URL}${image.imagePath}`} alt=""/>
                <h4 className="userImageDescriptionTitle">DESCRIPTION: </h4>
                <p className="userImageDescription">{image.imageDescription}</p>
                <div id="userProfilPictureChange" onClick={(event)=>this.handleUserImagesActions(event)} value= {image.imageId}>Changer photo du profils</div>
            </div>
        ))
        const pictureUploadsJsx=(
            <form encType="multipart/form-data" className="userImageUploadsForm">
                <label htmlFor="image">Importer une image</label>
                <input id="imageFileInput" type="file" name="image" onChange={(event)=>this.handleUserImagesActions(event)}/>

                <label htmlFor="imageTitle">Titre de l'image</label>
                <input id="userImageTitle" type="text" name="imageTitle" onChange={(event)=>this.handleUserImagesActions(event)}/>

                <label htmlFor="imageDescription">Description de l'image</label>
                <input id="userImageDescription" type="textarea" name="imageDescription" onChange={(event)=>this.handleUserImagesActions(event)}/>
                <p id="submitImage" type="submit" onClick={(event)=>this.handleUserImagesActions(event)}>ENVOYER</p>
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
