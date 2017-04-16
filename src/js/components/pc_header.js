import React from 'react';
import {Row, Col} from 'antd';
import {Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router';


class PCHeader extends React.Component {
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
			this.setState({userNickName: localStorage.userNickName,userid:localStorage.UserId})
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

	callback(key){
		if(key == 1){
			this.setState({action: 'login'});
		}else if(key == 2){
			this.setState({action: 'register'})
		}
	}

	handleSubmit(e)
	{
		//页面开始向 API 进行提交数据
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData= this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password+"&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).
		then(response=>response.json()).then(json=>{
			this.setState({userNickName:json.NickUserName,userid:json.UserId});
      localStorage.userNickName = json.NickUserName;
			localStorage.userid = json.UserId;
		});
		if(this.state.action=="login"){
			this.setState({hasLogined:true});
		}
		message.success("succesful");
		this.setModalVisible(false);
	};

	logout(){
		localStorage.userNickName = '';
		localStorage.userid = '';
		this.setState({hasLogined:false})
	}


	render() {
		let {getFieldDecorator} = this.props.form;
		const userShow = this.state.hasLogined
			? <Menu.Item key="logout" className="register">
					<Button type="primary" htmlType="button">{this.state.userNickName}</Button>

          <Link to={'/usercenter'} target="_blank">
						<Button type="dashed" htmlType="button">Account</Button>
          </Link>

					<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>Logout</Button>
				</Menu.Item>
			: <Menu.Item key="register" className="register">
				<Icon type="appstore"/>Register/Login
			</Menu.Item>;


		return (
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" className="logo">
							<img src="./src/images/logo.png" alt="logo"/>
							<span>ReactNews</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
							<Menu.Item key="top">
								<Icon type="appstore"/>TOP
							</Menu.Item>
							<Menu.Item key="shehui">
								<Icon type="appstore"/>Society
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="appstore"/>Domestic
							</Menu.Item>
							<Menu.Item key="guoji">
								<Icon type="appstore"/>Global
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="appstore"/>Entertainment
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="appstore"/>Sports
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="appstore"/>Technology
							</Menu.Item>
							<Menu.Item key="shishang">
								<Icon type="appstore"/>Fashion
							</Menu.Item>
							{userShow}
						</Menu>
						<Modal title="Account" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} cancelText = "Cancel" onOk={() => this.setModalVisible(false)} okText = "Close">
							<Tabs type="card" onChange={this.callback.bind(this)}>

									<TabPane tab="login" key="1">
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

								<TabPane tab="register" key="2">
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

										<FormItem label="Conform Password:">
										  {getFieldDecorator('r_confirmPassword')(
											  <Input placeholder="Conform password"/>
										  )}
										</FormItem>
										<Button type="primary" htmlType="submit" >Sign Up</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Modal>
					</Col>
					<Col span={2}></Col>
				</Row>
			</header>
		);
	};
}
export default PCHeader = Form.create({})(PCHeader);
