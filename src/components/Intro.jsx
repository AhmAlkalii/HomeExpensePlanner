import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import illustration from "../assets/illustration.jpg";
import { toast } from "react-toastify";

const Intro = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...formData };

    // Send HTTP request to backend
    try {
      const response = await fetch(isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const responseData = await response.json();

      // Handle successful login or registration
      toast.success(responseData.message);
      
      // If it's a login, navigate to the dashboard page
      if (isLogin) {
        navigate('/dashboard');
      } else {
        // If it's a registration, switch to login form and clear form data
        setIsLogin(true);
        setFormData({
          username: "",
          email: "",
          password: ""
        });
        toast.info("You have successfully registered. Please login.");
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      toast.error('Failed to authenticate');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
    // Clear form data when switching between registration and login forms
    setFormData({
      username: "",
      email: "",
      password: ""
    });
  };

  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>Personal budgeting is the secret to financial freedom. Start your journey today.</p>
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                aria-label="Your Email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Your Password"
                aria-label="Your Password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="username"
                required
                placeholder="What is your name?"
                aria-label="Your Name"
                autoComplete="given-name"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                aria-label="Your Email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Your Password"
                aria-label="Your Password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </>
          )}
          <input type="hidden" name="_action" value={isLogin ? "login" : "register"} />
          <button type="submit" className="btn btn--dark">
            <span>{isLogin ? "Login" : "Create Account"}</span>
            <UserPlusIcon width={20} />
          </button>
        </form>
        <button onClick={toggleForm} className="btn btn--transparent">
          {isLogin ? "Not Registered? Create an Account" : "Already Registered? Login"}
        </button>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};

export default Intro;
