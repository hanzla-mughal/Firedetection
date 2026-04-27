import { useState,useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import Account from "./account";
import { RxHeight } from "react-icons/rx";
import app from "./firebase";
import { getAuth,signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";

const Login=()=>{
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const auth=getAuth(app);
const navigate=useNavigate();


function reset(e){
 e.preventDefault();
 signInWithEmailAndPassword(auth,email,password)
 .then((userCredential)=>{
    const user=userCredential.user;
    
navigate('/');

 })
 .catch((error) => {
        alert(error.message);
    })

   setEmail("");
   setPassword("");

}
useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setTimeout(()=>{
                navigate('/');
            })
        }
    })
}, 2000)
const display={
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    background:"#111827",
    border:"1px solid white"

}
const form={
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
   flexDirection:"column",
   gap:"20px"

}

    return(
       
            <div   style={display}>
            <form    onSubmit={reset}>
                <div style={form}>
                <input  required style={{width:'20rem',height:"40px",borderRadius:"10px",padding:'5px',outline:'none',background:''}} autoComplete="new-email" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your Email"></input>
            
                <input required minLength='8' style={{width:'20rem',height:"40px",borderRadius:"10px",padding:'5px',outline:'none'}} autoComplete="new-password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter your Password"></input>

        <button style={{background: "#ef4444",
color: "white",
width: "100%",
height:"40px",
borderRadius: "8px",
border: "none",
cursor: "pointer"}}  >Sign in </button>
     
        <p style={{color:'white'}}>Did not have an account?<Link style={{ color:"red"}}to='/account'> Sign Up</Link></p>
        </div>
        </form>
           </div>
    

    )
}
export default Login