import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const History = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            const q = query(collection(db, "alerts"), orderBy("timeStamp", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAlerts(data);
        };
        fetchAlerts();
    }, []);

    return (
        <div style={{color:"white", padding:"20px"}}>
            <h1>Alert History</h1>
            {alerts.map((alert) => (
                <div key={alert.id}>
                    <p>Status: {alert.status}</p>
                    <p>Time: {alert.timeStamp?.toDate().toLocaleString()}</p>
                    <hr/>
                </div>
            ))}
        </div>
    )
}
export default History;