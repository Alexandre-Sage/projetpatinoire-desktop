import React from "react";
import {Component} from "react";
import  "./css/CssConnexionForm.css"

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
            fetch(`http://localhost:4000/users/`+emailInput+"/"+passwordInput,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state.answers),
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data =>alert(data))
                .catch(err => {alert("flmdskflsdfkmfs")})

        /*fetch(`http://localhost:4000/users/`+emailInput+"/"+passwordInput)
        .then(response => response.json())
        .then(data =>{
            if( data==="mdp"){
                alert("Mot de passe incorrecte");
            }else if(data==="mail"){
                alert("Email inconnue")
            }else{
                this.setState({userProfil: [data]});
            }
        });*/
        //data==="mdp"? alert("Mot de passe incorrecte"): this.setState({userProfil: [data]})
    } render(){
        const {addConnexionForm}= this.props;
        console.log(addConnexionForm);
        console.log(this.state.answers);
        console.log(this.state.userProfil);
        return(
            <div className="connexionFromMainContainer">
                <div className="closeButtonTitleConnexionFormContainer">
                    <h3 className="connexionFormTitle">Connexion</h3>
                    <div onClick={(click)=>addConnexionForm(click)} className="btn-croix">
                    </div>
                </div>
                <form className="connexionForm">
                    <div className="connexionFormEmailPasswordContainer">
                        <label className="connexionFormLabel" htmlFor="emailInput">Email utilisateur: </label>
                        <input className="connexionFormInput" type="text" name="emailInput"  onChange={(email)=>this.handleInputChange((email))}/>
                        <label  className="connexionFormLabel" htmlFor="passwordInput">Mot de passe utilisateur</label>
                        <input className="connexionFormInput" type="password" name="passwordInput" onChange={(password)=>this.handleInputChange((password))} />
                    </div>
                    <div className="btn-linear-flat" onClick={(event)=>this.handleConnexionButton(event)}>
                       <p>CONNEXION</p>
                    </div>
                </form>
            </div>
        );
    }
}
