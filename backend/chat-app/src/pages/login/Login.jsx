import React, { useState } from 'react';
import './Login.css';
import assets from '../../assets/assets';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from '../../context/Authprovider';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { authUser, setAuthUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currState, setCurrState] = useState("Sign Up");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (currState === "Sign Up") {
      const userInfo = {
        Username: data.Username,
        email: data.email,
        password: data.password,
      };
      console.log(userInfo);
      try {
        const response = await axios.post("/api/user/signup", userInfo);
        if (response.data) {
          alert("Sign up successfully! You can log in now!");
          localStorage.setItem("messanger", JSON.stringify(response.data));
          setAuthUser(response.data);
          navigate("/chat");
        }
      } catch (error) {
        console.error("Signup error:", error);  // Enhanced error logging
        alert("Error: " + (error.response?.data?.message || "An error occurred during signup"));
      }
    } else {
      const euserInfo = {
        email: data.email,
        password: data.password,
      };
      try {
        const response = await axios.post("/api/user/login", euserInfo);
        if (response.data) {
          alert("Login successfully!");
          localStorage.setItem("token", JSON.stringify(response.data));
          setAuthUser(response.data);
          navigate("/chat");
        }
      } catch (error) {
        console.error("Login error:", error); 
        alert("Error: " + (error.response?.data?.message || "An error occurred during login"));
      }
    }
  };

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className="logo" />
      <form className='login-form' onSubmit={handleSubmit(onSubmit)} >
        <h2>{currState}</h2>
        {currState === "Sign Up" ?
          <input type="text" placeholder='Username' className="form-input" {...register("Username", { required: true })} /> : null}
        <input type="email" placeholder='Email-address' className="form-input" {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}
        <input type="password" placeholder='Password' className="form-input" {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login Now"}</button>
        <div className="login-term">
          <input type='checkbox' />
          <p>Agree to Terms and Conditions</p>
        </div>
        <div className="login-forgot">
          {
            currState === "Sign Up" ?
              <p className="login-toggle">Already have an account? <span onClick={() => setCurrState("Login")}>Click here</span></p>
              : <p className="login-toggle">Create an account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          }
        </div>
      </form>
    </div>
  );
};

export default Login;
