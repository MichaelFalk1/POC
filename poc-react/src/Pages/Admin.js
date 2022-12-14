import React, {useState,useEffect} from "react";
import axios from 'axios';



function Admin() {
const [Leave, setLeave] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/get').then((response)=>{
            setLeave(response.data);
        },[]);
    });

    const approve = (name) => {
        axios.put(`http://localhost:3001/api/update/approve/${name}`,{
        });
    }
    const denied = (name) => {
        axios.put(`http://localhost:3001/api/update/denied/${name}`,{
        });
    }

    return (<>
    
    <h1>Admin Approve Table</h1>
    
    <table className="tg">
        <thead>
        <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Leave Type</th>
            <th>Leave Reason</th>
            <th>Leave Days</th>
            <th>Approved</th>
            <th>Approve Button</th>
            <th>Denied Button</th>
        </tr>
        </thead>
        <tbody>
        {Leave.map((val) => {
            return (<>
                
                
                    <tr>
                        <td>{val.name}</td>
                        <td>{val.Sdate}</td>
                        <td>{val.Edate}</td>
                        <td>{val.LeaveType}</td>
                        <td>{val.LeaveReason}</td>
                        <td>{val.LeaveDays}</td>
                        <td>{val.LeaveApproved}</td>
                        <td><button onClick={() => {approve(val.name)}}>Approve</button></td>
                        <td><button onClick={() => {denied(val.name)}}>Denied</button></td> 
                    </tr>

                
                
            </>
            );
        })

        }
        </tbody>
    </table>
            
        
    </>
    );
}


export default Admin;

