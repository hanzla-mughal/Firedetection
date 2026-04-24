import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./dashboard";
import SideBar from "./SideBar";
const App=()=>{
    return(
        <div>
        <Routes>
            <Route path='/' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
           

            </Route>
        </Routes>
        </div>
    )
}
export default App