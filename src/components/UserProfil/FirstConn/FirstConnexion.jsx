import react from "react";
import {Component} from "react";
import FirstFrame from "./Frames/FirstFrame.jsx";
import SecondFrame from "./Frames/SecondFrame.jsx";
import "./FirstConnexion.scss";

export default class FirstConnexion extends Component{
    constructor(props){
        super(props)
        this.state={
            next: false,
            previous: false,
            start: false,
            frames: [
                <FirstFrame/>,
                <SecondFrame/>
            ],
            frameCounter: 0,
        }
    } handleFrameChange(event){
        switch(event.target.id){
            case "firstConnexionFrameStartButton":
            //const {handleUserComponentsDisplay}= this.props
            //handleUserComponentsDisplay(event)
            this.setState({
                start: true,
            })
            break;
            case "firstConnexionFrameNextButton":
            this.state.frameCounter<this.state.frames.length?this.setState({
                frameCounter: this.state.frameCounter+1,
            }): event.preventDefault()
            break;
            case "firstConnexionFramePreviousButton":
            this.state.frameCounter>0?this.setState({
                frameCounter: this.state.frameCounter-1,
            }): this.setState({
                frameCounter: 0,
            })
            break;
            default:
                this.setState({
                    start: false,
                })
            break;
        }

    } handleFunctionActivation(event){
        
    } render(){
        console.log(this.state.frameCounter);
        const frameDisplayJsx= this.state.frames[this.state.frameCounter];
        const welcomeJsx=<div className="welcomeJsxContainer">
                            <h2>Bienvenue</h2>
                            <p>Shouaitez vous passer le tutoriel?</p>
                            <div className="firstConnexionButtonContainer" >
                                <div id="firstConnexionFrameStartButton" onClick={(event)=>this.handleFrameChange(event)}>
                                    Non
                                </div>
                                <div>
                                    Oui
                                </div>
                            </div>
                        </div>
        const frameButtonJsx=   <div className="firstConnexionButtonContainer">
                                    <div id="firstConnexionFramePreviousButton" onClick={(event)=>this.handleFrameChange(event)}>
                                        Précédent
                                    </div>
                                    <div id="firstConnexionFrameNextButton" onClick={(event)=>this.handleFrameChange(event)}>
                                        Suivant
                                    </div>
                                </div>
        return(
            <div className="firstConnexionFrameContainer">
                {this.state.start? frameDisplayJsx: null}
                {this.state.start?frameButtonJsx:welcomeJsx}
            </div>
        )
    }
}
