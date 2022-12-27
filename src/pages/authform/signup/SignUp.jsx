import React, {useState, useEffect} from 'react';import { useNavigate } from 'react-router-dom';
 import
{ auth,
  registerWithEmailAndPassword  } from "../../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import "./signup.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState([]);

  const[user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const checkFields = () =>{
    setErr([]);
                
    let errors = [];
    if(name === ""){
      errors.push("Missing Name");
    };
    if(!email){
      errors.push("Missing Email");
    };
    if(!password){
      errors.push("Missing Password");
    };
    
    if(err.length !==0){
      setErr((prevState) => [...prevState, ...errors]);
    }
    else{
      signUp();
    }
  };


  const signUp  = ()=>{
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if(loading) return;
    if(user) navigate("/");
  }, [loading, error]);

  useEffect(() =>{
    document.title = "Sign-Up - Airbnb";
  },[]);

  return (
    <div className="login">

      <div className="login-container">
      <span className="login-header">
      <h3>Welcome to Airbnb</h3>
      </span>
      <div className="login-content">
        
        {err.length !== 0 && (
          <div>{err.map((error, i) => (
          <p key={i}>{error}</p>
          ))}</div>
        )}

        <form className="signUp-content">
          <label for="login_name">Name</label>
          <input 
            type="text"
            className="login_name_field"
            value = {name}
            onChange = {(e) => setName(e.target.value)}
            placeholder = "Name"
            id="login_name"
          />
          

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

          <button className="login_btn login_google body-text pointer" onClick={(e) => 
              { 
                e.preventDefault();
                checkFields();
              }
            }>
            Sign-Up
          </button>
          <button className="switch-form">
          Already have an account? Log-in </button>
        </form>
        
      </div>
      </div>
    </div>
  )
}

export default SignUp;

