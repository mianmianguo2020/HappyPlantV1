import React from 'react';
import axios from 'axios';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withRouter} from 'react-router-dom';
import { Link } from "react-router-dom";
import { createHashHistory } from 'history'
import { Snackbar } from '@material-ui/core';
import {  Redirect } from "react-router";

// import './SignUp.css';

export const history = createHashHistory()

const inputStyle = {
  marginBottom: '20px'
};


const signUpStyle = {
  padding: '2.5rem',
  color:'#1b751b'
};

const buttonColor = {
  marginBottom: '20px',
  backgroundColor: 'darkolivegreen'
};

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: '',
      confirmedPassword: '',
      helperMessage: '',
      open: false,
      errorMessage:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

 handleChange(event) {
  this.setState({
    [event.target.name]:event.target.value
  })
 }

  handleSubmit(event) {
    event.preventDefault();
    if (event.target.password.value === event.target.confirmedPassword.value) {
      this.createUser(event)
      this.setState({ helperMessage: '' })

    }

    else {
      this.setState({
        helperMessage: "the password doesn't match",
        password: '',
        confirmedPassword: ''
      })
    }

  }

  createUser(event) {
    axios
      .post(
        "api/createuser",
        {
            name: event.target.name.value,
            email: event.target.email.value,
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
        this.props.history.push({pathname:'/feeds', state: {username: response.data.user}})
      })

      .catch(error => {
        this.setState({open: true, name:'', email:'', password:'', confirmedPassword:''})       
      });

  }



  render() {

    if(this.props.isLoggedIn) {
      return <Redirect to={{pathname: '/feeds'}}/>
  }

    return (
      <div>
          <form method="post" onSubmit={this.handleSubmit} style={signUpStyle} >
        <h1>Welcome to Happy Plant</h1>
          <TextField id="standard-basic username" label="username" name="name" style={inputStyle} value={this.state.name} onChange={this.handleChange} required /><br />
          <TextField id="standard-basic email" type="email" label="email" name="email" style={inputStyle} onChange={this.handleChange} value={this.state.email} required /><br />
          <TextField id="standard-basic password" label="password" name="password" type="password" style={inputStyle} value={this.state.password} onChange={this.handleChange}  required /><br />
          <TextField id="standard-basic confirmederror " label="confirm your password" name="confirmedPassword" value={this.state.confirmedPassword} helperText={this.state.helperMessage} onChange={this.handleChange} type="password" style={inputStyle} required /><br />
          <Button variant="contained" color="primary" type="submit" style={buttonColor}>Sign up <SendIcon style={{paddingLeft:'3px'}} /></Button><br/>
          <Link to ='/'> Cancel</Link>
          <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'center'}} autoHideDuration={3000} onClose={() => this.setState({open: false})} open={this.state.open} message="username already exists"/>
        </form>
      </div>  
    )
  }
}

export default withRouter(SignUp);


