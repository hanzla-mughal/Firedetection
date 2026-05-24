import { Route, NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

import { IoSettingsOutline } from "react-icons/io5";


import { MdOutlineCameraAlt,MdHistory,MdNotificationsNone } from "react-icons/md";
import { CiLineHeight } from "react-icons/ci";


const SideBar=()=>{
    const navlinkstyles=({isActive})=>({
    display: 'flex',
    alignItems:'center',
  gap:"10px",
    padding: '10px ',
    color: isActive ? 'white' : 'white',
    backgroundColor: isActive ? '#D93030' : 'transparent',
    borderRadius: '5px',
    textDecoration: 'none',
   


  });
  const display={
   
   width: '220px',
      height: '100vh',
      backgroundColor: '#111827',
      padding: '20px',
     

  }
  const logo={
marginBottom:'25px',
display:"flex",
flexDirection:'column',
justifyContent:'center',
alignItems:'center',
lineHeight:'1.2',
textAlign:'center'
  }
 

    return(
        <div style={display}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '25px' }}>
                <img src="/logo.png" style={{ width: '50px', height: '60px', objectFit: 'contain' }} />
                <div>
                    <p style={{ color: 'white', fontSize: '1.4rem', fontFamily: 'Poppins', fontWeight: 'bold', margin: 0 }}>
                        Fire<span style={{ color: '#D93030' }}>Guard</span>
                    </p>
                    <p style={{ color: 'white', fontSize: '13px', margin: 0 }}>
                        Fire Detection System
                    </p>
                </div>
            </div>

            <nav  style={{
  display: 'flex',
  flexDirection: 'column',  
  gap: '5px'}}>
                 <NavLink to="/"style={navlinkstyles} ><GoHome  size={20}/>Dashboard</NavLink>  
                <NavLink to='/detection' style={navlinkstyles}><MdOutlineCameraAlt size={20}/>Detection</NavLink>
                <NavLink to="/history" style={navlinkstyles}><MdHistory size={20}/>History</NavLink>
                <NavLink to="/safety" style={navlinkstyles}><MdNotificationsNone  size={20}/>Safety Instructions</NavLink>
                <NavLink to="/profile" style={navlinkstyles}><CgProfile size={20}/>Profile</NavLink>
                <NavLink to="/settings" style={navlinkstyles}><IoSettingsOutline size={20}/>Settings</NavLink>

            </nav>
            <div style={{backgroundColor: '#1a1f2e',border:'1.2px solid red',padding:'10px',borderRadius:'10px', marginTop:"100px",display:'flex',flexDirection:"column",justifyContent:"center",alignItems:'center'}}>
               <div style={{display:"flex",alignItems: 'center', gap: '5px',lineHeight:4}}>
                <img src="/logo.png" style={{ width: '40px', height: '40px', objectFit: 'contain' }}></img>
                <p style={{color:'red',fontFamily:'Poppins',fontWeight:'500'}}>Emergency</p>
                </div>
            <div style={{lineHeight:1.2,color:'white',textAlign:'center'}}>
                <p>If you see fire</p>
                <p>Call <span style={{fontSize:'1.5rem',color:'red',fontFamily: 'Orbitron'}}>101</span></p>
                </div>
            </div>
        </div>
    )
}
export default SideBar
