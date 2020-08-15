import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './Modai.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '60%',
    boxShadow: theme.shadows[5],
    marginLeft: '15%',
    display: 'flex',
    marginTop: '100px'

  },
}));

export default function SimpleModal(props) {
  const imageURL = props.imageURL;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const body = {
      "_id": props.postId
    }
    axios
      .post("api/delete", body, { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } })
      .then(() => {
        setOpen(false);
        props.renderAllPosts();
      })
      .catch(error => {
        console.log('post delete error', error)
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      "_id": props.postId,
      singleComment: event.target.comment.value,
      user: props.commentAuthor
    }
    axios
      .post("api/comment", body, { headers: { Authorization: "Bearer " + sessionStorage.getItem("token") } })
      .then(response => {
        props.renderAllPosts();
      })
      .catch(error => {
      });

      event.target.comment.value=""
  }

  return (
    <div className='boxWidth' >
      <div className="imgDiv grow"><div className='imgStyle ' onClick={handleOpen} style={{ backgroundImage: 'url("' + imageURL + '")', height: "290px" }}></div></div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <div className='imgStyle' style={{ backgroundImage: 'url("' + imageURL + '")', height: '80vh' }} />
          <div id="simple-modal-description" className='testStyle'>
            <div>
              <div className="postAuthor" >
                <AccountCircleIcon style={{ marginRight:"10px" }} /> Author: {props.author}
              </div>
              <div className="postStyle">{props.postStory}</div><hr />
              <div style={{ overflow: 'auto' }}><strong><span className="commentsStyle">Comments :</span></strong>
                {props.comments.map(comment =>
                  (<div key={comment._id} className='commentStyle' >
                    <AccountCircleIcon className='accountIconStyle' /> <span className="usernameStyle">{comment.user.user.name}:</span>  {comment.singleComment}
                  </div>))}
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <input name="comment" placeholder="Add a comment" className="addCommentsStyle" />
                <IconButton type="submit" aria-label="add">
                  <AddCircleOutlineIcon />
                </IconButton>
              </form>
            </div>
            {props.isMyPosts ? <div className="deleteButton"><Button style={{color:"white" , background:"green", "border-radius":"20px"}} startIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button></div> : null}
          </div>
        </div>
      </Modal>


    </div>
  );
}

