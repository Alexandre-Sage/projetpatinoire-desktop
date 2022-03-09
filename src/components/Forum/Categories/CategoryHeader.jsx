import React from "react";
import {Component} from "react";
import "./css/CategoryHeader.css";

export default class CategoryHeader extends Component{
    constructor(props){
        super(props)
        this.state={
            category: [],
        }
    } componentDidMount(){
        fetch(`${process.env.REACT_APP_API_URL}forum/categories/detail/${this.props.categoryId}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
        })
          .then(response => response.json())
          .then(data => this.setState({category: data}))
          .catch(err => {console.log(err)})
    } classNameSelector(){
        if(parseInt(this.props.categoryId)===1){
            return "generalCategoryHeader"
        } else if(parseInt(this.props.categoryId)===2){
            return "reportCategoryHeader"
        } else if(parseInt(this.props.categoryId)===3){
            return "matosCategoryHeader"
        } else if(parseInt(this.props.categoryId)===4){
            return "diyCategoryHeader"
        }else if(parseInt(this.props.categoryId)===5){
            return "photoCategoryHeader"
        } else if(parseInt(this.props.categoryId)===6){
            return "secretSpotCategoryHeader"
        }
    } render(){
        const categoryHeaderJsx= this.state.category.map((detail, key)=>(
            <React.Fragment key={key}>
                <h1 className="categoryHeaderTitle">{detail.categoryName}</h1>
                <div className="categoryHeaderSmallContainer">
                    <h2 className="categoryHeaderRulesTile">Regles de la catégorie</h2>
                    <p className="categoryHeaderRules">{detail.categoryRules}</p>
                </div>
            </React.Fragment>
        ))
        return(
            <header className={`categoryHeader ${this.classNameSelector()}`}>
                <div className="categoryHeaderJsxBlackBack">
                    {categoryHeaderJsx}
                </div>
            </header>
        )
    }
}
