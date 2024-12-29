"use client";
import { useEffect, useState } from "react";
import "../globals.css"


const fetchTodos = async () => {
    const token = localStorage.getItem("token"); // This will work after the component mounts

    // if (!token) {
    //     console.log("Token is missing, user needs to log in.");
    //     return []; // Return empty if token is not available
    // }

    try {
        const response = await fetch(`http://localhost:8000/todos`, {
            method: "GET",
            headers: {
                "Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzcwZDlhNDcxNDUzMDQ3YmZmMWNiYTgiLCJlbWFpbCI6ImFiYzJAZ21haWwuY29tIiwibmFtZSI6IkFSIE5FVyIsImlhdCI6MTczNTQ0OTMyNX0.MrL2z__SRg7sS3YtOilzePdqCSO5flqeDWsnxrD_dMo`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            console.log("Error fetching todos:");
        }

        const data = await response.json();
        console.log("Fetched Todos: >>>>>>>>>>>>>>===============", data); // Optional for debugging
        return data.data || []; // Assuming 'data' contains the todos
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
};

export default function Todos() {
    const [todos, setTodos] = useState([]);
    // const [loading, setLoading] = useState(true); // For loading state
    // const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        const getTodos = async () => {
            try {
                // setLoading(true); // Start loading when fetching begins
                const fetchedTodos = await fetchTodos();
                setTodos(fetchedTodos);
                
            } catch (err) {
                console.log("Failed to fetch todos"); // Set error if fetching fails
            }
        };
        getTodos();
    }, []); // Runs only on component mount

    // if (loading) {
    //     return <div>Loading...</div>; // Show loading message while data is being fetched
    // }

    // if (error) {
    //     return <div>{error}</div>; // Show error message if something went wrong
    // }

    return (
        <div>
          <h1 className="todoHead">Todo List</h1>
          <div className="todosContainer"> {/* Flex container for a responsive layout */}
            {todos.map(todo => (
              <li key={todo._id} className="allTodos">
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <p className={`status ${todo.completed ? 'completed' : 'pending'}`}>
                  Status: {todo.completed ? 'Completed' : 'Pending'}
                </p>
              </li>
            ))}
          </div>
        </div>
      );
    }      






// const styles = {
//     todoItem: {
//       backgroundColor: '#f9f9f9',
//       border: '1px solid #ddd',
//       padding: '15px',
//       marginBottom: '10px',
//       borderRadius: '8px',
//       boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//       listStyleType: 'none',
//     },
//     title: {
//       fontSize: '20px',
//       color: '#333',
//       marginBottom: '10px',
//     },
//     description: {
//       fontSize: '16px',
//       color: '#555',
//       marginBottom: '10px',
//     },
//     status: {
//       fontSize: '14px',
//       fontWeight: 'bold',
//       color: '#3d9970', // Green color for "Completed"
//     }
//   };