import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "./firebase";

const Profile = () => {
    const auth = getAuth(app);
    const user = auth.currentUser;
 
   
    return (
          <div style={{background:"#111827", minHeight:"100vh", padding:"30px", color:"white"}}>
            <h1 style={{marginBottom:"20px"}}>Profile</h1>

            <div style={{background:"#1f2937", padding:"30px", borderRadius:"12px", border:"1px solid #374151", maxWidth:"500px"}}>
                
                
                <div style={{display:"flex", alignItems:"center", gap:"20px", marginBottom:"20px"}}>
                   
                    <div>
                        <p style={{fontWeight:"bold", fontSize:"1.2rem"}}>{user?.displayName }</p>
                        <p style={{color:"#9ca3af", fontSize:"0.9rem"}}>{user?.email}</p>
                    </div>
                </div>

                <hr style={{borderColor:"#374151", marginBottom:"20px"}}/>

                {/* Info */}
                <div style={{display:"flex", flexDirection:"column", gap:"12px"}}>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p style={{color:"#9ca3af"}}>UID</p>
                        <p style={{fontSize:"0.85rem"}}>{user?.uid}</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p style={{color:"#9ca3af"}}>Created</p>
                        <p style={{fontSize:"0.85rem"}}>{user?.metadata.creationTime}</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <p style={{color:"#9ca3af"}}>Last Login</p>
                        <p style={{fontSize:"0.85rem"}}>{user?.metadata.lastSignInTime}</p>
                    </div>
                </div>

                <hr style={{borderColor:"#374151", margin:"20px 0"}}/>

            
            </div>
        </div>
    )
}
    

export default Profile;