import React from 'react';
import ReactDOM from 'react-dom';
import PCIndex from './components/pc_index';
import {Router, Route, hashHistory } from 'react-router';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import MobileIndex from './components/mobile_index';
import PCNewsDetails from './components/pc_news_details';
import MobileNewsDetails from './components/mobile_news_details';
import PCUserCenter from './components/pc_usercenter';
import MobileUserCenter from './components/mobile_usercenter';

export default class Root extends React.Component{
	render(){
		 return (
		 	<div>
		 	  <MediaQuery query = '(min-device-width: 1224px)'>
					<Router history={hashHistory}>
						<Route path='/' component={PCIndex}></Route>
						<Route path='/details/:uniquekey' component={PCNewsDetails}></Route>
						<Route path='/usercenter' component={PCUserCenter}></Route>
					</Router>

		 	  </MediaQuery>

		 	  <MediaQuery query = '(max-device-width: 1224px)'>
		 	    <Router history={hashHistory}>
						<Route path='/' component={MobileIndex}></Route>
						<Route path='/details/:uniquekey' component={MobileNewsDetails}></Route>
						<Route path='/usercenter' component={MobileUserCenter}></Route>
					</Router>
		 	  </MediaQuery>

		 	</div>

		 	)

	}
}

ReactDOM.render(
	<Root/>,
	document.getElementById("mainContainer")
	);
