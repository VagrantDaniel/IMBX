import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavBar } from 'antd';
import './header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerName: null,
    }
  }
  componentDidMount(){
    if(this.props.loginType == 0){
      this.setState({
        headerName: '手机号登录',
      })
    }else{
      this.setState({
        headerName: '邮箱登录',
      })
    }
  }
  render(){
    return(
      <div className="header">
        <Link to="/login">
          <i className="iconfont icon">&#xe611;</i>
        </Link>
        <div className="header-name">{this.state.headerName}</div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loginType: state.loginType,
  }
}
const mapDispatchToProps = (dispatch) => {
  return{

  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
