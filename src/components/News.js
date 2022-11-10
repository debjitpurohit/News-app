import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class news extends Component {
    static defaultProps = {
        counTry: 'in',
        pageSize: 6,
        category: 'general'

    }
    static propTypes = {
        counTry: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,

    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0


        }
        document.title = `${this.props.category.toUpperCase()} ~ NewsMonkey`;
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.counTry}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalArticles: parsedData.totalResults,
            loading: false,

        });

    }
    async componentDidMount() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.counTry}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalArticles: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
        //this.updateNews();
    }
    handleNextClick = async () => {
        // console.log("Next");
        // if (this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)) {

        // }
        // else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.counTry}&category=${this.props.category}&apiKey=f9421b54501f41c3a7fb17cd51ae4892&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({ loading: false });

        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     });
        // }
        // this.setState({page: this.state.page + 1});
        // this.updateNews();

    }

    handlePrevClick = async () => {
        // console.log("Prev");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.counTry}&category=${this.props.category}&apiKey=f9421b54501f41c3a7fb17cd51ae4892&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ loading: false });
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // });
        // this.setState({page: this.state.page - 1});
        // this.updateNews();
    }
    fetchMoreData = async() => {
        setTimeout(async() => {
            this.setState({ page: this.state.page + 1 });
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.counTry}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalArticles: parsedData.totalResults,
            })
  
          }, 100);

    };
    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{ margin: '35px 0px',marginTop:'90px' }}>NewsMonkey - Top {this.props.category.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')} Headlines</h1>
                {/* {this.state.loading && <Spinner/>} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalArticles}
                    loader={<Spinner />}
                >
                    <div classname='container'>

                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div class="col-md-4" key={element.url}>
                                    <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>

                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default news