import React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import "./css/userPage.css";
import ParamsReader from "../Modules/ParamsReader";

class ForumMainPage extends Component{
    constructor(props){
        super(props)
        this.state={
            forumCategories: [],
        }
    } componentDidMount(){
        document.body.classList.add("forumPageBody");
        document.body.classList.add("userPageBody");
        fetch(`${process.env.REACT_APP_API_URL}forum/categories`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({forumCategories: data}))
          .catch(err => {console.log(err)})
    } render(){
        console.log(this.props.params);
        const categoriesJsx=
            <nav>
                <ul>
                {this.state.forumCategories.map((category, key)=>(
                    <li key={key}>
                        <Link className="btn-linear-flat"
                         to={`/${this.props.params.userName}/forum/category/${category.categoryId}/${category.categoryName}/topics`}>{category.categoryName}</Link>
                    </li>
                ))}
                </ul>
            </nav>
        return(
            <main>
                {categoriesJsx}
            </main>
        )
    }
}
export default ParamsReader(ForumMainPage)
