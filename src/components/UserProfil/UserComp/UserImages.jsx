import React from "react";
import {Component} from "react";
import ParamsReader from "../../Modules/ParamsReader";
import PopUp from "../../Modules/popUp/PopUp.jsx";

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
            displayFormButtonJsx: this.props.profilOwner
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
    } handlePopUpFunction(){
        this.setState({
            displayImageJsx: true,
            displayPopUpProfilPictureChange:false,
            displayFormButtonJsx: true
        })
    } render(){
        const userImageJsx= this.state.userImages.map((image,key)=>(
            <div key={key} className="imageContainer">
                <h3 className="userImageTitle">TITRE: {image.imageTitle}</h3>
                <img className="userImage" src={`${process.env.REACT_APP_API_URL}${image.imagePath}`} alt={image.imageDescription}/>
                <h4 className="userImageDescriptionTitle">DESCRIPTION: </h4>
                <p className="userImageDescription">{image.imageDescription}</p>
                {this.props.profilOwner?<div id="userProfilPictureChange" onClick={(event)=>this.handleUserProfilPictureChange(event)} value= {image.imageId}>Changer photo du profils</div>: null}
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
                <p id="submitImage" type="submit" onClick={(event)=>this.handleImageSubmit(event)}>ENVOYER</p>
            </form>
        )
        const displayFormButtonJsx=<div id="displayImageUpload" className="" onClick={(event)=>this.displayImageUpload(event)}> {this.state.displayImageJsx?"Ajouter une image":"Annuler"}</div>
        return(
            <div className="userImagesMainContainer">
                {this.state.displayFormButtonJsx?displayFormButtonJsx:null}
                {this.state.displayImageJsx?userImageJsx:null}
                {this.state.displayPictureUploadComponent?pictureUploadsJsx:null}
                {this.state.displayPopUp? <PopUp message={this.state.message} function={()=>this.displayImageUpload()}
                seconds={3000}/>:null}
                {this.state.displayPopUpProfilPictureChange? <PopUp message={this.state.message} function={()=>this.handlePopUpFunction()}
                seconds={3000}/>:null}
            </div>
        )
    }
}
export default ParamsReader(UserImages)
