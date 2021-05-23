import Webcam from "react-webcam";
import React from "react";
const videoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: "user",
};

const WebcamCapture = (props) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1920,
      height: 1080,
    });

    props.onCapture("profilePic", imageSrc);
  }, [webcamRef, props]);

  return (
    <>
      <Webcam
        audio={false}
        height={1080}
        ref={webcamRef}
        screenshotQuality="1"
        screenshotFormat="image/jpeg"
        width={1920}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
};
export default WebcamCapture;
