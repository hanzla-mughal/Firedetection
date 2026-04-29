import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [img,setImg]=useState(null)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc); 
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      {img && <img src={img} alt="captured"/>}

      <button onClick={capture}>Capture photo</button>
    </>
  );
};
export default WebcamCapture
