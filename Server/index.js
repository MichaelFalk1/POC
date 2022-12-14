const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password:"Michaelfalk9",
    database: "poc_database",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

con.connect((error) => {
    if(error){
      console.log('Error connecting to the MySQL Database');
      return;
    }
    console.log('Connection established sucessfully');
  });
  con.end((error) => {
  });

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM leave_table";
    con.query(sqlSelect , (err, result) => {
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {
  const Name = req.body.Name;
  const Sdate = req.body.Sdate;
  const Edate = req.body.Edate;
  const LeaveType = req.body.LeaveType;
  const LeaveReason = req.body.LeaveReason;
  const LeaveDays = req.body.LeaveDays;
const sqlInsert = "INSERT INTO leave_table (name, Sdate, Edate, LeaveType, LeaveReason,LeaveDays) VALUES (?,?,?,?,?)";
con.query(sqlInsert, [Name, Sdate, Edate, LeaveType, LeaveReason, LeaveDays], (err, result) => {
    console.log(result);
}
);
});


app.listen(3001, () => {
    console.log('Server running localhost:3001');
    });
    
