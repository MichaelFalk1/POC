import React,{useRef,useState} from 'react';
import axios from 'axios';



function Leave() {
const Startdate = useRef();
const Enddate = useRef();
const LeaveDay = useRef();
  const [LeaveDays, setLeaveDays] = useState(0);
  const[name, setName] = useState("");
  const[Sdate, setSdate] = useState("");
  const[Edate, setEdate] = useState("");
  const[LeaveType, setLeaveType] = useState("");
  const[LeaveReason, setLeaveReason] = useState("");

   
const submit =()=>{
  axios.post('http://localhost:3001/api/insert',{Name:name,Sdate:Sdate,Edate:Edate,LeaveType:LeaveType,LeaveReason:LeaveReason,LeaveDays:LeaveDays}).then(()=>{
    alert("Leave hase been logged");
  });
};

    

    


  function CalculateLeaveDays(e){
    
    e.preventDefault();
    setEdate(Enddate.current.value);
    setSdate(Startdate.current.value);
    const date1 = Startdate.current.value.split("/");
    const date2 = Enddate.current.value.split("/");
    let num=(new Date(date2[0], date2[1], date2[2]) - new Date(date1[0], date1[1], date1[2])) / (1000 * 60 * 60 * 24); 
    LeaveDay.current.innerHTML = ( num);
    setLeaveDays(num);
    
      
    
  }
  return (
    <> 
  
   <div >
      <h1>React App</h1>
        <form  className="app" action="procss">

          <label  ref={LeaveDay} id="LeaveDay" className="LeaveDay"></label>
          <label>
            Name & Surname:
            <input onChange={(e)=>{setName(e.target.value)}} type="text" name="name" placeholder="Michael Falk"/>
          </label>

          <label>
            Leave Start Date:
            <input onChange={CalculateLeaveDays} ref={Startdate} type="text" name="name" placeholder="2022/06/12"/>
          </label>

          <label>
            Leave End Date:
            <input onChange={CalculateLeaveDays} ref={Enddate}  type="text" name="name" placeholder="2022/06/22"/>
          </label>

          <label>
            Leave Type:
            <select onChange={(e)=>{setLeaveType(e.target.value)}} name="LeaveSelect" id="LeaveType">
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
              <option value="Type 3">Type 3</option>
              <option value="Type 4">Type 4</option>
            </select>
          </label>

          <label>
            Leave Reason:          
          </label>
          <textarea onChange={(e)=>{setLeaveReason(e.target.value)}} name="LeaveReason" id="LeaveReason" cols="30" rows="5" placeholder="Give your reasone here"></textarea>

          <button onClick={submit}>Submit</button>
        </form>

    </div>


    </>
  );
}

export default Leave;
