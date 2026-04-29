import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [img,setImg]=useState(null);
  const audioRef=useRef(null);
  const safeRef=useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc); 
   Detect(imageSrc);

     
  }, [webcamRef]);

  const Detect=useCallback(async (imageSrc) => {
    const base64Image = imageSrc.split(',')[1];
     
    const response = await fetch(
        `https://serverless.roboflow.com/firedetection-upd0y/1?api_key=${import.meta.env.VITE_ROBOFLOW_KEY}`,
        {
            method: "POST",
            body: base64Image,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );
    
    const data = await response.json();
    console.log(data);
    if(data.predictions.length>0){
      audioRef.current.play();
    }
    else
    {
      safeRef.current.play();

    }
}, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <audio ref={audioRef} src='/alarm.mp3'/>
      <audio ref={safeRef} src='/safe.mp3'/>
     
      {img && <img src={img} alt="captured"/>}
<button onClick={capture}>Capture photo</button> 
    </> 
  );
};
export default WebcamCapture
