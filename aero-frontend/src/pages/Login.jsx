import React, { useState, useEffect, useRef } from "react";
import user from "../configs/user";
import wallpapers from "../configs/wallpapers";
import Fade from "react-reveal/Fade";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFont,
  faKey,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import axios from "axios";

export default function Login(props) {
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [head, setHead] = useState("Aero Drive");
  const [sign, setSign] = useState("");
  const [signButton, setSignButton] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mode, setMode] = useState("");
  const dark = true;

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  if (localStorage.getItem("token")) {
    props.setLogin(true);
  }

  const keyPress = (e) => {
    const keyCode = e.key;
    if (keyCode === "Enter") handleInputChange();
  };

  const handleInputChange = (event, form) => {
    const { name, value } = event.target;
    switch (form) {
      case "login":
        switch (name) {
          case "email":
            setLoginEmail(value);
            setEmailError(
              value
                ? /\S+@\S+\.\S+/.test(value)
                  ? ""
                  : "* Invalid Email format *"
                : "* Email is required *"
            );
            break;
          case "password":
            setLoginPassword(value);
            setPasswordError(
              value.length >= 8
                ? ""
                : "* Password must be at least 8 characters long *"
            );
            break;
          default:
            break;
        }
        break;
      case "signup":
        switch (name) {
          case "name":
            setSignupName(value);
            setNameError(!value ? "* Name is required *" : "");
            break;
          case "email":
            setSignupEmail(value);
            setEmailError(
              value
                ? /\S+@\S+\.\S+/.test(value)
                  ? ""
                  : "* Invalid Email format *"
                : "* Email is required *"
            );
            break;
          case "password":
            setSignupPassword(value);
            setPasswordError(
              value.length >= 8
                ? ""
                : "* Password must be at least 8 characters long *"
            );
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    // Check if any field is empty and show error message
    const isAnyFieldEmpty =
      (form === "login" && (!loginEmail || !loginPassword)) ||
      (form === "signup" && (!signupName || !signupEmail || !signupPassword));

    if (isAnyFieldEmpty) {
      setSign("*** Please fill out all fields ***");
    } else {
      setSign("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameError || emailError || passwordError) {
      setSign("** Please fill the form correctly ! **");
      return;
    }
    if (mode === "signup") {
      setLoading(true); // Set loading state to true
      signupHandle();
      console.log("Signup form submitted");
      console.log("Name:", signupName);
      console.log("Email:", signupEmail);
      console.log("Password:", signupPassword);
    } else if (mode === "login") {
      setLoading(true); // Set loading state to true
      loginHandle();
      console.log("Login form submitted");
      console.log("Email:", loginEmail);
      console.log("Password:", loginPassword);
    }
  };

  const handleSignUpClick = () => {
    setHead("Sign Up");
    setMode("signup");
    setSign("");
    setSignButton("Sign Up");
    // setName(""); // Reset the name field
    // setEmail(""); // Reset the email field
    // setPassword(""); // Reset the password field
  };

  const handleLogInClick = () => {
    setHead("Log In");
    setMode("login");
    setSign("");
    setSignButton("Log In");
    // setName(""); // Reset the name field
    // setEmail(""); // Reset the email field
    // setPassword(""); // Reset the password field
    // props.setLogin(true);
  };

  // const handleResetPasswordClick = () => {
  //   setHead("Reset Password");
  //   setMode("resetPassword");
  //   setSign("to Reset Password");
  // };

  const loginHandle = () => {
    console.log("Login request (frontend):", loginEmail, loginPassword);
    let formData = {
      email: loginEmail,
      password: loginPassword,
    };
    console.log("This is now the new game");
    if (mode == "login") {
      axios
        .post(`${BASE_URL}/users/login`, formData)
        .then((response) => {
          console.log(response.data);
          if (response.status >= 200 && response.status < 300) {
            props.setLogin(true);
            localStorage.setItem("token", response.data.token);
          } else {
            setLoading(false); // Set loading state to false
            setSign("** Incorrect Password !");
          }
        })
        .catch((error) => {
          setLoading(false); // Set loading state to false
          if (error.response) {
            console.log(error.response.data); // => the response payload
            setSign("** Incorrect Password or Email !");
          }
        });
    }
  };

  const signupHandle = () => {
  setLoading(true);

  let formData = {
    name: signupName,
    email: signupEmail,
    password: signupPassword,
  };

  axios
    .post(`${BASE_URL}/users/signup`, formData)
    .then((response) => {
      console.log("SIGNUP RESPONSE:", response.data);

      // ✅ FIX: accept 201 OR 200 OR any success range
      if (response.status >= 200 && response.status < 300) {
        setSign("Signup successful!");

        // go to login screen
        handleLogInClick();
      } else {
        setSign("** Unexpected response from server **");
      }
    })
    .catch((error) => {
      console.log("SIGNUP ERROR:", error);

      if (error.response) {
        setSign(error.response.data.message || "** Incorrect Data **");
      } else {
        setSign("** Network error **");
      }
    })
    .finally(() => {
      setLoading(false);
    });
};

  return (
    <div
      className="w-full h-full login text-center"
      style={{
        background: `url(${
          dark ? wallpapers.night : wallpapers.day
        }) center/cover no-repeat`,
      }}
    >
      <div className="inline-block w-100 relative top-1/2 -mt-60">
        {/* Head */}
        <div>
          {/*<img src="logo/aerodrive.png" alt="logo"/>*/}
          <Fade left>
            <h1 style={{ color: "white", fontSize: "4em" }}>{head}</h1>
          </Fade>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              {/* Name Input */}

              <div className="mx-auto grid grid-cols-5 w-90 h-8 mt-5 rounded-md backdrop-blur-2xl bg-gray-300/50">
                <input
                  className="text-sm text-white col-start-1 col-span-4 no-outline bg-transparent px-2"
                  type="text"
                  name="name"
                  placeholder="User Name"
                  onClick={(e) => e.stopPropagation()}
                  onKeyPress={keyPress}
                  value={signupName}
                  onChange={(e) => handleInputChange(e, "signup")}
                />
                <div className="col-start-5 col-span-1 flex-center">
                  <FontAwesomeIcon icon={faFont} style={{ color: "white" }} />
                </div>
              </div>
              {nameError && <div className="mt-1 error">{nameError}</div>}

              {/* Email Input */}
              <div className="mx-auto grid grid-cols-5 w-90 h-8 mt-4 rounded-md backdrop-blur-2xl bg-gray-300/50">
                <input
                  className="text-sm text-white col-start-1 col-span-4 no-outline bg-transparent px-2"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onClick={(e) => e.stopPropagation()}
                  onKeyPress={keyPress}
                  value={signupEmail}
                  onChange={(e) => handleInputChange(e, "signup")}
                />
                <div className="col-start-5 col-span-1 flex-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ color: "white" }}
                  />
                </div>
              </div>
              {emailError && <div className="mt-1 error">{emailError}</div>}

              {/* Password Input */}
              <div className="mx-auto grid grid-cols-5 w-90 h-8 mt-4 rounded-md backdrop-blur-2xl bg-gray-300/50">
                <input
                  className="text-sm text-white col-start-1 col-span-4 no-outline bg-transparent px-2"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onClick={(e) => e.stopPropagation()}
                  onKeyPress={keyPress}
                  value={signupPassword}
                  onChange={(e) => handleInputChange(e, "signup")}
                />
                <div
                  className="col-start-5 col-span-1 flex-center"
                  onClick={handleTogglePassword}
                >
                  <FontAwesomeIcon icon={faKey} style={{ color: "white" }} />
                </div>
              </div>
              {passwordError && (
                <div className="mt-1 error">{passwordError}</div>
              )}

              {/* Enter */}
              <div className="invalid  mt-4">{sign}</div>
              <button
                className="blur-button mt-2"
                type="submit"
                disabled={loading}
                // onClick={(e) => {
                //   // e.preventDefault();
                //   signupHandle();
                // }}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </>
          )}

          {mode === "login" && (
            <>
              {/* Email Input */}
              <div className="mx-auto grid grid-cols-5 w-90 h-8 mt-5 rounded-md backdrop-blur-2xl bg-gray-300/50">
                <input
                  className="text-sm text-white col-start-1 col-span-4 no-outline bg-transparent px-2"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onClick={(e) => e.stopPropagation()}
                  // onKeyPress={keyPress}
                  value={loginEmail}
                  onChange={(e) => handleInputChange(e, "login")}
                />
                <div className="col-start-5 col-span-1 flex-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ color: "white" }}
                  />
                </div>
              </div>
              {emailError && <div className="mt-1 error">{emailError}</div>}

              {/* Password Input */}
              <div className="mx-auto grid grid-cols-5 w-90 h-8 mt-3 rounded-md backdrop-blur-2xl bg-gray-300/50">
                <input
                  className="text-sm text-white col-start-1 col-span-4 no-outline bg-transparent px-2"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onClick={(e) => e.stopPropagation()}
                  // onKeyPress={keyPress}
                  value={loginPassword}
                  onChange={(e) => handleInputChange(e, "login")}
                />
                <div
                  className="col-start-5 col-span-1 flex-center"
                  onClick={handleTogglePassword}
                >
                  <FontAwesomeIcon icon={faKey} style={{ color: "white" }} />
                </div>
              </div>
              {passwordError && (
                <div className="mt-1 error">{passwordError}</div>
              )}

              <div className="invalid  mt-5">{sign}</div>
              <button
                type="submit"
                className="blur-button mt-2"
                disabled={loading}
                // onClick={(e) => {
                //   // e.preventDefault();
                //   loginHandle();
                // }}
              >
                {loading ? "Loading..." : "Log In"}
              </button>
            </>
          )}
        </form>
      </div>

      {/* buttons */}
      <div className="text-sm fixed bottom-10 left-0 right-0 mx-auto flex flex-row space-x-4 w-max">
        <div
          className="hstack flex-col text-white w-30 cursor-pointer"
          onClick={handleSignUpClick}
        >
          <div className="flex-center h-10 w-10 bg-gray-700 rounded-full">
            <FontAwesomeIcon icon={faUserPlus} />
          </div>
          <span>Sign Up</span>
        </div>

        <div
          className="hstack flex-col text-white w-30 cursor-pointer"
          onClick={handleLogInClick}
        >
          <div className="flex-center h-10 w-10 bg-gray-700 rounded-full">
            <FontAwesomeIcon icon={faRightToBracket} />
          </div>
          <span>Log In</span>
        </div>
      </div>
    </div>
  );
}
