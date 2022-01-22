import React from "react";
import {Component} from "react";
import "../../cssBouton/btn_croix.css";

/*<div onClick={(click)=>addInsciptionForm(click)} className="btn-croix">
</div>*/

export default class PopUp extends Component{
    constructor(props){
        super(props)
        this.state={
            message: null
        }
        console.log(this.props);
    } componentDidMount(){
        this.setState({message: this.props.message})
    } render(){
        const {popUpFunction}= this.props.function;
        console.log(popUpFunction);
        return(
            <div>
                <p>THERE</p>
                <p>{this.state.message}</p>
            </div>
        )
    }
}
