import './App.css';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar';
import News from './components/News';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
      <Router>
        <Navbar tittle="News Monkey" />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />

        <Routes>
          <Route exact path="/" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" counTry="us" pageSize={6} category="general"/>}/> 
          <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="business" counTry="us" pageSize={6} category="business" />}/>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment" counTry="in" pageSize={6} category="entertainment" />}/>
          <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="health" counTry="us" pageSize={6} category="health" />}/>
          <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="science" counTry="us" pageSize={6} category="science" />}/>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="sports" counTry="us" pageSize={6} category="sports" />}/>
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="technology" counTry="us" pageSize={6} category="technology" /> }/> 
        </Routes>
     
      </Router>
      </div>
      
    )
  }
}



