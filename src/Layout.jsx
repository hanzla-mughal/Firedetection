import { Routes ,Route} from "react-router-dom";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Dashboard from "./dashboard";

function Layout(){
    return(
        <div style={{display:'flex',width: '100%' }}>
            
        <div style={{ borderRight: '1.5px solid #2d3748',    height: '100vh',
    margin: 0,
    padding: 0
}}>
        <SideBar />
        </div>

<div style={{ flex: 1, padding: '20px', backgroundColor: ' #111827' }} >
    <Outlet/>
        </div>
        
    </div>
    )
}
export default Layout