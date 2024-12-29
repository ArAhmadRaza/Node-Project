"use client";
import {useState} from "react"
//navigate to createTodo page
//  const { useRouter } = appRouter()
 // import "./style.css"
import "../globals.css"
// import Signout from "../components/signout";

// const router = useRouter()

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
        const token = localStorage.getItem('token')
        
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
      // router.push('/createtodo')
    }

    return(
        <div class="fullbody">
          {/* <button onClick={Signout}>Signout</button> */}
            <h1 class="heading parent">Create Todo</h1>
            <div class="container">
              <div class="parent">
            <div class="mt-4 w-4/12">
            <label for="visitors" class="text-gray-300 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter ID</label>
            <input type="number" id="visitors"  onClick={(e)=>setID(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter id" required />
        </div>
        <div class="mt-4 w-4/12">
            <label for="visitors" class="text-gray-300 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" id="visitors"  onClick={(e)=>setTitle(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Title" required />
        </div>
        <div class="mt-4 w-4/12">
            <label for="visitors"  class="text-gray-300 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input type="text" id="visitors" onClick={(e)=>setDescription(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required />
        </div>
        </div>
        <div class="flex justify-center mt-6">
        <button type="button" onClick={onClickCreateTodo} class="mybtn1 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2">Create Todo</button>
      </div>  
      </div>
        </div>
    )
}