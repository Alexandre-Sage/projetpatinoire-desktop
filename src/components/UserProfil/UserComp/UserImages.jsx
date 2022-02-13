import React from "react";
import {Component} from "react";
import ParamsReader from "../../Modules/ParamsReader";

class UserImages extends Component{
    constructor(props){
        super(props);
        this.state={
            userImages: [],
            imageUpload: null,
            description: null,
            title: null,
            displayPictureUploadComponent: false,
            displayImageJsx: true,
            message:null,
        }
    } componentDidMount(){
        fetch(`${process.env.REACT_APP_API_URL}usersImages/${this.props.params.userId}` ,{
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
                .then(response=>response.json())
                .then(data=>alert(data.message))
                .catch(err=>{console.log(err)})
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
            case "displayImageUpload":
                this.state.displayImageJsx?this.setState({
                    displayPictureUploadComponent:true,
                    displayImageJsx: false
                }):this.setState({
                    displayPictureUploadComponent:false,
                    displayImageJsx:true
                })
            break;
            default:
                alert("What did you do")
            break;
        }
    } render(){
        console.log(this.props.profilOwner);
        const userImageJsx= this.state.userImages.map((image,key)=>(
            <div key={key} className="imageContainer">
                <h3 className="userImageTitle">TITRE: {image.imageTitle}</h3>
                <img className="userImage" src={`${process.env.REACT_APP_API_URL}${image.imagePath}`} alt={image.imageDescription}/>
                <h4 className="userImageDescriptionTitle">DESCRIPTION: </h4>
                <p className="userImageDescription">{image.imageDescription}</p>
                {this.props.profilOwner?<div id="userProfilPictureChange" onClick={(event)=>this.handleUserImagesActions(event)} value= {image.imageId}>Changer photo du profils</div>: null}
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
        const displayFormButtonJsx=<div id="displayImageUpload" className="" onClick={(event)=>this.handleUserImagesActions(event)}> {this.state.displayImageJsx?"Ajouter une image":"Annuler"}</div>
        return(
            <div className="userImagesMainContainer">
                {this.props.profilOwner?displayFormButtonJsx:null}
                {this.state.displayImageJsx?userImageJsx:null}
                {this.state.displayPictureUploadComponent?pictureUploadsJsx:null}
            </div>
        )
    }
}
export default ParamsReader(UserImages)
