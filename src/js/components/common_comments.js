import React from 'react';
import {Row, Col} from 'antd';
import {Form,Input,Button,Card} from 'antd';
const FormItem = Form.Item;
import {Router, Route, Link, browserHistory} from 'react-router';

class CommonComments extends React.Component{
  constructor(){
    super();
    this.state={
      comments:""
    }
  }
componentDidMount(){
  var myFetchOptions={
    method: 'GET'
  };
  fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="
  + this.props.uniquekey,myFetchOptions)
  .then(response => response.json())
  .then(json => {this.setState({comments: json});
  }) ;
  }
handleSubmit(e){
  e.preventDefault();
  var myFetchOptions = {
    method: 'GET'
  };
  var formData = this.props.form.getFieldsValue();
  fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="
  + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet="
  + formData.remark, myFetchOptions).then(response => response.json()).then(json => {
			this.componentDidMount();
		})

}

  render(){

    let {getFieldDecorator} = this.props.form;
    const {comments} = this.state;
    const commentList = comments.length?
    comments.map((comment,index)=>(
        <Card key={index} title={comment.UserName} extra={<a href="#">发布于{comment.datetime}</a>}>
            <p>{comment.Comments}</p>
        </Card>
    ))
    :
    "No comments yet"

    return(
      <div className="comment">
        <Row>
          <Col span={24}>
            {commentList}
              <Form onSubmit ={this.handleSubmit.bind(this)}>
  							<FormItem label="your comments">
                    {getFieldDecorator('remark')(
                      <Input type="textarea" placeholder="type your comments here"/>
                    )}
  							</FormItem>
  							<Button type="primary" htmlType="submit">Submit Comments</Button>
						</Form>
          </Col>
        </Row>
      </div>
    )
  }
}




export default CommonComments = Form.create({})(CommonComments);
