
import React from 'react';
import Modal from '@material-ui/core/Modal';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import SimpleModal from './Modal';
import './Feeds.css'

function renderSimpleModal(post, getPosts, isMyPosts) {
    return (
      <SimpleModal key={post["_id"]}
        postId={post["_id"]}
        imageURL={post.coverImg}
        postStory={post.postStory}
        renderAllPosts={getPosts}
        comments={post.comments}
        author={post.author}
        isMyPosts={isMyPosts}
      />
    )
  }

export default function RenderPosts(props) {
    const posts = props.posts.map((post) => renderSimpleModal(post, props.getPosts, props.isMyPosts))
    return (
      <div className="displayPic">
        <AddPostContainer renderAllPosts={props.getPosts} />
        {posts}
        <div style={{ width: '30%', height: 0 }}></div>
      </div>
    )
  }

  function AddPostContainer(props) {
    const [open, setOpen] = React.useState(false);
    const openModal = () => { setOpen(true); }
    const handleClose = () => { setOpen(false); };
    return (
      <>
        <AddPostIcon openModal={openModal} />
        <AddPostModal open={open} handleClose={handleClose} renderAllPosts={props.renderAllPosts} />
      </>
    )
  }
  
  function AddPostIcon(props) {
    const componentStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', width: '30%', height: 290 }
    return (
      <div style={componentStyle} onClick={props.openModal}>
        <div>
          <div><AddCircleOutlineIcon style={{ color: 'gray', fontSize: 100 }} /></div>
        </div>
      </div>
    )
  }
  
  
  function AddPostModal(props) {
    // const [post, setPost] = React.useState("");
    const [imageURL, setImageURL] = React.useState('');
  
    const handlesubmit = (e) => {
      e.preventDefault();
      const body = { coverImg: e.target.coverImg.value, postStory: e.target.postStory.value }
      makeNewPost(body)
      setImageURL("")
      props.renderAllPosts()
    };
  
    const makeNewPost = (body) => {
      axios
        .post(
          "/api/posts",
          body,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token")
            }
          }
        ).then(response => {
          props.handleClose();
        })
  
        .catch(error => {
          console.log("can't make the post", error);
        });
  
    }
  
    const handleChange = (event) => {
      setImageURL(event.target.value);

    }
  
    return (
      <Modal
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        open={props.open}
        onClose={props.handleClose}
      >
        <div style={{ margin: 'auto'}}>
          <form onSubmit={handlesubmit} method="post" className="formStyle">
            <div className="savePost">New post</div>
            <div className="postField">
              {(!imageURL) ? (<img src='https://www.clipartsfree.net/vector/medium/60679-green-camera-icon-images.png' alt="cameraimg" className="imgArea" />) : (<img src={imageURL} className="imgArea" alt="plant_image"/>)}
              <textarea name="postStory" className="textArea" multiline="true" placeholder="My story..."></textarea>
            </div>
            <div>
              <input className='imgUploadInput' name="coverImg" placeholder="Upload your imgURL" onChange={handleChange} required /> <br />
              <div className="saveButton">
                <Button style={{backgroundColor:"#cddbff"}} type="submit" variant="contained" startIcon={<SaveIcon />}>
                  Save
              </Button>
              </div>
  
            </div>
          </form>
        </div>
      </Modal>
    )
  }