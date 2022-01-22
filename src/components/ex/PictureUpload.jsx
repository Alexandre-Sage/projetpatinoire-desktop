import React from "react";
import {Component} from "react";

export default class PictureUpload extends Component{
    constructor(props){
        super(props);
        //onChange={(event)=>this.handleFilesChange(event)}
        this.state={
            //image: null,
            //downloadImages: null,
        }
    } componentDidMount(){
    } handleFilesChange(event){
        this.setState({image: event.target.files[0]})
    } handlePictureUploads(event){
        event.preventDefault();
        const formData= new FormData()
        formData.append("image", this.state.image)

        /*for (let v of formData.entries()){
            console.log(v);
            console.log("0",v[0]);
            console.log("1",v[1]);
        }*/
        fetch(`http://localhost:4000/usersImages/upload`,{
            method: "POST",
            body: formData,
            headers: { "Accept": "multipart/form-data" },
            credentials: "include",

        })
            .then(response => response.json())
            .then(response =>alert(response))
            .catch(err => {alert("error")})

    } render(){
        return(
            <div>
            <form encType="multipart/form-data">
                <label htmlFor="image">Dossei</label>
                <input type="file" name="image" onChange={(event)=>this.handleFilesChange(event)}/>
                <button type="submit" name="image" onClick={(event)=>this.handlePictureUploads(event)} >ENVOYER</button>
            </form>
            </div>
        )
    }
}
