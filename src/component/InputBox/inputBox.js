import React, { Component } from 'react';
import { connect } from 'react-redux';
import { rememberAccount } from '../../store/actionCreator';
import { Form, Input, Button } from 'antd';
import './inputBox.scss';

class InputBox extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loginType : null,
    }
  }
  componentDidMount(){
    if(this.props.loginType === 0){
      this.setState({
        loginType : '手机号'
      })
    }else{
      this.setState({
        loginType : '邮箱'
      })
    }
  }
  loginSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.rememberAccount(values);
      }else{
        // this.props.rememberAccount();
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="inputBox">
        <Form onSubmit={this.loginSubmit}>
          <Form.Item>
          {
            getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入手机号或邮箱!' }],
            })(
              <div className="singleBox">
                <i className="iconfont icon">&#xe62e;</i>
                <Input className="input_field" placeholder={this.state.loginType} allowClear></Input>
              </div>
            )
          }
          </Form.Item>
          <Form.Item>
          {
              getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
              <div className="singleBox">
                <i className="iconfont icon">&#xe640;</i>
                <Input className="input_field" placeholder="密码" allowClear></Input>
              </div>
             )
          }
          </Form.Item>
          <Form.Item>
          <Button className="loginOnAccount" onClick={this.loginOnAccount} htmlType="submit">登录</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loginType: state.account.loginType,
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    rememberAccount(value){
      dispatch(rememberAccount(value));
    }
  }
}
InputBox = Form.create()(InputBox);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputBox);
