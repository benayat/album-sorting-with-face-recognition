import { useRef } from 'react';

const VideoLoader = ({ src }) => {
  const videoRef = useRef(undefined);

  return (
    <div>
      <div>calculaing the future, please wait</div>
      <div>
        <video muted autoPlay loop ref={videoRef}>
          <source type='video/mp4' src={src} />
        </video>
      </div>
      <div className='audioButtons'>
        <button onClick={() => (videoRef.current.muted = false)}>unmute</button>
        <button onClick={() => (videoRef.current.muted = true)}>mute</button>
      </div>
    </div>
  );
};
export default VideoLoader;
