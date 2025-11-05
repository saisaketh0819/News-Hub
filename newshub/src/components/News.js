import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
    

console.log("API Key: ", process.env.REACT_APP_API_KEY);

export default class extends Component {
    static defaultProps = {
        pageSize: 19,
        country: 'in',
        category: 'general' 
    }
    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        this.setState({loading: true});
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=1&pageSize=${this.props.pageSize}`);    
        let parsedData = await data.json()
        this.setState({loading: false});
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
    }
    handlePrevClick = async ()=>{
        this.setState({loading: true});
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`);    
        let parsedData = await data.json()
        this.setState({loading: false});
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }   
    handleNextClick = async ()=>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/19))){
            this.setState({loading: true});
            let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`);    
            let parsedData = await data.json()
            this.setState({loading: false});
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles}
            )
        }
    }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'35px 0px'}}>NewsHub - Top Headlines</h1>
        {this.state.loading&&<Spinner/>}
        <div className="row">
        {!this.state.loading&&this.state.articles.map((element)=>{
            return <div className="col-md-4"  key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div>
        })}
        </div>
        <div className = "container d-flex justify-content-between my-3">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
        <button type="button" disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults/19))} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
