import React, {useState, useEffect} from 'react';
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() =>{
    document.title = "Log In / Sign-Up - Airbnb";
  },[]);

  return (
    <div class="login">
      <div className="login-container">
      <span className="login-header">
        <h4>Login or Sign-up</h4>
      </span>
      <div className="login-content">
        <h3>Welcome to Airbnb</h3>
        <input 
          type="email"
          className="login_email_field"
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}
          placeholder = "Email"
        />
        <input 
          type="password"
          className="login_password_field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="login_btn login_google body-text pointer">
          Login with Google
        </button>
      </div>
      </div>
    </div>
  )
}

export default Login;

