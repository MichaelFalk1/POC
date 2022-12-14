import React, {useState,useEffect} from "react";
import axios from 'axios';



function Admin() {
const [Leave, setLeave] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/get').then((response)=>{
            setLeave(response.data);
        },[]);
    });

    return (<>
            
        {Leave.map((val) => {
            return (<>
                <div className="card">
                    <h1>{val.name}</h1>
                    <p>{val.Sdate}</p>
                    <p>{val.Edate}</p>
                    <p>{val.LeaveType}</p>
                    <p>{val.LeaveReason}</p>
                    <p>{val.LeaveDays}</p>
                </div>
            </>
            );
        })

        }
    </>
    );
}


export default Admin;

