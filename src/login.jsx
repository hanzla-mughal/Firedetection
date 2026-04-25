import { useState } from "react"
import { Link } from "react-router-dom";
import Account from "./account";
const Login=()=>{
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

function reset(e){
 e.preventDefault();
   setEmail("");
   setPassword("");

}

    return(
        <div>
            <form onSubmit={reset}>
                
            <input autoComplete="new-email" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter your Email"></input>
                        <input  autoComplete="new-password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter your Password"></input>

        <button  >Sign in </button>
        <p style={{color:'white'}}>Did not Have an account?<Link style={{ color:"red"}}to='/account'> Sign Up</Link></p>
        </form>
        </div>

    )
}
export default Login