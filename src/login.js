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
    padding: "0 20px", // Add padding for responsiveness
    boxSizing: "border-box", // Add box-sizing for responsiveness
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%", // Adjust the width for responsiveness
    maxWidth: "400px", // Add a maximum width for responsiveness
  },
  textField: {
    width: "100%", // Adjust the width for responsiveness
    marginBottom: theme.spacing(2), // Add margin for spacing
  },
  button: {
    width: "23%", // Adjust the width for responsiveness
    fontSize: "0.8rem",
    marginTop: theme.spacing(2), // Add margin for spacing
  },
}));

function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the login data
    const loginData = {
      email: email,
      password: password, 
    };

    axios
      .post("/login", loginData)
      .then((response) => {
        setEmail("");
        setPassword("");
        const data = response.data;
        if (data.success) {
          const token = data.token;

          console.log(token);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });

      setTimeout(() => {
        window.location.href = "/fileupload";
      }, 2000);

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
