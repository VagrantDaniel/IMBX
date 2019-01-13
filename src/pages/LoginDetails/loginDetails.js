import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../component/Header/header'
import InputBox from '../../component/InputBox/inputBox';
import { Button } from 'antd';
import './loginDetails.scss';

class loginDetails extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className="loginDetails">
        <div className="mainContent">
          <Header />
          <InputBox />
          <Button className="loginOnAccount" onClick={this.loginOnAccount} disabled>登录</Button>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return{

  }
}
export default connect(
  null,
  mapDispatchToProps
)(loginDetails);
