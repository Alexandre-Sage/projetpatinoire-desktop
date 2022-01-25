import React from "react";
import {Component} from "react";
import {Navigate, Link} from "react-router-dom";
import "./css/userPage.css";

export default class ForumMainPage extends Component{
    constructor(props){
        super(props)
        this.state={
            forumCategories: [],
            forumCategorieClicked: false,
            categoryId: null,
            categoryName:null
        }
    } componentDidMount(){
        document.body.classList.add("forumPageBody");
        document.body.classList.add("userPageBody");
        fetch(`${process.env.REACT_APP_API_URL}forum/categories` ,{
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({forumCategories: data}))
          .catch(err => {console.log(err)})
    } handleUrlParams(event){
        this.setState({categoryName: event.target.getAttribute("categoryid"), categoryId: event.target.getAttribute("categoryname")})
        this.setState({forumCategorieClicked: true})
    } render(){
        const categoriesJsx=
            <nav>
                <ul>
                {this.state.forumCategories.map((category, key)=>(
                    <li key={key}>
                        <div className="btn-linear-flat" onClick={(event)=>this.handleUrlParams(event)} categoryid={category.categoryId} categoryname={category.categoryName}>
                            <p>{category.categoryName}</p>
                        </div>
                    </li>
                ))}
                </ul>
            </nav>
        return(
            <div>
                {categoriesJsx}
                {this.state.forumCategorieClicked? <Navigate to={{pathname: `/forum/category/${this.state.categoryId}/${this.state.categoryName}/topics`, categoryId: this.state.categoryId}}/>:null}
            </div>
        )
    }
}
