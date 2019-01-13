import React, { Component } from 'react';
import { Button } from 'antd';
import './login.less';

class Login extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className="login">
        <div className="login_avator"></div>
        <Button type="login_onPhone">手机号登录</Button>
        <Button type="login_onEmail">邮箱登录</Button>        
      </div>
    )
  }
}
export default Login;
