import React from 'react';
import {Row, Col} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import {Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory} from 'react-router';

export default class PCUserCenter extends React.Component{
  render(){
    return(
      <div>
        <PCHeader/>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
              <Tabs>
                <TabPane tab="我的收藏列表" key="1">
                </TabPane>
                <TabPane tab="我的评论列表" key="2">
                </TabPane>
                <TabPane tab="头像设置" key="3">
                </TabPane>
              </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>

        <PCFooter/>
      </div>
    )
  }

}
