"use client";
import { useState } from "react";
import "../globals.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages

  const doLogin = async (e) => {

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      let user = { email: email, password: password };
      console.log("Loged In User ====>>>>",user);
      const raw = JSON.stringify(user);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw,
      };
      
      // Make the API call
      const response = await fetch(
        `http://localhost:8000/auth/login`,
        requestOptions
      );

      const result = await response.json();

      // Store the token if login was successful
      if (result?.data && result?.data?.token) {
        const responseToken = localStorage.setItem("token", result?.data?.token);
        console.log("Token saved successfully.");
        console.log("User Loged in successfully")
        console.log("Token ================",localStorage.getItem("token"))
       
      } else {
        console.log("Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="fullbody">
      <h1 className="heading parent">Login Page</h1>
      <div className="parent">
        <div className="mb-6 w-4/12">
          <label
            htmlFor="email"
            className="text-gray-300 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <div className="mb-6 w-4/12">
          <label
            htmlFor="password"
            className="text-gray-300 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Show error message */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={doLogin}
            className="mybtn1 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
