import React from 'react';
import {Row, Col} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Menu,Icon,Tabs,message,Form,Input,Button,Upload,Modal,Card} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router';

export default class MobileUserCenter extends React.Component{
  constructor(){
    super();
    this.state={
      usercollection:'',
      usercomments: '',
      previewImage: '',
      previewVisible: false
    }
  }

  componentDidMount(){
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="
    + localStorage.userid, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{this.setState({usercollection:json})
  });

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="
    + localStorage.userid, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{this.setState({usercomments:json})
     });
  }


  render(){
    const props = {
    	action: 'http://newsapi.gugujiankong.com/handler.ashx',
    	headers: {
    		"Access-Control-Allow-Origin":"*"
    	},
    	listType: 'picture-card',
    	defaultFileList:[
    		{
    			uid:-1,
    			name:'xxx.png',
    			state: 'done',
    			url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    			thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
    		}
    	],
    	onPreview: (file)=>{
    		this.setState({previewImage:file.url,previewVisible:true});
    	}
   };

   const {usercollection,usercomments} = this.state;
   const usercollectionList = usercollection.length ?
   usercollection.map((uc,index)=>(
       <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>article</a>}>
         <p>{uc.Title}</p>
       </Card>
   ))
   :
   'No article bookmarked yet';

   const usercommentsList = usercomments.length ?
   usercomments.map((comment,index)=>(
       <Card key={index} title={`commented on ${comment.uniquekey} at ${comment.datetime}  `}
       extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>article</a>}>
         <p>{comment.Comments}</p>
       </Card>
   ))
   :
   'You did not make any comments yet';

    return(
      <div>
        <MobileHeader/>
        <Row>

          <Col span={24}>
              <Tabs>
                <TabPane tab="My Collection" key="1">
                  <Row>
                      <Col span={24}>
                          {usercollectionList}
                      </Col>

                  </Row>
                </TabPane>
                <TabPane tab="My Comments" key="2">
                  <Row>
                      <Col span={24}>
                          {usercommentsList}
                      </Col>

                  </Row>
                </TabPane>
                <TabPane tab="Change Profile Image" key="3">
                    <div className="clearfix">
                      <Upload {...props}>
                        <Icon type="plus"/>
                        <div className="ant-upload-text">Upload Image</div>
                      </Upload>
                      <Modal visible ={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="preview" src={this.state.previewImage}/>
                      </Modal>
                    </div>
                </TabPane>
              </Tabs>
          </Col>

        </Row>

        <MobileFooter/>
      </div>
    )
  }

}
