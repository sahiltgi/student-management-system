const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sahil123",
  database: "school"
});
//db name= school
//table= student
const app = express();
app.use(bodyParser.json());
connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});

app.get("/", function(req, res) {
  connection.query("SELECT * from student", function(err, rows, fields) {
    connection.end();
    if (!err) {
      console.log("The solution is: ", rows);
      res.status(200).send({ status: "ok query", rows: rows });
    } else {
      console.log("Error while performing Query.");
    }
  });
});

app.post("/api/student", (req, res) => {
  let data = {
    student_id: req.body.student_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    student_address: req.body.student_address,
    gender: req.body.gender,
    email: req.body.email,
    contact_no: req.body.contact_no,
    father_name: req.body.father_name,
    mother_name: req.body.mother_name,
    class: req.body.class
  };
  let sql = "INSERT INTO student SET ?";
  let query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

app.delete("/api/student/:student_id", (req, res) => {
  let sql =
    "DELETE FROM student WHERE student_id=" + req.params.student_id + "";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

app.get("/api/student/:student_id", (req, res) => {
  let sql = "SELECT * FROM student WHERE student_id=" + req.params.student_id;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

app.listen(4500, () => {
  console.log("Server started on port 3000...");
});
