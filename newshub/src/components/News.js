import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

//console.log("API Key: ", process.env.REACT_APP_API_KEY);

export default class extends Component {
    static defaultProps = {
        pageSize: 18,
        country: 'in',
        category: 'general',
        author: 'unknown',
        date: 'unknown'
    }
    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
        author: PropTypes.string,
        date: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsHub`; 
    }
    async updateNews(){
        this.setState({loading: true});
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`);   
        let parsedData = await data.json()
        this.setState({loading: false});
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
    }
    async componentDidMount() {
        this.updateNews();
    }
    handlePrevClick = async ()=>{
        this.setState({page: this.state.page - 1});
        this.updateNews();
    }   
    handleNextClick = async ()=>{
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'35px 0px'}}>NewsHub Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>
        {this.state.loading&&<Spinner/>}
        <div className="row">
        {!this.state.loading&&this.state.articles.map((element)=>{
            return <div className="col-md-4"  key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
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
