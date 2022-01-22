import React from "react";
import {Component} from "react";

export default class ProfilModificationForm extends Component{
    constructor(props){
        super(props)
        this.state={
            countries: [],
            towns: [],
            answers: this.props.userProfil[0],
            confirmationPassword: "",
            formValues: this.props.userProfil
        }
        //const userData= this.props.userProfil;

    } componentDidMount(){
        fetch(`${process.env.REACT_APP_API_URL}inscription/countriesInscriptionForm`)
        .then(response => response.json())
        .then(data => this.setState({countries: [data]}));
    } handleInputChange(event){
        if(event.target.name==="firstName"){
            this.setState({answers: {...this.state.answers, "firstName": event.target.value}})
        } else if(event.target.name==="LastName"){
            this.setState({answers: {...this.state.answers, "LastName": event.target.value}})
        } else if(event.target.name==="userName"){
            this.setState({answers: {...this.state.answers, "userName": event.target.value}})
        } else if(event.target.name==="town"){
            this.setState({answers:{...this.state.answers, "townId":parseInt(event.target.value)}});
        } else if(event.target.name==="homeSpot"){
            this.setState({answers: {...this.state.answers, "homeSpot": event.target.value}})
        } else if(event.target.name==="email"){
            this.setState({answers: {...this.state.answers, "email": event.target.value}})
        } else if(event.target.name==="birthday"){
            this.setState({answers: {...this.state.answers, "birthday": event.target.value}})
        } else if(event.target.name==="country"){
            fetch(`${process.env.REACT_APP_API_URL}inscription/townsInscriptionForm/${event.target.value}`)
            .then(response => response.json())
            .then(data => this.setState({towns: [data]}));
            this.setState({answers:{...this.state.answers, "countryId": parseInt(event.target.value)}});
        }
    } handleSubmit(event){
        fetch(`${process.env.REACT_APP_API_URL}users/updateProfil`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state.answers),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data =>{console.log(data)})
            .catch(err => {console.log(err)})
    } render(){
        console.log("formData", this.state.formValues);
        console.log("answers", this.state.answers);
        const countrySelectorJsx= this.state.countries.map((countries)=>countries.map((country)=><option key={country.countryId} className="inscriptionFormOptions" value={country.countryId} name="country">{country.countryName}</option>));

        const townSelectroJsx= this.state.towns.map((towns)=>towns.map((town, key)=><option key={key} className="inscriptionFormOptions" value={town.townId} name="town">{town.townName}</option>));

        const updateProfilFormJsx= this.state.formValues.map((userInfo, key)=>(
            <form className="updateProfilForm" key={key}>
                <div className="selectContainer">
                    <select className="countriesTownsSelectors" name="country"
                    onChange={(country)=>this.handleInputChange(country)}>
                        <option className="inscriptionFormOptions">Pays</option>
                        {countrySelectorJsx}
                    </select>

                    <select className="countriesTownsSelectors" name="town"
                    onChange={(town)=>this.handleInputChange(town)}>
                        <option className="inscriptionFormOptions">Ville</option>
                        {townSelectroJsx}
                    </select>

                    <label className="inscriptionFormLabel" htmlFor="birthday">Date de naissance: </label>
                    <input type="date" className="birthdaySelector" onChange={(birthday)=>this.handleInputChange(birthday)} name="birthday" defaultValue={userInfo.birthday}/>
                </div>

                <label className="inscriptionFormLabel" htmlFor="firstName">Prénom: </label>
                <input className="nameInput" onChange={(firstName)=>this.handleInputChange(firstName)} type="text" name="firstName" defaultValue={userInfo.firstName}/>

                <label className="inscriptionFormLabel" htmlFor="LastName">Nom: </label>
                <input className="nameInput" onChange={(LastName)=>this.handleInputChange(LastName)} type="text" name="LastName" defaultValue={userInfo.LastName}/>

                <label className="inscriptionFormLabel" htmlFor="email">Email: </label>
                <input className="mailUserNameInput" onChange={(email)=>this.handleInputChange(email)} type="text" name="email" defaultValue={userInfo.email}/>

                <label className="inscriptionFormLabel" htmlFor="homeSpot">Home spot: </label>
                <input className="nameInput" type="text" name="homeSpot" onChange={(homeSpot)=>this.handleInputChange(homeSpot)} defaultValue={userInfo.homeSpot}/>

                <label className="inscriptionFormLabel" htmlFor="userName">Pseudo: </label>
                <input className="mailUserNameInput" onChange={(userName)=>this.handleInputChange(userName)} type="text" name="userName" defaultValue={userInfo.userName} />

                <div className="btn-linear-flat" onClick={(click)=>this.handleSubmit(click)}>
                   <p>MODIFIER</p>
                </div>
            </form>
        ))

        return(
            <React.Fragment>
                {updateProfilFormJsx}
            </React.Fragment>
        )
    }
}
