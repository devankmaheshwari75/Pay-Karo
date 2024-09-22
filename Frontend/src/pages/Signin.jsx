import React, { useState } from "react";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"; // Importing icons for password visibility toggle
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        {
          username,
          password,
        }
      );

      console.log(response);
      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/dashboard");

      // You can handle success (e.g., set tokens, redirect, etc.) here
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage("Invalid credentials"); // Set the error message on failure
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <h1 className="text-xl font-bold text-center mb-4">Sign In</h1>
        <form
          onSubmit={handleSignin}
          className="bg-white shadow-md rounded px-8 py-6"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center py-2 mt-2 mr-2"
            >
              {isPasswordVisible ? (
                <EyeOffIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Conditionally render the error message */}
          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white mx-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-black hover:underline font-semibold"
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
