import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { rememberAccount, getRecommendResource } from '../../store/actionCreator';
import { Form, Input, Button, Spin, Icon, message } from 'antd';
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

  loginSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
         // 加载中
         this.setState({ loading: true });
//        this.props.rememberAccount(values);
        login(values.loginType, values.userName, values.password).then(
            ({data}) => {
              if(data.code === 200){
                let userInfo = data;
                this.props.getRecommendResource();
                setTimeout(() => {
                  getLoginStatus().then(({data}) => {
                    if(data.code === 200){
                        this.props.rememberAccount(data.profile);
                        this.props.history.push('/find');
                    }
                  }).catch((e) => {
                    console.log('获取用户详细信息失败', e);
                  });
                },1000);

              }else{
                message.config({
                  top: '50%',
                  duration: 3,
                  maxCount: 3,
                });
                message.error(this.state.loginType+'或密码有误');
                this.setState({ loading: false });
                this.refs.userName.text = '';
                this.refs.password.text = '';
              }
        }).catch((e) => {
            console.log('登录失败了', e)
        });
      }else{
         console.log('输入用户名或密码有误！')
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#999' }} spin />;
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
                <Input className="input_field" placeholder={this.state.loginType} allowClear ref="userName"></Input>
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
                <Input.Password className="input_field" placeholder="密码" allowClear password="true" ref="password"></Input.Password>
              </div>
             )
          }
          </Form.Item>
          <Form.Item>
           <Button className="loginOnAccount" htmlType="submit" disabled={this.state.loading}>登录</Button>
          </Form.Item>
        </Form>
        <Spin tip="加载中..." size="large"  spinning={this.state.loading}></Spin>
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
    },
    getRecommendResource(){
      dispatch(getRecommendResource());
    }
  }
}
InputBox = Form.create()(InputBox);
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(InputBox));
