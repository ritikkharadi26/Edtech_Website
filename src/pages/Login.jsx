import React, { useState } from "react";
import Template from "../Components/Template";
import loginImg from "../assets2/login.png";
import { login } from "../services/operation/authAPI"; // Adjust the path as needed

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Call the login function with email and password
      // If login is successful, you can redirect the user or perform any other action
      // Example: history.push("/dashboard");
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
    }
  };

  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    >
      {/* <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form> */}
    </Template>
  );
}

export default Login;
