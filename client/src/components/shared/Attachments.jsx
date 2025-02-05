import React from 'react'

const Attachments = ({ file, url }) => {
  
    switch (file) {
        case "vedio" : 
            <vedio src={url} preload="none" width={"200px"} controls />;
            break;

        case "image" :
            <img src={url} alt={Attachments} />
            break;
        
        default : 
            break;
    }  

}

export default Attachments