import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';
import {Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;



class MobileHeader extends React.Component{
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0
		};
	};
  componentWillMount(){
		if(localStorage.userid!=''){
			this.setState({hasLogined:true});
			this.setState({userNickName: localStorage.userNickName, userid:localStorage.userid})
		}
	}
	setModalVisible(value)
	{
		this.setState({modalVisible: value});
	};

	handleClick(e) {
		console.log(e.key);
		if (e.key == "register") {
			this.setState({current: 'register'});
			this.setModalVisible(true);
		} else {
			{
				this.setState({current: e.key});
			}
		}
	};

	handleSubmit(e)
	{
		//make API Requests
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData= this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
		+"&username="+formData.userName+"&password="+formData.password
		+"&r_userName="+formData.r_userName+"&r_password="+formData.r_password
		+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).
		then(response=>response.json()).then(json=>{
			this.setState({userNickName:json.NickUserName,userid:json.UserId});

		});
		if(this.state.action =="login"){
			this.setState({hasLogined:true});
			localStorage.userNickName = json.NickUserName;
			localStorage.userid = json.UserId;
		}
		message.success("请求成功！");
		this.setModalVisible(false);
	};

callback(key){
	if(key=="1"){
		this.setState({action: 'login'});
	}else if(key=="2"){
		this.setState({action: 'register'});
	};
}



login(){
	this.setModalVisible(true);
}

	render(){
		let {getFieldDecorator} = this.props.form;
		const userShow = this.state.hasLogined ?
				<Link to = {'/usercenter'} target="_blank">
					<Icon type="inbox"/>
				</Link>
				:
				<Icon type="setting" onClick={this.login.bind(this)}/>

		return(
		  <div id="mobileheader">
		    <header>
		      <img src="./src/images/logo.png" alt="logo"/>
		      <span>News Republic</span>
					{userShow}
		    </header>

				<Modal title="Account" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText = "关闭">
					<Tabs type="card" onChange={this.callback.bind(this)}>

							<TabPane tab="Login" key="1">
								<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
									<FormItem label="Username:">
									{getFieldDecorator('userName')(
										<Input placeholder="Username"/>
									)}
									</FormItem>
									<FormItem label="Password:">
									{getFieldDecorator('password')(
										<Input type="password" placeholder="Password"/>
									)}
									</FormItem>
									<Button type="primary" htmlType="submit">Login</Button>
								</Form>
							</TabPane>

						<TabPane tab="Register" key="2">
							<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="Username:">
									{getFieldDecorator('r_userName')(
										<Input placeholder="Username"/>
									)}
								</FormItem>

								<FormItem label="Password:">
									{getFieldDecorator('r_password')(
										<Input placeholder="Password"/>
									)}
								</FormItem>

								<FormItem label="Confirm Passwrod:">
									{getFieldDecorator('r_confirmPassword')(
										<Input placeholder="Conform password"/>
									)}
								</FormItem>
								<Button type="primary" htmlType="submit" >Sign Up</Button>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>
		  </div>

			);
	}
}
export default MobileHeader = Form.create({})(MobileHeader);
