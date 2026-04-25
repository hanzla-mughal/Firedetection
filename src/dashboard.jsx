import {MdNotificationsNone} from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import Login from "./login";
const Dashboard = () => {
  return (
    <div style={{background:" #111827"}} >

      <div style={{height:'50px',width:'100%',borderBottom:'1.5px solid #2d3748',display:'flex',justifyContent:'space-between',alignItems:"center"}}>
      <p style={{color:'white',display:'flex',justifyContent:'center',alignItems:"center",gap:'25px'}}><IoMdMenu size={20} color="white"/>Dashboard</p>
    
      <div style={{display:'flex',justifyContent:'center',gap:"15px"}}>
      <button style={{background:"transparent",border:'none',cursor:"pointer"}}><MdNotificationsNone size={30} color="white"></MdNotificationsNone></button> 
       <Link to="login"> <button style={{background:"red",border:'none',cursor:"pointer",color:'white',fontSize:'0.9rem',padding:"8px",borderRadius:"8px"}}>
          
          Login</button> 
          </Link>
        </div> 
      </div>
      
     

        </div>
)}

export default Dashboard;