const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
require("dotenv").config();

// MongoDB URI from environment variables or default to a placeholder
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/test";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to connect MongoDB with mongoose
const connectMongoDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri); // Removed deprecated options
    console.log("MongoDB Connected");
    console.log(
      "---------------------------------__--___--____--___---____---____---___"
    );
  } catch (error) {
    console.error("MongoDB Connection Error: ", error.message);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

// Enable Mongoose debugging (optional)
mongoose.set("debug", true);
connectMongoDB();

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false, // Default to false if not provided
  },
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the Todo model
const Todo = mongoose.model("Todo", todoSchema);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Create a new todo
app.post("/todos/create", async (req, res) => {
  try {
    // Create a new Todo instance from the request body
    const newTodo = new Todo({
      title: req?.body?.title,
      // email: req?.body?.email,
      description: req?.body?.description,
      completed: req?.body?.completed,
      id: req?.body?.id,
    });
    console.log("newTodo: ", newTodo);

    // Save the Todo to the database
    const savedTodo = await newTodo.save();
    console.log("savedTodo: ", savedTodo);

    // Respond with the saved Todo
    res.status(201).json({
      data: savedTodo,
      message: "Todo created successfully",
    });
  } catch (error) {
    console.error("Error creating todo:", error.message);

    // Respond with an error message
    res.status(500).json({
      data: null,
      message: "Error creating todo",
      error: error.message,
    });
  }
});

//todos
//get todos
app.get("/todos", async (req, res) => {
  try {
    //get all todos
    let getTodos = await Todo.find();
    console.log("todos: ", getTodos);

    res.status(200).json({
      message: "Success todos",
      data: getTodos,
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error in getting Todos",
      error: error.message,
    });
  }
});

//get todo by id
app.get("/todos/:id", async (req, res) => {
  try {
    let id = req?.params?.id;
    // let findTodoById = await Todo.findById({id:id})
    // let findTodoById = await Todo.findById(id)
    let findTodoById = await Todo.findOne({ id: id });
    console.log("findTodoById: ", findTodoById);

    res.status(200).json({
      data: findTodoById,
      message: "Success in getting todo by id",
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error in getting todo by id",
      error: error.message,
    });
  }
});

//delete todo
app.delete("/todos/delete/:id", async (req, res) => {
  try {
    let id = req?.params?.id;
    let deleteTodo = await Todo.findOneAndDelete({ id: id });
    console.log("deleteTodo: ", deleteTodo);
    res.json({
      data: deleteTodo,
      message: "Success",
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    });
  }
});

//update todo
app.put("/todos/update/:id", async (req, res) => {
  try {
    let id = req?.params?.id;
    let updateTodo = await Todo.findOneAndUpdate(
      { id: id },
      {
        title: req?.body?.title,
        description: req?.body?.description,
        completed: req?.body?.completed,
      }
    );
    console.log("updateTodo: ", updateTodo);
    res.status(200).json({
      data: updateTodo,
      message: "Success",
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    });
  }
});

//auth login
app.post("/auth/login", async (req, res) => {
  try {
    console.log("req.body: ", req.body);
    res.status(200).json({
      data: req.body,
      message: "Success",
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    });
  }
})

//auth signup
app.post("/auth/signup", async (req, res) => {
  try {
    console.log("req.body: ", req.body);
    res.status(200).json({
      data: req.body,
      message: "Success",
    });
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    });
  }
})
 











// app.use((req, res, next) => {
//   console.log("Request Recieved: ", req.method, req.query, req.params);
//   console.log("Date Now: ", new Date().toISOString());
//   console.log("--------------------------------");
//   res.status(200).json({message: "Hello World"})
// })

app.put("/products", (req, res) => {
  let products = [
    {
      id: 1,
      title: "Product 1 by Ahmad ",
      price: 100,
      category: "Category 1",
      description: "Description 1",
      image: "Image 1",
    },
    {
      id: 2,
      title: "Product 2",
      price: 200,
      category: "Category 2",
      description: "Description 2",
      image: "Image 2",
    },
    {
      id: 3,
      title: "Product 3",
      price: 300,
      category: "Category 3",
      description: "Description 3",
      image: "Image 3",
    },
    {
      id: 4,
      title: "Product 4",
      price: 400,
      category: "Category 4",
      description: "Description 4",
      image: "Image 4",
    },
    {
      id: 5,
      title: "Product 5",
      price: 500,
      category: "Category 5",
      description: "Description 5",
      image: "Image 5",
    },
  ];
  res.json(products);
});

app.get("/users/:id", (req, res) => {
  try {
    // console.log("Query Params: ", req.params, req.query);
    // console.log("req.body Recieved: ", req.body);
    console.log("req.headers: ", req.headers);
    let data = {
      id: req.query.id,
      name: req.query.name,
      name: "Ahmad",
      age: 25,

      email: "ahmad@gmail.com",
    };
    res.status(201).json([
      {
        data: data,
        message: "Success",
      },
    ]);
  } catch (error) {
    res.status(501).json({
      data: [],
      message: "Error",
      error: error.message,
    });
  }
});

// add - post method
// update - put method
// delete - delete method
// get - get method

app.get("/xyz", (req, res) => {
  let users = [
    { name: "John", age: 25 },
    { name: "Jane", age: 22 },
    { name: "Jim", age: 32 },
  ];
  res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
