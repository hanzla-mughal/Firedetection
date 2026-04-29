import {MdNotificationsNone} from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import Login from "./login";
import app from "./firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const auth=getAuth(app);
  const user=auth.currentUser;
  const navigate=useNavigate();

  return (
    <div style={{background:" #111827"}} >

      <div style={{height:'50px',width:'100%',borderBottom:'1.5px solid #2d3748',display:'flex',justifyContent:'space-between',alignItems:"center"}}>
      <p style={{color:'white',display:'flex',justifyContent:'center',alignItems:"center",gap:'25px'}}><IoMdMenu size={20} color="white"/>Dashboard</p>
    
      <div style={{display:'flex',justifyContent:'center',gap:"15px"}}>
      <button style={{background:"transparent",border:'none',cursor:"pointer"}}><MdNotificationsNone size={30} color="white"></MdNotificationsNone></button> 
        {user ? (
    <img src={user.photoURL} width="40" height="40" style={{borderRadius:"50%", cursor:"pointer"}} onClick={()=>navigate('/profile')}/>
) : (
    <button onClick={()=>navigate('/login')}>Login</button>
)}
          
        </div> 
      </div>
      
     

        </div>
)}

export default Dashboard;