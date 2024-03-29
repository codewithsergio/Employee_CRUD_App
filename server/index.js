// From my understanding: this is the SERVER, the
// front end needs to make a request to the server, and the
// server will handle all the requests and see what to do
// about it with the database.

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "sergio1234",
  database: "employeeSystem",
});

app.post("/create", (req, res) => {
  // create "/create" endpoint : HANDLE requests
  const name = req.body.name;
  const position = req.body.position;
  const task = req.body.task;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, position, task, wage) VALUES (?,?,?,?)",
    [name, position, task, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees ORDER BY id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/employees3", (req, res) => {
  db.query("SELECT * FROM employees ORDER BY id LIMIT 3", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/employees5", (req, res) => {
  db.query("SELECT * FROM employees ORDER BY id LIMIT 5", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/search:search", (req, res) => {
  let search = req.params.search;
  search = "%" + search + "%";
  db.query(
    "SELECT * FROM employees WHERE name LIKE ? OR id LIKE ? OR position LIKE ? OR task LIKE ?",
    [search, search, search, search],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateEmployee", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const position = req.body.position;
  const task = req.body.task;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET name = ?, position = ?, task = ?, wage = ? WHERE id = ?",
    [name, position, task, wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateWage", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateTask", (req, res) => {
  const id = req.body.id;
  const task = req.body.task;
  db.query(
    "UPDATE employees SET task = ? WHERE id = ?",
    [task, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id; // params instead of id because we get the value from /delete/:id
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
