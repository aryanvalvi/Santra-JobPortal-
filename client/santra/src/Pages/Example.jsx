import React from "react";

const Example = () => {
  return (
    <div>
      <div className="boxvideo">
        <video className="video-background" autoPlay muted loop>
          <source src="./bg.mp4" type="video/mp4"></source>
        </video>
      </div>
      Example
    </div>
  );
};

export default Example;
