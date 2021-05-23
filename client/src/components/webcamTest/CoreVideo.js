import React, { useRef } from 'react';
import VideoButton from './VideoButton';

// const captureVideoButton = document.querySelector(
//   "#screenshot .capture-button"
// );
// const screenshotButton = document.querySelector("#screenshot-button");
// const img = document.querySelector("#screenshot img");
// const video = document.querySelector("#screenshot video");

export const canvas = document.createElement('canvas');
export const img = document.createElement('img');
const CoreVideo = (props) => {
  let videoRef = useRef(null);
  let screenShot = useRef(null);

  const handleSuccess = (stream) => {
    screenShot.current.disabled = false;
    videoRef.current.srcObject = stream;
  };
  const onScreenShot = () => {
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    // Other browsers will fall back to image/png
    img.src = canvas.toDataURL('image/webp');
    props.onScreenShot(img);
  };
  const onCapture = () => {
    const constraints = {
      video: true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(handleSuccess)
      .catch((error) => console.error(error));
  };

  //onClick: for puse and play buttons.
  const onClick = (e) => {
    e.target.id === 'play' ? videoRef.current.play() : videoRef.current.pause();
  };

  return (
    <div>
      <video autoplay controls muted ref={videoRef}>
        <source
          src={'http://techslides.com/demos/sample-videos/small.mp4'}
          type="video/mp4"
        ></source>
      </video>
      <VideoButton id="play" onClick={onClick} />
      <VideoButton id="pause" onClick={onClick} />
      <VideoButton id="screenShot" onClick={onScreenShot} ref={screenShot} />
      <VideoButton id="capture" onClick={onCapture} />
    </div>
  );
};
export default CoreVideo;
