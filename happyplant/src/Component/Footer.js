import React from 'react';

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "1px",
    position: "fixed",
    left: "0",
    bottom: "0",
    // height: "1px",
    width: "100%",
    fontSize: '70%'
}



function Footer() {
    return (
            <div style={style}>
               Copyright 2020 by Christy Guo. All Rights Reserved.
            </div>
    )
}

export default Footer