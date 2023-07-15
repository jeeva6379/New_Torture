// import React, { useState } from "react";

// import axios from "axios";
// import swal from 'sweetalert';

// import "../CreateUser.css";

// function Createnewuser() {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setConfirmPasswordVisible(!confirmPasswordVisible);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//   };




//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     if (!name || !email || !password || !confirmPassword) {
//       throw new Error("All fields are required");
//     }
  
//     if (password !== confirmPassword) {
//       throw new Error("Passwords do not match");
//     }
  
//     try {
//       const response = await axios.post(process.env.REACT_APP_API_URL + "/api/register", {
//         name,
//         email,
//         password,
//       });
  
//       console.log(response.json);
//       const { message } = response.data;
//       swal(message);
  
//       // setTimeout(() => {
//       //   window.location.href = "/dashboard";
//       // }, 2000);
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.message) {
//         swal(error.response.data.message);
//       } else {
//         swal("An error occurred. Please try again later.");
//       }
//     }
//   };
  

  

//   return (
//     <div className="login">
//       <div className="form">
//         <h2>Create New User</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-field">
//             <label htmlFor="login-name">
//               <i className="fa fa-user"></i>
//             </label>
//             <input
//               id="login-name"
//               type="text"
//               name="name"
//               placeholder="Name"
//               required
//               value={name}
//               onChange={handleNameChange}
//             />
//             <svg>
//               <use href="#svg-check" />
//             </svg>
//           </div>
//           <div className="form-field">
//             <label htmlFor="login-mail">
//               <i className="fa fa-envelope"></i>
//             </label>
//             <input
//               id="login-mail"
//               type="email"
//               name="mail"
//               placeholder="E-Mail"
//               required
//               value={email}
//               onChange={handleEmailChange}
//             />
//             <svg>
//               <use href="#svg-check" />
//             </svg>
//           </div>
//           <div className="form-field">
//             <label htmlFor="login-password">
//               <i className="fa fa-lock"></i>
//             </label>
//             <input
//               id="login-password"
//               type={passwordVisible ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               pattern=".{8,}"
//               required
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             <i
//               className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
//               id="password-eye"
//               onClick={togglePasswordVisibility}
//             ></i>
//             <svg>
//               <use href="#svg-check" />
//             </svg>
//           </div>
//           <div className="form-field">
//             <label htmlFor="login-confirm-password">
//               <i className="fa fa-check-circle"></i>
//             </label>
//             <input
//               id="login-confirm-password"
//               type={confirmPasswordVisible ? "text" : "password"}
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               pattern=".{8,}"
//               required
//               value={confirmPassword}
//               onChange={handleConfirmPasswordChange}
//             />
//             <i
//               className={`fa ${
//                 confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"
//               }`}
//               id="confirm-password-eye"
//               onClick={toggleConfirmPasswordVisibility}
//             ></i>
//             <svg>
//               <use href="#svg-check" />
//             </svg>
//           </div>
//           {error && <p className="error-message">{error}</p>}
//           <button type="submit" className="button">
//             <div className="arrow-wrapper">
//               <span className="arrow"></span>
//             </div>
//             <p className="button-text">Create User</p>
//           </button>
//         </form>
//       </div>
//       <div className="finished">
//         <svg>
//           <use href="#svg-check" />
//         </svg>
//       </div>
//     </div>
//   );
// }

// export default Createnewuser;



import React, { useState } from "react";

import axios from "axios";
import swal from 'sweetalert';

import "../CreateUser.css";

function Createnewuser() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
        name,
        email,
        password,
      });

      console.log(name,email,password);
      const { message } = response.data;
      swal(message);

      // setTimeout(() => {
      //   window.location.href = "/dashboard";
      // }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        swal(error.response.data.message);
      } else {
        swal("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login">
      <div className="form">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="login-name">
              <i className="fa fa-user"></i>
            </label>
            <input
              id="login-name"
              type="text"
              name="name"
              placeholder="Name"
              required
              value={name}
              onChange={handleNameChange}
            />
            <svg>
              <use href="#svg-check" />
            </svg>
          </div>
          <div className="form-field">
            <label htmlFor="login-mail">
              <i className="fa fa-envelope"></i>
            </label>
            <input
              id="login-mail"
              type="email"
              name="mail"
              placeholder="E-Mail"
              required
              value={email}
              onChange={handleEmailChange}
            />
            <svg>
              <use href="#svg-check" />
            </svg>
          </div>
          <div className="form-field">
            <label htmlFor="login-password">
              <i className="fa fa-lock"></i>
            </label>
            <input
              id="login-password"
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              pattern=".{8,}"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <i
              className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
              id="password-eye"
              onClick={togglePasswordVisibility}
            ></i>
            <svg>
              <use href="#svg-check" />
            </svg>
          </div>
          <div className="form-field">
            <label htmlFor="login-confirm-password">
              <i className="fa fa-check-circle"></i>
            </label>
            <input
              id="login-confirm-password"
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              pattern=".{8,}"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <i
              className={`fa ${confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
              id="confirm-password-eye"
              onClick={toggleConfirmPasswordVisibility}
            ></i>
            <svg>
              <use href="#svg-check" />
            </svg>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="button">
            <div className="arrow-wrapper">
              <span className="arrow"></span>
            </div>
            <p className="button-text">Create User</p>
          </button>
        </form>
      </div>
      <div className="finished">
        <svg>
          <use href="#svg-check" />
        </svg>
      </div>
    </div>
  );
}

export default Createnewuser;
