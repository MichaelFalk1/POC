const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const {google} = require('googleapis'); 
const {OAuth2} = google.auth;

const oauth2Client = new OAuth2('512492202332-an4rvv0a4g92405q7j1a7c8ivjgu90u9.apps.googleusercontent.com','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');

oauth2Client.setCredentials({refresh_token:'1//042mddXtf0ek8CgYIARAAGAQSNwF-L9Irq_XdNFLnZSM93dm79nCLI69HOkgQE4cK5HsUm4tD8_xJn0su1VQCsGRDLDQ1F-scMIA'});

const callander = google.calendar({version:'v3',auth:oauth2Client});

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

app.post('/api/calender', (req, res) => {
    res.send("Values inserted");
    const Sdate = req.body.Sdate;
    const Edate = req.body.Edate;
    const LeaveType = req.body.LeaveType;
    const LeaveReason = req.body.LeaveReason;

    const event = {
                summary: LeaveType,
                location: null,
                description: LeaveReason,
                start: {
                    dateTime: Sdate,
                    timeZone: 'South Africa',
                },
                end: {
                    dateTime: Edate,
                    timeZone: 'South Africa',
                },
                colorId: 1,

            };
            callander.freebusy.query({
                resource: {
                    timeMin: Sdate,
                    timeMax: Edate,
                    timeZone: 'South Africa',
                    items:[{id:'primary'}],
                },

            }, (err, res) => {
                if (err) return console.error('Free Busy Query Error: ', err);

                const eventArr = res.data.calendars.primary.busy;

                if (eventArr.length === 0) return callander.events.insert({calendarId: 'primary', resource: event}, err => {
                    if (err) return console.error('Error Creating Calender Event:', err);
                    return console.log('Calendar event created.');
                });

                return console.log(`Sorry I'm busy...`);
            });


});
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
    
