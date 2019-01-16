import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../component/Header/header'
import InputBox from '../../component/InputBox/inputBox';
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
