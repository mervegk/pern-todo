const express = require('express');
const cors = require('cors');
const pool = require('./db')
const app = express();

//middleware
app.use(cors());
app.use(express.json())

/* ROUTES */

//Create
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description)  VALUES($1) RETURNING *", [description]);

    res.json(newTodo.rows);
  } catch (err) {
    console.log(err.message)
  }
});

//Get All
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo")

    res.json(allTodos.rows)
  } catch (err) {
    console.log(err.message)
  }
});

//Get Single
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])

    res.json(todo.rows)
  } catch (err) {
    console.log(err.message)
  }
});

//Update


//Delete



app.listen(5000, () => {
  console.log('Server running on port 5000');

})