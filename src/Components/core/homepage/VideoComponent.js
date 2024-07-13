import React from 'react';

import { Link } from 'react-router-dom'; // Import Link component
// Replace with actual path to your video

const VideoComponent = ({Banner}) => {
    return (
      <div className="demo">
        <div class="hover-point"></div>
            <div class="hover-point"></div>
            <div class="hover-point"></div>
            <div class="hover-point"></div>
            <div class="hover-point"></div>
            <div class="hover-point"></div>
            <div class="hover-point"></div>
            <div class="hover-point"></div>
            <div class="box-contents">
              <video muted loop autoPlay className="video-element shadow-blue-100 w-[1035px] h-[515px] top-[500px] left-[203px]">
    <source src={Banner} type="video/mp4"/>
  </video></div>
      </div>
    );
  };
  
  export default VideoComponent;
