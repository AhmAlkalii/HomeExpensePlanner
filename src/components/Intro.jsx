import React, { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Form } from "react-router-dom";
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // Your registration/login logic here
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
        <Form method="post" onSubmit={handleSubmit}>
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
                name="userName"
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
        </Form>
        <button onClick={toggleForm} className="btn btn--transparent">
          {isLogin ? "Not Registered? Create an Account" : "Already Registered? Login"}
        </button>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};

export default Intro;
