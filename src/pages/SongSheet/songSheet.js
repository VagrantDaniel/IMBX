import React, { Component } from 'react';
import { connect } from 'react-redux';

class SongSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverImgUrl: null,
      name: null,
      description: null,
      trackIds: null,
    }
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.playlist){
      return;
    }
    // 当上一个props 的歌词和 这个 props 的歌词一样时，直接返回
     const r =
       JSON.stringify(nextProps.playlist) ===
       JSON.stringify(this.props.playlist);
     if (r) {
       return;
     }
     this.setState({
       coverImgUrl: nextProps.playlist.coverImgUrl,
       name: nextProps.playlist.name,
       description: nextProps.playlist.description,
       trackIds: nextProps.playlist.trackIds,
     })
  }
}

render(){
  return(
    <div className="songSheet">
      <div className="header">
        <Link to="/find">
          <i className="iconfont icon">&#xe611;</i>
        </Link>
        <div className="header-name">{this.props.headerName}</div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    playlist: state.reducer.recommend.playlist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongSheet);
