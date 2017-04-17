import React from 'react';
import {Card,Tabs} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
const TabPane = Tabs.TabPane;

export default class PCNewsImageBlock extends React.Component{
  constructor(){
    super()
    this.state={
      news:''
    }
  }

  componentWillMount(){
    var myFetchOptions = {
      method: 'GET'
    }
    fetch("https://newsapi.org/v1/articles?source=abc-news-au&sortBy="+this.props.type+"&apiKey=a0410e7014814630a161eba1825b60a4", myFetchOptions)
    .then(response=>response.json()).then(json=> this.setState({news:json.articles}))
  }

  render(){

    const styleImage = {
      display: "block",
      width: this.props.imageWidth,
      height: "90px"
    };
    const styleH3 = {
      width: this.props.imageWidth,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow:"ellipsis"
    }

    const {news} = this.state;
		const newsList = news.length
			? news.map((newsItem, index) => (

				<div key={index} className="imageblock">

            <div className="custom-image">
              <img alt="" style={styleImage} src={newsItem.urlToImage}/>
            </div>
            <div className="custom-card">
              <h3 style={styleH3}><a href={newsItem.url} target="_blank">{newsItem.title}</a></h3>

            </div>

				</div>
			))
			: 'No news loaded';
    return(
      <div className="topNewsList">
        <Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}} >
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>

    )
  }
}
