// File: src/components/AuthForm.js

import React, { useState } from "react";

function AuthForm({ onAuth }) {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAuth({ username, password }, isRegister);
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.msg || "Server error");
    }
  };

  return (
    <div className="auth-form">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button onClick={toggleForm} className="toggle-button">
        {isRegister ? "Already have an account? Login" : "New user? Register"}
      </button>
    </div>
  );
}

export default AuthForm;
