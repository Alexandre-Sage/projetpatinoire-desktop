import React from "react";
import {Component} from "react";

export default class ConnexionForm extends Component{
    constructor(props){
        super(props);
        this.state={
            answers:{},
            connected: false,
            userProfil:[]
        }
    } componentDidMount(){

    } handleInputChange(input){
        this.setState({answers: {...this.state.answers, [input.target.name]: input.target.value}});

    } handleConnexionButton(event){
        event.preventDefault();
        const passwordInput=this.state.answers.passwordInput;
        const emailInput=this.state.answers.emailInput;
        console.log(emailInput);
        fetch(`http://localhost:4000/users/`+emailInput+"/"+passwordInput)
        .then(response => response.json())
        .then(data =>{
            if( data==="mdp"){
                alert("Mot de passe incorrecte");
            }else if(data==="mail"){
                alert("Email inconnue")
            }else{
                this.setState({userProfil: [data]});
            }
        });
        //data==="mdp"? alert("Mot de passe incorrecte"): this.setState({userProfil: [data]})
    } render(){
        console.log(this.state.answers);
        console.log(this.state.userProfil);
        return(
            <React.Fragment>
                <h3>Connexion</h3>
                <form>
                    <label htmlFor="emailInput">Email utilisateur: </label>
                    <input className="connexionFormInput" type="text" name="emailInput"  onChange={(email)=>this.handleInputChange((email))}/>
                    <label htmlFor="passwordInput">Mot de passe utilisateur</label>
                    <input className="connexionFormInput" type="password" name="passwordInput" onChange={(password)=>this.handleInputChange((password))} />
                    <button type="submit" onClick={(event)=>this.handleConnexionButton(event)}>Connexion</button>
                </form>
            </React.Fragment>
        );
    }
}
