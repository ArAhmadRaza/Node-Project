"use client";
import { useEffect, useState } from "react";

const fetchTodos = async () => {
    const token = localStorage.getItem("Token"); // This will work after the component mounts

    if (!token) {
        console.log("Token is missing, user needs to log in.");
        return []; // Return empty if token is not available
    }

    try {
        const response = await fetch(`http://localhost:5000/todos`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            console.log("Error fetching todos:");
            return [];
        }

        const data = await response.json();
        console.log("Fetched Todos:", data); // Optional for debugging
        return data.data || []; // Assuming 'data' contains the todos
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
};

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        const getTodos = async () => {
            try {
                setLoading(true); // Start loading when fetching begins
                const fetchedTodos = await fetchTodos();
                setTodos(fetchedTodos);
            } catch (err) {
                setError("Failed to fetch todos"); // Set error if fetching fails
            } finally {
                setLoading(false); // Set loading to false after fetching completes
            }
        };
        getTodos();
    }, []); // Runs only on component mount

    if (loading) {
        return <div>Loading...</div>; // Show loading message while data is being fetched
    }

    if (error) {
        return <div>{error}</div>; // Show error message if something went wrong
    }

    return (
        <div>
            <h1>Todos</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>{todo.name}</li> // Assuming _id is the unique identifier
                ))}
            </ul>
        </div>
    );
}
