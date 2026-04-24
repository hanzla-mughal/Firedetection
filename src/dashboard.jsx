import {MdNotificationsNone} from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

const Dashboard = () => {
  return (
    <div style={{background:" #111827"}} >

      <div style={{height:'50px',width:'100%',borderBottom:'1.5px solid #2d3748',display:'flex',justifyContent:'space-between',alignItems:"center"}}>
      <p style={{color:'white',display:'flex',justifyContent:'center',alignItems:"center",gap:'25px'}}><IoMdMenu size={20} color="white"/>Dashboard</p>
      
       <MdNotificationsNone size={30} color="white"></MdNotificationsNone>
      </div>
      


        </div>
)}

export default Dashboard;