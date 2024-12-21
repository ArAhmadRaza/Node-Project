const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
require('dotenv').config();

// MongoDB URI from environment variables or default to MongoDB Atlas URI (replace with your actual URI)
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/todos?retryWrites=true&w=majority';

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to connect MongoDB with mongoose
const connectMongoDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    // Connect to MongoDB Atlas using the URI
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
    console.log("--------------------------------");
  } catch (error) {
    console.error("MongoDB Connection Error: ", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

// Connect to MongoDB
connectMongoDB();

// Enable Mongoose debugging (optional)
mongoose.set('debug', true);





app.get('/', (req, res) => {
  res.send("Server is running")
})

//todos
//get todos
app.get('/todos', (req, res) => {
  try {
    let todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
      { id: 3, title: 'Todo 3', completed: false },
    ]

    res.json({
      data: todos,
      message: "Success",
    })
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    })
  }
})

//get todo by id
app.get('/todos/:id', (req, res) => {
  try {
    let todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
      { id: 3, title: 'Todo 3', completed: false },
    ]
    let todo = todos.find(todo => todo.id === parseInt(req.params.id))
    
    res.json({
      data: todo,
      message: "Success",
    })
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    })
  }
})

//create todo
app.post('/todos/create', (req, res) => {
  try {
    
    let todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
      { id: 3, title: 'Todo 3', completed: false },
    ]
    let newTodo = {
      id: todos.length + 1,
      title: req.body.title,
      completed: req.body.completed,
    }
    todos.push(newTodo)

    res.json({
      data: newTodo,
      message: "Success",
    })
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    })
  }
})

//delete todo
app.delete('/todos/:id', (req, res) => {
  try {
    let todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
      { id: 3, title: 'Todo 3', completed: false },
    ]
    let todo = todos.find(todo => todo.id === parseInt(req.params.id))
    todos = todos.filter(todo => todo.id !== parseInt(req.params.id))
    res.json({
      data: todo,
      message: "Success",
    })
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    })
  }
})

//update todo
app.put('/todos/update/:id', (req, res) => {
  try {
    let todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
      { id: 3, title: 'Todo 3', completed: false },
    ]
    let todo = todos.find(todo => todo.id === parseInt(req.params.id))
    todo.title = req.body.title
    todo.completed = req.body.completed
    res.json({
      data: todo,
      message: "Success",
    })
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    })
  }
})
















// app.use((req, res, next) => {
//   console.log("Request Recieved: ", req.method, req.query, req.params);
//   console.log("Date Now: ", new Date().toISOString());
//   console.log("--------------------------------");
//   res.status(200).json({message: "Hello World"})
// })




app.put('/products', (req, res) => {
  let products = [
    { id: 1, title: 'Product 1 by Ahmad ', price: 100, category: 'Category 1', description: 'Description 1', image: 'Image 1' },
    { id: 2, title: 'Product 2', price: 200, category: 'Category 2', description: 'Description 2', image: 'Image 2' },
    { id: 3, title: 'Product 3', price: 300, category: 'Category 3', description: 'Description 3', image: 'Image 3' },
    { id: 4, title: 'Product 4', price: 400, category: 'Category 4', description: 'Description 4', image: 'Image 4' },
    { id: 5, title: 'Product 5', price: 500, category: 'Category 5', description: 'Description 5', image: 'Image 5' },
]
res.json(products)
  })
  












app.get('/users/:id', (req, res) => {
 try {
  // console.log("Query Params: ", req.params, req.query);
  // console.log("req.body Recieved: ", req.body);
  console.log("req.headers: ", req.headers);
  
  

  let data = {
    id: req.query.id,
    name: req.query.name,
    name: 'Ahmad',
    age: 25,
    email: 'ahmad@gmail.com'
  }
  res.status(201).json([{
    data: data,
    message: "Success"
  }])
 } catch (error) {
  res.status(501).json({
    data: [],
    message: "Error",
    error: error.message,
  })
 }

})



// add - post method
// update - put method
// delete - delete method
// get - get method


app.get('/xyz', (req, res) => {
  let users = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 22 },
      { name: 'Jim', age: 32 }
  ]
  res.json(users)
});







app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })



















