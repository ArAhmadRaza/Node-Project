"use client";
import { useState } from 'react';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");


    const doSignup = async (e) => {
        try {
            let user = { email: email, password: password, address: address };
            const raw = JSON.stringify(user);
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: raw,
            };
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
                requestOptions
            );
            console.log("Response ==>>", response);
            const result = await response.json();
            console.log("Data ==>>", result);
            localStorage.setItem("Token", result?.data?.token)
        } catch (error) {
            console.log("Error", error);
        }
    }



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
            <label>
                Address:
                <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    name="address"
                    placeholder="Address"
                />
            </label>
            <button onClick={doSignup}>
                Signup
            </button>
        </div>
    )
}