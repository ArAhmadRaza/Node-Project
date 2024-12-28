"use client";
import {useState} from 'react';


 function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async (e) => {
    try {
      let user = { email: email, password: password };
      const raw = JSON.stringify(user);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        requestOptions
      );
      console.log("Response ==>>", response);
      const result = await response.json();
      console.log("Data ==>>", result);
      localStorage.setItem("Token", result?.data?.token)
    } catch (e) {
      console.log("Error >><<", e);
    }
  };

  return (
    <div>
        <label>
          Email:
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Password"
          />
        </label>
        <button onClick={doLogin}>
          Login
        </button>
 
    </div>
  );
}

export default Login;