import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {  Redirect } from "react-router";
import './Form.css'




function Form(props) {

    function HandleSubmit(event) {
        event.preventDefault();
        const searchTerm = event.target.plantName.value
        setTimeout(() => {
            props.setRedirect('/PlantInfo/' + searchTerm)
        }, 100)
        setTimeout(() => {
            props.setRedirect(false)
        }, 200)
    }

    if (props.redirect) {
        return <Redirect to={{pathname: props.redirect}}/>
    }
    return (
        <form style={{ 'flexGrow': '1' }} onSubmit={HandleSubmit}>
            <div className="searchBar">
                <IconButton type="submit"> <SearchIcon /></IconButton>
                <InputBase
                    placeholder="Search"
                    name="plantName"
                    inputProps={{ 'aria-label': 'search' }}
                    required
                />
            </div>
        </form>
    )
}



export default Form;

