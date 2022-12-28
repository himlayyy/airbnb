import React, {useState, useEffect, useContext} from 'react'; 
import { useNavigate } from "react-router-dom"; 
import { auth, loginWithEmailAndPassword } from "../../../firebase"; 
import { useAuthState } from "react-firebase-hooks/auth";

import "./login.css";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState([]);

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const checkFields = () =>{
    setErr([]);
                
    let errors = [];
    if(!email){
      errors.push("Missing Email");
    };
    if(!password){
      errors.push("Missing Password");
    };
    
    if(errors.length !==0){
      setErr((prevState) => [...prevState, ...errors]);
    }
    else{
      login();
    }
  };

  const login = () => {
    let res = loginWithEmailAndPassword(email, password);
    console.log(res);
    
  };

  useEffect(() => {
    if(user) navigate("/");
  },[user,loading, error]);

  useEffect(() =>{
    document.title = "Log In - Airbnb";
    
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
          <label forHTML="login_email">Email</label>
          <input 
            type="email"
            className="login_email_field authInput"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            placeholder = "Email"
            id="login_email"
            />

          <label forHTML="login_password">Password</label>
          <input 
            type="password"
            className="login_password_field authInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="login_password"
            />
          <button className="login_btn login_google body-text pointer button_effect" onClick={(e) => 
              { 
                e.preventDefault();
                checkFields();
              }
            }>
            Log In
          </button>
          <button className="switch-form">
          Don't have an account? Sign-up</button>
        </form>
        
      </div>
      </div>
    </div>
  )
}

export default Login;

