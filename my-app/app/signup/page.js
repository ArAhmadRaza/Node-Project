"use client";
import { useState } from 'react';
import "../globals.css"


export default function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [address, setAddress] = useState();


    const doSignup = async (e) => {
        try {
            let user = { name: name, email: email, password: password, address: address };

            console.log("uediting", user);
            const raw = JSON.stringify(user);



            const requestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: raw,
              redirect: "follow"
            };

            fetch("http://localhost:8000/auth/signup", requestOptions)
              .then((response) => response.json())
              .then((result) => console.log(result))
              .catch((error) => console.error(error));

              setName("");
              setEmail("");
              setPassword("");
              setAddress("");

        } catch (error) {
            console.log("Error", error);
        }
    }




    return (
        <div class="fullbody">
            <h1 class="heading parent">Signup Page</h1>
            <div class="parent">
                <div class="mt-4 w-4/12">
                    <label for="vi" class="text-gray-300 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="vi" onClick={(e) => setName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required />
                </div>
                <div class="mb-6 w-4/12">
                    <label for="email " class="text-gray-300 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                </div>
                <div class="mb-6 w-4/12">
                    <label for="password" class="text-gray-300 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                </div>
                <div class="mt-4 w-4/12">
                    <label for="visitors" class="text-gray-300 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input type="text" id="visitors" onClick={(e) => setAddress(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required />
                </div>
                <div class="flex justify-center mt-6">
                    <button type="button" onClick={doSignup} class="mybtn1 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2">Create Todo</button>
                </div>
            </div>
        </div>
    )
}