import React,{useRef} from 'react';



function Leave() {
  const name = useRef();
    const Sdate = useRef();
    const Edate = useRef();
    const LeaveType = useRef();
    const LeaveReason = useRef();
    const LeaveDays = useRef();

    

    
  function FormHandler(e){
    e.preventDefault();
    let data = {
      name: name.current.value,
      Sdate: Sdate.current.value,
      Edate: Edate.current.value,
      LeaveType: LeaveType.current.value,
      LeaveReason: LeaveReason.current.value,
      LeaveDays: LeaveDays.current.innerHTML
  };
  
    console.log(data);
    
  }

  function CalculateLeaveDays(e){
    
    e.preventDefault();
    
    const date1 = Sdate.current.value.split("/");
    const date2 = Edate.current.value.split("/");
    let num=(new Date(date2[0], date2[1], date2[2]) - new Date(date1[0], date1[1], date1[2])) / (1000 * 60 * 60 * 24); 
    LeaveDays.current.innerHTML = "Leave Days: " + ( num);
    
      
    
  }
  return (
    <> 
  
   <div >
      <h1>React App</h1>
        <form onSubmit={FormHandler} className="app" action="procss">

          <label ref={LeaveDays}  id="LeaveDays" className="LeaveDays"></label>
          <label>
            Name & Surname:
            <input ref={name} type="text" name="name" placeholder="Michael Falk"/>
          </label>

          <label>
            Leave Start Date:
            <input onChange={CalculateLeaveDays} ref={Sdate} type="text" name="name" placeholder="2022/06/12"/>
          </label>

          <label>
            Leave End Date:
            <input onChange={CalculateLeaveDays} ref={Edate} type="text" name="name" placeholder="2022/06/22"/>
          </label>

          <label>
            Leave Type:
            <select ref={LeaveType} name="LeaveSelect" id="LeaveType">
              <option value="Type 1">Type 1</option>
              <option value="Type 2">Type 2</option>
              <option value="Type 3">Type 3</option>
              <option value="Type 4">Type 4</option>
            </select>
          </label>

          <label>
            Leave Reason:          
          </label>
          <textarea ref={LeaveReason} name="LeaveReason" id="LeaveReason" cols="30" rows="5" placeholder="Give your reasone here"></textarea>

          <button type="submit">Submit</button>
        </form>

    </div>


    </>
  );
}

export default Leave;
