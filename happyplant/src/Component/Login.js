import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import './Login.css'


const inputStyle = {
  marginBottom: '20px'
};


const formStyle = {
  padding: '2.5rem',
  fontSize: 'large'
};

const buttonColor = {
  marginBottom: '20px',
  backgroundColor: 'darkolivegreen'
};


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      helperMessage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.userLogin(event)
  }


  userLogin(event) {
    axios
      .post(
        "api/login",
        {
          name: event.target.name.value,
          password: event.target.password.value,
        },
        {
          withCredentials: true
        }
      )
      .then(response => {
        sessionStorage.setItem("token", response.data.accessToken )
        sessionStorage.setItem("user", response.data.user )
        this.props.login();
        this.props.history.push({ pathname: '/feeds' })
      })
      .catch(error => {
        this.setState({ open: true, name: '', email: '', password: '', confirmedPassword: '' })
      });
  }


  render() {
    return (
      <div>
        <form method="post" name="taskForm" onSubmit={this.handleSubmit} style={formStyle}  >
          <TextField id="standard-basic username" label="username" name="name" style={inputStyle} required /><br />
          <TextField id="standard-basic password" label="password" name="password" type="password" style={inputStyle} required /><br />
          <Button variant="contained" color="primary" type="submit" style={buttonColor} className="button">Login <SendIcon style={{paddingLeft:'3px'}}/></Button><br />
          <Link to='/register'>Register</Link>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={() => this.setState({ open: false })} open={this.state.open} message="Incorrect username or password" />

        </form>
      </div>
    )
  }
}

export default withRouter(Login);

