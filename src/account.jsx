import { useState } from "react"
const Account = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [reapeat,setRepeat]=useState("");
    const [error, setError] = useState("");
 /*function changeEmail(e) {
    setEmail(e.target.value);
    setPassword(e.target.value);
    setRepeat(e.target.value);
  }
  function Password(e) {
    
    setPassword(e.target.value);
   
  }
  function Repeat(e) {
    
    setRepeat(e.target.value);
   
  }*/
 
   function handleSubmit(e) {
      e.preventDefault();
     if(password!=reapeat)
    {
        
        setError("Please match the password");
    }
  
  }

    return (
        <div style={{ color: "white" }}>

            <h1>Welcome to our website</h1>
            <p>Create your account</p>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" autoComplete="new-email" placeholder="Enter your Email" required></input>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"  autoComplete="new-password" placeholder="Password" required minLength='8'></input>
                <input value={reapeat} onChange={(e)=>setRepeat(e.target.value)} type="password" placeholder="Repeat"  required minLength='8'></input>
               

              <button >Create an account</button>
               {error && <p style={{color:'red'}}>{error}</p>}
            </form>
        </div>
    )
}
export default Account