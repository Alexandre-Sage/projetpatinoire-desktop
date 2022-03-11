import React from "react";
import {Component} from "react";
import "./Carousel.scss";

export default class Carousel extends Component{
    constructor(props){
        super(props)
        this.state={
            imagesData: this.props.imagesData,
            displayedImageId: parseInt(this.props.imageId),
            displayedImage: this.props.imagesData.find(imageData=>imageData.imageId===parseInt(this.props.imageId))
        }
    }  componentDidMount(){

    } handleNextImage(event){
        const newImageIndex= this.state.imagesData.findIndex(imageData=>imageData.imageId===parseInt(this.state.displayedImageId))+1
        newImageIndex < this.state.imagesData.length? this.setState({
            displayedImage: this.state.imagesData[newImageIndex],
            displayedImageId: this.state.imagesData[newImageIndex].imageId
        }): this.setState({
            displayedImage: this.state.imagesData[0],
            displayedImageId: this.state.imagesData[0].imageId
        })
    } handlePreviousImage(event){
        const newImageIndex= this.state.imagesData.findIndex(imageData=>imageData.imageId===parseInt(this.state.displayedImageId))-1
        newImageIndex >=0? this.setState({
            displayedImage: this.state.imagesData[newImageIndex],
            displayedImageId: this.state.imagesData[newImageIndex].imageId
        }): this.setState({
            displayedImage: this.state.imagesData[this.state.imagesData.length-1],
            displayedImageId: this.state.imagesData[this.state.imagesData.length-1].imageId
        })
    } render(){
        const fullScreenFunctionButtonJsx=
            <React.Fragment>
                <div className="changeProfilPictureBtn" onClick={(event)=>this.props.function(event)} value={this.props.imageId}>Changer photo profil</div>
            </React.Fragment>
        const dipsplayFullScreenTitleJsx=
            <React.Fragment>
                <h3>{this.state.displayedImage.imageTitle}</h3>
            </React.Fragment>
        const displayFullScreenDescriptionJsx=
            <React.Fragment>
                <p className="fullsScreenDescriptionTitle">Desicription</p>
                <p className="fulleScreenDescription">{this.state.displayedImage.imageDescription}</p>
            </React.Fragment>
        const displayFullScreenDateJsx=
            <React.Fragment>
                <p className="fullScreenDateTitle">Ajouter le: </p>
                <p className="fullScreenUploadDate">{this.state.displayedImage.imageUploadDate}</p>
            </React.Fragment>
        return(
            <div className="carouselMainContainer">
                <div className="previousButton" onClick={(event)=>this.handlePreviousImage(event)}></div>
                <div className="carouselImageContainer">
                    <div className="fullScreenCloseButton" onClick={(event)=>this.props.closeFunction(event)}></div>
                    {this.state.displayedImage.imageTitle!=="null"? dipsplayFullScreenTitleJsx:null}
                    <img src={`${process.env.REACT_APP_API_URL}${this.state.displayedImage.imagePath}`} alt="" />
                    {this.state.displayedImage.imageDescription==="null"? null: displayFullScreenDescriptionJsx}
                    {this.state.displayedImage.imageUploadDate? displayFullScreenDateJsx: null}
                    {this.props.profilOwner?fullScreenFunctionButtonJsx: null}
                </div>
                <div className="nextButton" onClick={(event)=>this.handleNextImage(event)}></div>
            </div>
        )
    }
}
