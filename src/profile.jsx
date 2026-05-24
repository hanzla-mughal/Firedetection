import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "./firebase";

const Profile = () => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    const navigate = useNavigate();
 const handleSignOut=()=>{

    signOut(auth).then(()=>

    {
       navigate('/login')
    })
   .catch((error)=>
         alert(error.message)
)
 }
   
    return (
        <div style={{color:"white", padding:"20px"}}>
            <h1>Profile</h1>
           
             <p>Email: {user?.email}</p>
            <p>Name: {user?.displayName}</p>
            <p>UID: {user?.uid}</p>
            <p>Created: {user?.metadata.creationTime}</p>
            <p>Last Login:{user?.metadata.lastSignInTime}</p>
            

            <button onClick={handleSignOut}>Sign out</button>
        </div>
    )
}
export default Profile;