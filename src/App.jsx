import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./dashboard";
import SideBar from "./SideBar";
import Login from "./login";
import Account from "./account";
const App=()=>{
    return(
        <div>
        <Routes>
            <Route path='/' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
         <Route path="/Login" element={<Login/>}/>
        
            
            <Route path="/account" element={<Account/>}/>
            
           
            
            
           

            </Route>
        </Routes>
        </div>
    )
}
export default App