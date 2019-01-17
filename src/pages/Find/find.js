import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRecommendResource } from '../../store/actionCreator';
import { Tabs } from 'antd';
import './find.scss';

class Find extends Component{
  constructor(props) {
    super(props);
    this.changeTabs = this.changeTabs.bind(this);
  }
  changeTabs(key){
    console.log('key', key);
  }
  render(){
    const TabPane = Tabs.TabPane;
    return(
      <div className="find">
        <div className="findTabs">
          <Tabs defaultActiveKey="1" onChange={this.changeTabs}>
           <TabPane tab="个性推荐" key="1">
              <ul className="mainList">
                <NavLink
                  exact
                  to='/srFM'
                  >
                <li>
                  <div className="icoWrapper">
                    <i className="iconfont ico">&#xe60c;</i>
                  </div>
                  <h3 className="tag_name">私人FM</h3>
                </li>
                </NavLink>
                <NavLink
                  exact
                  to='/mrtj'
                  onClick={this.props.handleSrFM}>
                <li onClick={this.props.getRecommendResource('每日推荐')}>
                  <div className="icoWrapper">
                    <i className="iconfont ico">&#xe60c;</i>
                  </div>
                  <h3 className="tag_name">每日推荐</h3>
                </li>
                </NavLink>
                <NavLink
                  exact
                  to='/gd'
                  onClick={this.props.handleSrFM}>
                <li>
                  <div className="icoWrapper">
                    <i className="iconfont ico">&#xe60c;</i>
                  </div>
                  <h3 className="tag_name">歌单</h3>
                </li>
                </NavLink>
                <NavLink
                  exact
                  to='/phb'
                  onClick={this.props.handleSrFM}>
                <li>
                  <div className="icoWrapper">
                    <i className="iconfont ico">&#xe60c;</i>
                  </div>
                  <h3 className="tag_name">排行榜</h3>
                </li>
                </NavLink>
              </ul>
           </TabPane>
           <TabPane tab="主播电台" key="2"></TabPane>
         </Tabs>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    getRecommendResource(value){
      dispatch(getRecommendResource(value));
    }
  }
}

export default connect(null, mapDispatchToProps)(Find);
