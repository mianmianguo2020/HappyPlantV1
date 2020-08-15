
import React from 'react';
import Login from './Login'
import Intro from './Intro'
import { Redirect } from "react-router";



const HomePage = (props) => {
if(props.isLoggedIn) {
    return <Redirect to={{pathname: '/feeds'}}/>
}

    return (
        <React.Fragment>
            <Intro />
            <Login login={props.login} />
        </React.Fragment>
    )
}

export default HomePage;



