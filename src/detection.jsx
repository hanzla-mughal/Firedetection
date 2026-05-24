import React, { useRef, useEffect,useCallback,useState } from "react";
import Webcam from "react-webcam";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";
import app from "./firebase";
import { addDoc, collection } from "firebase/firestore";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const audioRef = useRef(null);
  
  const [img, setImg] = useState(null);

  const auth = getAuth(app);
  const user = auth.currentUser;

    const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc); 
    detectFire(imageSrc);
  }, []);

  const detectFire = async (imageSrc) => {
    try {
     

      if (!imageSrc) return;

      const base64Image = imageSrc.split(",")[1];

      const response = await fetch(
        `https://serverless.roboflow.com/firedetection-upd0y/1?api_key=${import.meta.env.VITE_ROBOFLOW_KEY}`,
        {
          method: "POST",
          body: base64Image,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.predictions.length > 0) {
        try {
          audioRef.current.currentTime = 0;
          await audioRef.current.play();
        } catch (err) {
          console.error(err);
        }

        await addDoc(collection(db, "alerts"), {
   timeStamp:new Date(),
  id: user?.uid || "anonymous"
});
      }
     
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
// const interval = setInterval(() => {
//   detectFire();
// }, 3000);
//
// return () => clearInterval(interval);
//, []);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />

      <audio ref={audioRef} src="/alarm.mp3" preload="auto" />
     
        {img && <img src={img} alt="captured" />}
      <button onClick={capture}>Capture photo</button>
    </>
  );
};

export default WebcamCapture;