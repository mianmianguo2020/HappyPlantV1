import React from 'react';
import Footer from "./Component/Footer";
import HomePage from './Component/HomePage'
import PlantInfo from './Component/PlantInfo'
import { Route, HashRouter } from 'react-router-dom'
import Navbar from "./Component/Navbar";
import SignUp from "./Component/SignUp";
import Feeds from "./Component/Feeds";
import MyGarden from "./Component/MyGarden";


class App extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: '',
      redirect: false
    };
    this.Login = this.Login.bind(this);
    this.Logout = this.Logout.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
  }
  componentDidMount () { 
    this.checkLogin()
  }
  //when the login function run set it to true

  Login() { this.setState({ isLoggedIn: true }); }

  Logout() { this.setState({ isLoggedIn: false }); }

  setRedirect(redirect) {
    this.setState({ redirect });
  }

  checkLogin() {
    if (sessionStorage.getItem("token")) {
      this.setState({ isLoggedIn: true })
    }
  }




  render() {
    return (
      <HashRouter>
        <div >{/* 100vh width */}
          <Navbar isLoggedIn={this.state.isLoggedIn} logout={this.Logout} redirect={this.state.redirect} setRedirect={this.setRedirect} />
          <Route path="/" component={() => <HomePage login={this.Login} isLoggedIn={this.state.isLoggedIn}/>} exact />
          <Route path="/register"  component={() => <SignUp login={this.Login} isLoggedIn={this.state.isLoggedIn}/>} exact />
          <Route path="/PlantInfo/:name" component={PlantInfo} />
          <Route path="/feeds" component={Feeds} />
          <Route path="/mygarden" component={MyGarden} />
          <Footer />
        </div>
      </HashRouter>

    );

  }
}

export default App;


