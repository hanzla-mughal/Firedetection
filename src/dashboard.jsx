import { MdNotificationsNone } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import app from "./firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaRunning } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { FaStairs } from "react-icons/fa6";
import { ShieldCheck } from 'lucide-react';
const Dashboard = () => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "alerts"));

        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAlerts(data);
        console.log("Data:", data);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
    fetchData();
  }, []);

  const total = alerts.length;
  const fire = alerts.filter(item => item.status?.toLowerCase() === "fire").length;
  const safe = alerts.filter(item => item.status?.toLowerCase() === "safe").length;

  return (
   
    <div style={{ background: "#111827", minHeight: "100vh", color: "white", fontFamily: "sans-serif" }}>
      
      <div style={{
        height: '50px',
        width: '100%',
        borderBottom: '1.5px solid #2d3748',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: " 15px",
        boxSizing: "border-box"
      }}>
        <div style={{ display: 'flex', alignItems: "center", gap: '10px' }}>
          <IoMdMenu size={24} color="white" style={{ cursor: "pointer" }} />
          <h2 style={{ fontSize: "1rem", margin: 0, fontWeight: "bold" }}>Dashboard</h2>
        </div>
    
        {/* Right Side Elements */}
        <div style={{ display: 'flex', alignItems: 'center', gap: "15px" }}>
          <button style={{ background: "transparent", border: 'none', cursor: "pointer", display: "flex", alignItems: "center" }}>
            <MdNotificationsNone size={26} color="white" />
          </button> 
          
          {user ? (
            <img 
              src={user.photoURL } 
              width="40" 
              height="40" 
              style={{ borderRadius: "50%", cursor: "pointer", objectFit: "cover" }} 
              onClick={() => navigate('/profile')}
              alt="User profile"
            />
          ) : (
            <button 
              onClick={() => navigate('/login')}
              style={{ background: "#D93030", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}
            >
              Login
            </button>
          )}
        </div> 
      </div>
      
      {/* 3. Cards Section Layout (Navbar se alag, neechay) */}
      <div style={{ display: "flex", gap: "15px", padding: "20px", flexWrap: "wrap" }}>
        
        {/* Card 1: Total Alerts */}
        <div style={{ background: "#1f2937", padding: "20px", borderRadius: "12px", border: "1px solid #374151", width: "200px" }}>
          <p style={{ color: "#9ca3af", margin: "0 0 10px 0", fontSize: "0.9rem" }}>Total Alerts</p>
          <p style={{ color: "#3b82f6", fontSize: "2rem", margin: 0, fontWeight: "bold" }}>{total}</p>
        </div>

        {/* Card 2: Fire Detected (Danger Red) */}
        <div style={{ background: "#1f2937", padding: "20px", borderRadius: "12px", border: "1px solid #374151", width: "200px" }}>
          <p style={{ color: "#9ca3af", margin: "0 0 10px 0", fontSize: "0.9rem" }}>Fire Detected</p>
          <p style={{ color: "#ef4444", fontSize: "2rem", margin: 0, fontWeight: "bold" }}>{fire}</p>
        </div>

        {/* Card 3: Safe Scans (Success Green) */}
        <div style={{ background: "#1f2937", padding: "20px", borderRadius: "12px", border: "1px solid #374151", width: "200px" }}>
          <p style={{ color: "#9ca3af", margin: "0 0 10px 0", fontSize: "0.9rem" }}>Safe Scans</p>
          <p style={{ color: "#10b981", fontSize: "2rem", margin: 0, fontWeight: "bold" }}>{safe}</p>
        </div>

      </div>
      {/* Recents Alerts */}
      <div style={{background:"#1f2937", padding:"20px", borderRadius:"12px", border:"1px solid #374151"}}>
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <h2 style={{color:"white"}}>Recent Alerts</h2>
    <button onClick={() => navigate('/history')}
    style={{background: "transparent", border: 'none', cursor: "pointer",color:"#D93030"}}>View all</button>
    </div>
    {alerts.slice(0, 3).map((alert,index) => (
        <div key={index} style={{borderBottom:"1px solid #374151", padding:"10px"}}>
            <p style={{color:"white"}}>{alert.status}</p>
            <p style={{color:"#9ca3af"}}>{alert.timeStamp?.toDate().toLocaleString()}</p>
        </div>
    ))}
</div>
{/* System Status*/}
<div style={{display:"flex",gap:"10px"}}>
<div style={{background:"#1f2937", padding:"20px", borderRadius:"12px", border:"1px solid #374151", marginTop:"20px"}}>
   
    <h2 style={{color:"white"}}>System Status</h2>
    <div style={{display:"flex",gap:"15px"}}>
      <ShieldCheck size={60} color="#22c55e" style={{marginTop:"10px"}}/>
      <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
    <p style={{color:"#22c55e",flex:"1rem",marginTop:"10px"}}> All Systems Operational</p>
    <p>Your system is working properly
and monitoring is active.</p>
</div>
</div>
    <div style={{display:"flex", gap:"20px", marginTop:"10px"}}>
        <p style={{color:"white" }}>Camera: <span style={{color:"#22c55e"}}>Online</span></p>
        <p style={{color:"white"}}>AI Model: <span style={{color:"#22c55e"}}>Active</span></p>
        <p style={{color:"white"}}>Notifications: <span style={{color:"#22c55e"}}>Enabled</span></p>
    </div>
</div>
{/*Safety Instruction*/}
<div style={{background:"#1f2937", padding:"20px", borderRadius:"12px", border:"1px solid #374151", marginTop:"20px"}}>
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <h2 style={{color:"white"}}>Safety Instructions</h2>
     <button onClick={() => navigate('/safety')}
    style={{background: "transparent", border: 'none', cursor: "pointer",color:"#D93030"}}>View all</button>
   </div>
    <div style={{display:"flex", gap:"20px", marginTop:"10px"}}>
        <div style={{background:"#111827", padding:"15px", borderRadius:"10px", width:"150px", textAlign:"center"}}>
            <p style={{fontSize:"2rem"}}>< FaRunning   /></p>
            <p style={{color:"white", fontWeight:"bold"}}>Stay Calm</p>
            <p style={{color:"#9ca3af", fontSize:"0.8rem"}}>Don't panic, take deep breath</p>
        </div>
        <div style={{background:"#111827", padding:"15px", borderRadius:"10px", width:"150px", textAlign:"center"}}>
            <p style={{fontSize:"2rem"}}><FaStairs  /></p>
            <p style={{color:"white", fontWeight:"bold"}}>Evacuate</p>
            <p style={{color:"#9ca3af", fontSize:"0.8rem"}}>Use stairs, not elevator</p>
        </div>
        <div style={{background:"#111827", padding:"15px", borderRadius:"10px", width:"150px", textAlign:"center"}}>
            <p style={{fontSize:"2rem"}}><IoCall /></p>
            <p style={{color:"white", fontWeight:"bold"}}>Call Emergency</p>
            <p style={{color:"#9ca3af", fontSize:"0.8rem"}}>Call 101 immediately</p>
        </div>
    </div>
</div>
</div>
    </div>
  );
};

export default Dashboard;