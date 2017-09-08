import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter,Switch } from 'react-router-dom';
import PCIndex from './components/pc_index';

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
				<MediaQuery minDeviceWidth={1224}>
					<BrowserRouter >
						<Switch>
						<Route path="/" component={PCIndex}></Route>
						<Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
						<Route path="/usercenter" component={PCUserCenter}></Route>
						</Switch>
					</BrowserRouter>
				</MediaQuery>
				<MediaQuery maxWidth={1224}>
					<BrowserRouter>
						<Switch>
						<Route path="/" component={MobileIndex}></Route>
						<Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
						<Route path="/usercenter" component={MobileUserCenter}></Route>
						</Switch>
					</BrowserRouter>
				</MediaQuery>
			</div>

		 	)

	}
}

ReactDOM.render(
	<Root/>,
	document.getElementById("mainContainer")
	);
