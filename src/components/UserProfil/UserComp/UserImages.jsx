import React from "react";
import {Component} from "react";
import moment from "moment";
import ParamsReader from "../../Modules/ParamsReader";
import PopUp from "../../Modules/popUp/PopUp.jsx";
import "./css/UserImage.css";
import Carousel from "../../Modules/ImageCarousel/Carousel.jsx";

import "../../../cssBouton/btn-linear-flat.css";

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
            displayPopUpProfilPictureChange:false,
            displayPopUp: false,
            message:null,
            displayFormButtonJsx: this.props.profilOwner,
            displayFullScreen: false,
            imageId: null
        }
    } componentDidMount(){
        this.handleImageRefesh()
    } handleImageRefesh(){
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
            default:
                alert("What did you do")
            break;
        }
    } handleImageSubmit(event){
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
        .then(data=>{this.setState({
                message:data.message,
                displayPictureUploadComponent:false,
                displayFormButtonJsx: false,
                displayPopUp: true,
            })
            this.handleImageRefesh()
        })
        .catch(err=>{console.log(err)})
    } handleUserProfilPictureChange(event){
    //Fonction perméttant de changer la photo du profil, passer via les props au composant fullScreen, puis fetch l'api vers la route associer
        fetch(`http://localhost:4000/usersImages/profilPictureChange/${parseInt(event.target.getAttribute("value"))}`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        })
        .then(response => response.json())
        .then(data =>{
            this.setState({
                message:data.message,
                displayPopUpProfilPictureChange: true,
                displayImageJsx: false,
                displayFormButtonJsx: false
            })
            this.props.handleProfilsRefresh(event)
        })
        .catch(err => {alert(err)})
    } displayImageUpload(){
        this.state.displayImageJsx?this.setState({
            displayPictureUploadComponent:true,
            displayImageJsx: false,
            displayPopUp: false
        }):this.setState({
            displayPictureUploadComponent:false,
            displayImageJsx:true,
            displayFormButtonJsx: true,
            displayPopUp: false
        })
    } handleFullScreenDisplay(event){
    //Fonction perméttant d'afficher le full screen les iinforamtion de l'image sont envoyer via les props, on les récupère via les attribut personaliser de l'image puis on les passe dans le state de ce composant et on les envois dans les props de fullscreen la fonction handleUserProfilPictureChange est aussi envoyer via la props function, cette fonction aussi est envoyer via la props closeFunction.
        if(this.state.displayFullScreen){
            this.setState({
                displayImageJsx: true,
                displayFullScreen: false,
                displayFormButtonJsx: true,
            })
        }else{
            this.setState({
                displayImageJsx: false,
                displayFullScreen: true,
                displayFormButtonJsx: false,
                imageId: event.target.getAttribute("imageid")
            })
        }

    } handlePopUpFunction(){
        this.setState({
            displayImageJsx: true,
            displayPopUpProfilPictureChange:false,
            displayFormButtonJsx: true,
            displayFullScreen: false
        })
    } render(){
        const userImageJsx= this.state.userImages.map((image,key)=>(
            <div key={key} className="userImageJsxMainContainer">
                <img className="userImageJsxImage" onClick={(event)=>this.handleFullScreenDisplay(event)} src={`${process.env.REACT_APP_API_URL}${image.imagePath}`} alt={image.imageDescription}  imageid={image.imageId}/>
            </div>
        ))
        const pictureUploadsJsx=(
            <form encType="multipart/form-data" className="pictureUploadsJsxForm">
                <div className="btn-linear-flat containerFileButton">
                    <label className="pictureUploadsJsxFileLabel" htmlFor="image">Importer une image</label>
                    <input id="imageFileInput" className="pictureUploadsJsxFileInput btn-linear-flat" type="file" name="image" onChange={(event)=>this.handleUserImagesActions(event)}/>
                </div>
                <label className="pictureUploadsJsxLabel" htmlFor="imageTitle">Titre de l'image</label>
                <input id="userImageTitle" className="pictureUploadsJsxInput" type="text" name="imageTitle" onChange={(event)=>this.handleUserImagesActions(event)}/>

                <label className="pictureUploadsJsxLabel" htmlFor="imageDescription">Description de l'image</label>
                <input id="userImageDescription" className="pictureUploadsJsxInput" type="textarea" name="imageDescription" onChange={(event)=>this.handleUserImagesActions(event)}/>
                <p className="btn-linear-flat" id="submitImage" type="submit" onClick={(event)=>this.handleImageSubmit(event)}>ENVOYER</p>
            </form>
        )
        const formButtonJsx=<div id="displayImageUpload" className="userImageDisplayFormButton btn-linear-flat" onClick={(event)=>this.displayImageUpload(event)}> {this.state.displayImageJsx?"Ajouter une image":"Annuler"}</div>
        return(
            <React.Fragment>
                {this.props.profilOwner?this.state.displayFormButtonJsx?formButtonJsx:null:null}
                <div className="userImagesMainContainer">
                    {this.state.displayImageJsx?userImageJsx:null}

                    {this.state.displayFullScreen?<Carousel imagesData={this.state.userImages} imageId={this.state.imageId} profilOwner={this.props.profilOwner}  function={(event)=>this.handleUserProfilPictureChange(event)} closeFunction={(event)=>this.handleFullScreenDisplay(event)}/>: null}

                    {this.state.displayPictureUploadComponent?pictureUploadsJsx:null}
                    {this.state.displayPopUp? <PopUp message={this.state.message} function={()=>this.displayImageUpload()}
                    seconds={3000}/>:null}

                    {this.state.displayPopUpProfilPictureChange? <PopUp message={this.state.message} function={()=>this.handlePopUpFunction()}
                    seconds={3000}/>:null}
                </div>
            </React.Fragment>
        )
    }
}
export default ParamsReader(UserImages)
