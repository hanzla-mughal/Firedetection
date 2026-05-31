import React, { useRef, useEffect, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";
import app from "./firebase";
import { addDoc, collection } from "firebase/firestore";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const audioRef = useRef(null);
  const [status, setstatus] = useState("Loading...");
  const [img, setImg] = useState(null);
  const auth = getAuth(app);
  const lastSafeRef = useRef(0);
  const user = auth.currentUser;
  const detectFire = useCallback(async () => {
    let fireFound = false;
    let smokeFound = false;
    try {
      const imageSrc = webcamRef.current?.getScreenshot();
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
        },
      );
      const data = await response.json();
      console.log(data);
      try {
        if (data.predictions.length > 0) {
          data.predictions.forEach((p) => {
            if (p.class.toLowerCase() === "fire") fireFound = true;
            if (p.class.toLowerCase() === "smoke") smokeFound = true;
          });
          if (fireFound) {
            setstatus("🔥 Fire Detected");
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else if (smokeFound) {
            setstatus("💨 Smoke Detected");
          }
        } else {
          setstatus("✅ Safe");
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }
      } catch (err) {
        console.error(err);
      }
      if (fireFound || smokeFound) {
        await addDoc(collection(db, "alerts"), {
          timeStamp: new Date(),
          id: user?.uid || "anonymous",
          status: fireFound ? "fire" : "smoke",
        });
      }
      else {
         const now = Date.now();
          
    if((now - lastSafeRef.current > 60000)) {
      lastSafeRef.current = now;
    await addDoc(collection(db, "alerts"), {
         timeStamp: new Date(),
            id: user?.uid || "anonymous",
            status: "safe"
    });
}}
    } catch (err) {
      console.error(err);
    }
  }, []);
  //capture
  // const capture = useCallback(() => {
  // const imageSrc = webcamRef.current.getScreenshot();
  // setImg(imageSrc);
  // detectFire(imageSrc);
  //}, [detectFire]);
  //retake
  const retake = () => {
    setImg(null);
    setstatus("Loading...");
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      detectFire();
    }, 8000);
    return () => clearInterval(interval);
  }, [detectFire]);
  const style = {
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "10px",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#111827",
minHeight: "100vh"


      }}
    >
      <h1 style={{color: "white",marginBottom: "20px"}}>Fire Detection</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{
          width: "400px",
          height: "300px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #ef4444",
borderRadius: "12px"
        }}
      />
      <audio ref={audioRef} src="alarm.mp3" loop preload="auto"></audio>

      <div
        style={{
          display: "flex",
          justifyContent: "flexStart",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <button style={style} onClick={retake}>
            Retake
          </button>
        </div>
<p style={{ color: "white", fontSize: "1.1rem", marginTop: "10px", fontWeight: "600" }}>
          Current Status: {status} </p>      </div>
    </div>
  );
};

export default WebcamCapture;
