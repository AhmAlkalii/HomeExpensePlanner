import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import illustration from "../assets/illustration.jpg";
import { toast } from "react-toastify";

const Intro = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

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
      navigate('/dashboard');
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      toast.error('Failed to authenticate');
    }
  };

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
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
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Your Password"
                aria-label="Your Password"
                autoComplete="current-password"
              />
              <input type="hidden" name="_action" value="login" />
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
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                aria-label="Your Email"
                autoComplete="email"
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Your Password"
                aria-label="Your Password"
                autoComplete="new-password"
              />
              <input type="hidden" name="_action" value="register" />
            </>
          )}
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

