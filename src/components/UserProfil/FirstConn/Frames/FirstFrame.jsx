import react from "react";
import {Component} from "react";

export default class FirstFrame extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }render(){
        return(
            <div>
                <h2>Photos</h2>
                <p>Le premier bouton de la barre de navigation vous permet d'afficher vos photos et d'en ajouter de nouvelles</p>
            </div>
        )
    }
}
