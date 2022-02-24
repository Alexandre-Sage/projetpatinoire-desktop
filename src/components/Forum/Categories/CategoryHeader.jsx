import React from "react";
import {Component} from "react";

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
                <h1>{detail.categoryName}</h1>
                <div>
                    <h2>Regles de la catégorie</h2>
                    <p>{detail.categoryRules}</p>
                </div>
            </React.Fragment>
        ))
        return(
            <header className={this.classNameSelector()}>
                {categoryHeaderJsx}
            </header>
        )
    }
}
