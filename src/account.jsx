import { useState } from "react"
import { FcGoogle } from "react-icons/fc"

const Account = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reapeat, setRepeat] = useState("");
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
    if (password != reapeat) {

      setError("Please match the password");
    }
    else {
      setError('');
    }

  }

  return (
    <div style={{ background: "#111827", gap: '10px', height: "90vh", color: "white", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: "column" }}>
      <div style={{ display: 'flex', justifyContent: "center", flexDirection: "column", gap: '10px' }}>
        <h1>Welcome to our website</h1>
        <p>Create your account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ gap: "20px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column" }}>
          <input style={{ width: '20rem', height: "40px", borderRadius: "10px", padding: '5px', outline: 'none' }} value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="new-email" placeholder="Enter your Email" required></input>
          <input style={{ width: '20rem', height: "40px", borderRadius: "10px", padding: '5px', outline: 'none' }} value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="new-password" placeholder="Password" required minLength='8'></input>
          <input style={{ width: '20rem', height: "40px", borderRadius: "10px", padding: '5px', outline: 'none', }} value={reapeat} onChange={(e) => setRepeat(e.target.value)} type="password" placeholder="Repeat" required minLength='8'></input>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button style={{
            background: "#ef4444",
            color: "white",
            width: "100%",
            height: "40px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer"
          }} >Create an account</button>

        </div>
      </form>
      <hr style={{ width: "50%", borderColor: "#374151" }} />
      Or Sign in with
      <div>


        <button style={{ padding: "10px", display: 'flex', gap: "5px", alignItems: "center", justifyContent: 'center', fontSize: "0.9rem", cursor: 'pointer', background: "white", border: 'none', borderRadius: "10px" }}><FcGoogle size={20} />Sign in with Google</button>
      </div>
    </div>

  )
}
export default Account