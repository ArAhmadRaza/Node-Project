"use client";
import {useState} from "react"


export default function createTodo(){
    const [id , setID] = useState()
    const [title, setTitle] = useState("")
    const [description, setDescription]= useState("")


    const onClickCreateTodo = async (e) => {
        let newTodo = {
            id:id,
            title:title,
            description:description
        }
        const raw = JSON.stringify(newTodo);
        const token = localStorage.getItem("token")
        
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `${token}`
         },
        body: raw,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/todos/create`,
        requestOptions
      );
      console.log("Response ==>>", response);
      const result = await response.json();
      console.log("Data ==>>", result);
        
    }

    return(
        <div>
            <input type="number" onChange={(e)=>setID(e.target.value)} placeholder="Enter Your ID" />
            <input type="text" onChange={(e)=>setTitle(e.target.value)} placeholder="Title" />
            <input type="text" onChange={(e)=>setDescription(e.target.value)} placeholder="description" />
            <button onClick={onClickCreateTodo}>Create Todo</button>
        </div>
    )
}