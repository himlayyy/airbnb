import React, {useState, useEffect} from 'react';
import {
  registerWithEmailAndPassword  
} from "../../firebase";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState("login");

  const signUp  = ()=>{
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password)
  };

  const login = () => {
    console.log(login);
  }
  

  useEffect(() =>{
    document.title = "Log In / Sign-Up - Airbnb";
  },[]);

  return (
    <div className="login">
      <div className="login-container">
      <span className="login-header">
        {/* <h4> */}
          <button  disabled={form === "login"}onClick={() => setForm("login")}>Login </button>
           or 
          <button disabled={form === "signup"}  onClick={() => setForm("signup")}> Sign-Up</button>
        {/* </h4> */}
      </span>
      <div className="login-content">
        <h3>Welcome to Airbnb</h3>
        <form className="signUp-content">
          {form === "signup" &&
            <>
              <label for="login_name">Name</label>
              <input 
              type="text"
              className="login_name_field"
              value = {name}
              onChange = {(e) => setName(e.target.value)}
              placeholder = "Name"
              id="login_name"
              />
            </>
        }
          
          <label for="login_email">Email</label>
          <input 
            type="email"
            className="login_email_field"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            placeholder = "Email"
            id="login_email"
            />

          <label for="login_password">Password</label>
          <input 
            type="password"
            className="login_password_field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="login_password"
            />
          
          {form === "login" ? <button className="login_btn login_google body-text pointer" onClick={login}>
            Log In
          </button>
          : 
          <button className="login_btn login_google body-text pointer" onClick={signUp}>
            Sign-Up
          </button>
          }

          
          
        </form>
        
      </div>
      </div>
    </div>
  )
}

export default Login;

