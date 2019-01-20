import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { rememberAccount } from '../../store/actionCreator';
import { Form, Input, Button, Spin } from 'antd';
import {　login, getLoginStatus } from '../../api';
import './inputBox.scss';

class InputBox extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loginType : null,
      loading: false,
    }
    this.loginSubmit = this.loginSubmit.bind(this);
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
//  加载中
  toggle = (value) => {
    this.setState({ loading: value });
  }
  loginSubmit = (e) => {
    e.preventDefault();
      console.log('正在登陆');
    this.props.form.validateFields((err, values) => {
      if (!err) {
         console.log('Received values of form: ', values);
//        this.props.rememberAccount(values);
        login(values.loginType, values.userName, values.password).then(
            ({data}) => {
                
            getLoginStatus().then(({data}) => {
//              console.log('data',data)
              if(data.code === 200){
                    this.props.history.push('/find');
                                  }
//                  newState.isLogin = true;
////                  getUserSubcount().then(({data}) => {
////                     console.log('data', data);
////                     }).catch((e) => {
////                      console.log('获取用户歌单等信息失败', e);
////                     });
//              }else{
//              console.log('data',data.code);
//              }
//              }).catch((e) => {
//               console.log('获取登陆状态失败', e)
//              })
            // getUserSubcount().then(({data}) => {
            //   console.log('data', data);
            // }).catch((e) => {
            //   console.log('获取用户歌单等信息失败', e);
            // });
            // getUserDetail(data.account.id).then(({data}) => {
            //   // new
            //   console.log('details', data)
             }).catch((e) => {
               console.log('获取用户详细信息失败', e);
             });
        }).catch((e) => {
            console.log('登录失败了', e)
        });
      }else{
         console.log('输入用户名或密码有误！')
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
           <Button className="loginOnAccount" onClick = {this.toggle} htmlType="submit">登录</Button>
          </Form.Item>
        </Form>
           <Spin tip="加载中" size="large" spinning={this.state.loading}>
        </Spin>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loginType: state.reducer.account.loginType,
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
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(InputBox));
