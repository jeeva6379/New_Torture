// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import axios from "axios";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Create an object with the login data
//     const loginData = {
//       email: email,
//       password: password
//     };

//     console.log(loginData);
//     // Send the data to the backend using Axios
//     axios
//       .post("/login", loginData)
//       .then((response) => {
//         // Handle the response from the backend
//         console.log(response.data);
//       })
//       .catch((error) => {
//         // Handle any errors
//         console.error("Error:", error);
//       });
//   };

//   const useStyles = makeStyles((theme) => ({
//     root: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100vh"
//     },
//     form: {
//       "& > *": {
//         margin: theme.spacing(1),
//         width: "45ch"
//       }
//     }
//   }));

//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <form className={classes.form} onSubmit={handleSubmit}>
//         <TextField
//           id="outlined-basic"
//           label="email"
//           variant="outlined"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//           size="30" // Set the size of the input box
//         />
//         <br />
//         <br />
//         <TextField
//           id="outlined-basic"
//           label="password"
//           variant="outlined"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//           size="30" // Set the size of the input box
//         />
//         <br />
//         <br />
//         <Button type="submit" variant="contained" color="primary">
//           Login
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the login data
    const loginData = {
      email: email,
      password: password
    };

    console.log(loginData);
    // Send the data to the backend using Axios
    axios
      .post("/login", loginData)
      .then((response) => {
        // Handle the response from the backend
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });

      window.location.href = "/fileupload";

  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    },
    form: {
      "& > *": {
        margin: theme.spacing(1),
        width: "50ch"
      }
    },
    button: {
      width: "8ch", // Set the width of the button
      fontSize: "0.8rem",// Set the font size of the button
      display: "block", 
      margin: "0 auto"
    
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          size="40"
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          size="40"
        />
        <br />
        <br />
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
