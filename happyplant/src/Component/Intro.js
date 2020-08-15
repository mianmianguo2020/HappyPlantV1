import React from 'react';
import './Intro.css';
import EcoIcon from '@material-ui/icons/Eco';


class Intro extends React.Component {


    render() {
        return (
            <div className='briefIntro'>
                <h1 className='textDesgin'>Happy Plant</h1>
                <p className='textDesgin'>
                    <EcoIcon/> Backyard gardening can inspire you to take an interest in the origins of your food
                    and make better choices about what you put on your plate - from Dr. Helen
          </p>
            </div>


        )
    };
}


export default Intro;