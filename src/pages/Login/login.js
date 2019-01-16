import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLoginType } from '../../store/actionCreator';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './login.scss';

class Login extends Component{
  constructor(props) {
    super(props);
    this.login_onPhone = this.login_onPhone.bind(this);
    this.login_onEmail = this.login_onEmail.bind(this);
  }
  login_onPhone(){
    this.props.getLoginType(0);
  }
  login_onEmail(){
    this.props.getLoginType(1);
  }
  render(){
    return(
      <div className="login">
        <div className="login_avator"></div>
        <Link to={{pathname: '/loginDetails',
          search: '?loginType=0',
        }}>
          <Button className="login_onPhone" onClick={this.login_onPhone}>手机号登录</Button>
        </Link>
        <Link to={{pathname: '/loginDetails',
          search: '?loginType=1',
        }}>
        <Button className="login_onEmail" onClick={this.login_onEmail}>邮箱登录</Button>
        </Link>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    getLoginType(value){
      dispatch(getLoginType(value));
    }
  }
}
export default connect(null,mapDispatchToProps)(Login);
