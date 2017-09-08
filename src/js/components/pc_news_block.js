import React from 'react';
import {Card,Tabs} from 'antd';
import {Link} from 'react-router-dom';
const TabPane = Tabs.TabPane;

export default class PCNewsBlock extends React.Component{
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
    fetch("https://api.nytimes.com/svc/topstories/v2/"
    +this.props.type+".json?api-key=bc51cb44ff2f4c928a108c18685a67a6", myFetchOptions)
    .then(response=>response.json()).then(json=> this.setState({news:json.results}))
  }

  render(){

    const {news} = this.state;
    console.log(news)
		const newsList = news.length
			? news.map((newsItem, index) => (
				<li key={index}>
					<Link to={`details/${newsItem.uniquekey}`} target="_blank">
						{newsItem.title}
					</Link>
				</li>
			))
			: 'No news loaded';
    return(
      <div className="topNewsList">
        <Card>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>

    )
  }
}
