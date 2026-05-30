import { MdNotificationsNone } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import app from "./firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "alerts"));
        console.log("Total docs:", querySnapshot.docs.length);

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
    // 1. Full Page Dark Background Wrapper
    <div style={{ background: "#111827", minHeight: "100vh", color: "white", fontFamily: "sans-serif" }}>
      
      {/* 2. Top Header / Navbar Line */}
      <div style={{
        height: '60px',
        width: '100%',
        borderBottom: '1.5px solid #2d3748',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: "0 20px",
        boxSizing: "border-box"
      }}>
        {/* Left Side Elements */}
        <div style={{ display: 'flex', alignItems: "center", gap: '15px' }}>
          <IoMdMenu size={24} color="white" style={{ cursor: "pointer" }} />
          <h2 style={{ fontSize: "1.2rem", margin: 0, fontWeight: "600" }}>Dashboard</h2>
        </div>
    
        {/* Right Side Elements */}
        <div style={{ display: 'flex', alignItems: 'center', gap: "15px" }}>
          <button style={{ background: "transparent", border: 'none', cursor: "pointer", display: "flex", alignItems: "center" }}>
            <MdNotificationsNone size={26} color="white" />
          </button> 
          
          {user ? (
            <img 
              src={user.photoURL || "https://via.placeholder.com/40"} 
              width="40" 
              height="40" 
              style={{ borderRadius: "50%", cursor: "pointer", objectFit: "cover" }} 
              onClick={() => navigate('/profile')}
              alt="User profile"
            />
          ) : (
            <button 
              onClick={() => navigate('/login')}
              style={{ background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}
            >
              Login
            </button>
          )}
        </div> 
      </div>
      
      {/* 3. Cards Section Layout (Navbar se alag, neechay) */}
      <div style={{ display: "flex", gap: "20px", padding: "25px", flexWrap: "wrap" }}>
        
        <div style={{ display: "flex", gap: "20px", padding: "20px 0" }}>
    
    {/* 1. Total Alerts Card */}
    <div style={{ 
        background: "#1e293b", 
        padding: "20px", 
        borderRadius: "12px", 
        border: "1px solid #334155", 
        width: "220px" 
    }}>
        <p style={{ color: "#94a3b8", margin: "0 0 5px 0", fontSize: "0.9rem" }}>Total Alerts</p>
        <p style={{ color: "#ef4444", fontSize: "2.2rem", margin: "0 0 5px 0", fontWeight: "bold" }}>{total}</p>
    </div>

    {/* 2. Fire Detected Card */}
    <div style={{ 
        background: "#1e293b", 
        padding: "20px", 
        borderRadius: "12px", 
        border: "1px solid #334155", 
        width: "220px" 
    }}>
        <p style={{ color: "#94a3b8", margin: "0 0 5px 0", fontSize: "0.9rem" }}>Fire Detected</p>
        <p style={{ color: "#ef4444", fontSize: "2.2rem", margin: "0 0 5px 0", fontWeight: "bold" }}>{fire}</p>
    </div>

    {/* 3. Safe Scans Card */}
    <div style={{ 
        background: "#1e293b", 
        padding: "20px", 
        borderRadius: "12px", 
        border: "1px solid #334155", 
        width: "220px" 
    }}>
        <p style={{ color: "#94a3b8", margin: "0 0 5px 0", fontSize: "0.9rem" }}>Safe Scans</p>
        <p style={{ color: "#10b981", fontSize: "2.2rem", margin: "0 0 5px 0", fontWeight: "bold" }}>{safe}</p>
    </div>

</div>

      </div>

    </div>
  );
};

export default Dashboard;