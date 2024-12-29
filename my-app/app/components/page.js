"use client";
//user Signout and automtically resnder to the login page
import React from "react";
import { useRouter } from "next/router";
const router = useRouter();

export default function Signout() {
    const doSignout = async (e) => {
        try {
            const token = localStorage.getItem("Token");
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
            };
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/signout`,
                requestOptions
            );
            console.log("Response ==>>", response);
            const result = await response.json();
            console.log("Data ==>>", result);
            localStorage.removeItem("Token");
            router.push("/login");
        } catch (error) {
            console.log("Error", error.message);
        }
    }
    return (
        <div>
            <button onClick={doSignout}>Signout</button>
        </div>
    )
}
