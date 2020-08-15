import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './Feeds.css';
import RenderPosts from './RenderPosts';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
class Feeds extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: 'Anonymous', posts: [] }
    this.renderAllPosts = this.renderAllPosts.bind(this);
  }

  componentDidMount() {
    this.checkUserName()
    this.checkDataBeforeRender()
  }

  checkDataBeforeRender() {
    if (this.props.location.state && this.props.location.state.data) {
      const postsData = this.props.location.state.data;
      this.setState({ postsData })
      return;
    }
    this.renderAllPosts();
  }


  checkUserName() {
    if (sessionStorage.getItem("user")) {
      this.setState({ username: sessionStorage.getItem("user") })
    }
  }

  renderAllPosts() {
    axios
      .get(
        "api/getAllPosts",
        { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } }
      )
      .then(response => {
        this.setState({ posts: response.data })
      })
  }

  render() {

    return (
      <div>
        <div className="flexContainer">
          <div>
            <AccountCircleIcon style={{ fontSize: 100, color:'#0e753c' }}/>
          </div>
          <div className="userIntro">
            <h2>{this.state.username}</h2>
            {/* <div>number of post</div>
            <div>self intro</div> */}
          </div>
        </div>
        <hr />
        <div>
        </div>
        <RenderPosts posts={this.state.posts} username={this.state.username} getPosts={this.renderAllPosts}/>
      </div>
    );

  }
}

export default withRouter(Feeds);