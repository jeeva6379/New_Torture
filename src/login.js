import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "0 20px", 
    boxSizing: "border-box", 
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%", 
    maxWidth: "400px", 
  },
  textField: {
    width: "100%", 
    marginBottom: theme.spacing(2), 
  },
  button: {
    width: "23%", 
    fontSize: "0.8rem",
    marginTop: theme.spacing(2), 
  },
}));

function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Create an object with the login data
  //   const loginData = {
  //     email: email,
  //     password: password, 
  //   };

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      // Create an object with the login data
      const loginData = {
        email: email,
        password: password,
      };
    console.log(loginData);
      try {
        // Make an HTTP POST request to the backend
        const response = await axios.post('/api/login', loginData);
    
        // Handle the response
        const { token } = response.data;
    
        console.log(response.data);
        setEmail('');
        setPassword('');
        // Store the token in localStorage or a state management library
        localStorage.setItem('token', token);
    
        // Redirect to a protected route or update the authentication state
        // Example: history.push('/dashboard');
      } catch (error) {
        // Handle errors
        console.log(error.response.data.message);
      }
    };

  

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={classes.textField}
        /><br/>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={classes.textField}
        /><br/>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
