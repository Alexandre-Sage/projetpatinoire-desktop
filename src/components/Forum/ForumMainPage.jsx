import React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import "../../cssBouton/btn-forum.css";
import "./css/ForumMainPage.css"
import ParamsReader from "../Modules/ParamsReader";

class ForumMainPage extends Component{
    constructor(props){
        super(props)
        this.state={
            forumCategories: [],
        }
    } componentDidMount(){
        document.body.classList.add("forumPageBody");
        document.body.classList.remove("userPageBody", "forumPageTopicsBody", "chatPageBody");
        fetch(`${process.env.REACT_APP_API_URL}forum/categories`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({forumCategories: data}))
          .catch(err => {console.log(err)})
    } render(){
        const categoriesJsx=
            <nav className="categoriesNavContainer">
                <ul className="categoriesListContainer">
                {this.state.forumCategories.map((category, key)=>(
                    <li key={key} className="categoriesListItems">
                        <Link className="btn-top-line" style={{textDecorationLine: 'none', color: "white"}}
                         to={`/${this.props.params.userName}/${this.props.params.userId}/forum/category/${category.categoryId}/${category.categoryName}/topics`}>{category.categoryName}</Link>
                    </li>
                ))}
                </ul>
            </nav>
        return(
            <React.Fragment>
                <header className="categoriesHeaderTag">
                    <h1 className="categoriesTitle">Catégories</h1>
                </header>
                <main className="categoriesMainTag">
                    {categoriesJsx}
                </main>
            </React.Fragment>
        )
    }
}
export default ParamsReader(ForumMainPage)
