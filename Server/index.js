const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password:"password",
    database: "poc_database",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// con.connect((error) => {
//     if(error){
//       console.log(error);
//       return;
//     }
//     console.log('Connection established sucessfully');
//     con.end();
//   });
  

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM leave_table";
    con.query(sqlSelect , (err, result) => {
        res.send(result);
    });
});
app.put('/api/update/approve/:name', (req, res) => {
    const name = req.params.name;
    const sqlUpdate = "UPDATE leave_table SET LeaveApproved = 'Approved' WHERE name = ?";
    con.query(sqlUpdate, name, (err, result) => {
        if(err) console.log(err);
    });
});
app.put('/api/update/denied/:name', (req, res) => {
  const name = req.params.name;
  const sqlUpdate = "UPDATE leave_table SET LeaveApproved = 'Denied' WHERE name = ?";
  con.query(sqlUpdate, name, (err, result) => {
      if(err) console.log(err);
  });
});

app.post('/api/insert', (req, res) => {
  const Name = req.body.Name;
  const Sdate = req.body.Sdate;
  const Edate = req.body.Edate;
  const LeaveType = req.body.LeaveType;
  const LeaveReason = req.body.LeaveReason;
  const LeaveDays = req.body.LeaveDays;
  const LeaveApproved = "Pending";
  
const sqlInsert = "INSERT INTO leave_table (name, Sdate, Edate, LeaveType, LeaveReason,LeaveDays,LeaveApproved) VALUES (?,?,?,?,?,?,?)";
con.query(sqlInsert, [Name, Sdate, Edate, LeaveType, LeaveReason, LeaveDays,LeaveApproved], (err, result) => {
    console.log(result);
    console.log(err);
}
);

// const sqlInsert = "INSERT INTO leave_table (name, Sdate, Edate, LeaveType, LeaveReason,LeaveDays,LeaveApproved) VALUES ('Michael Falk','2021/05/01','2021/05/02','Annual','Holiday','1','Denied')";
// con.query(sqlInsert, (err, result) => {
//     console.log(result);
//     console.log(err);
//     res.send("Values inserted");

// });
});


app.listen(3001, () => {
    console.log('Server running localhost:3001');
    });
    
