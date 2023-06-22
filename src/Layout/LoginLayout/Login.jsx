import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import useAuth from "../../hooks/useAuth";
import { app } from "../../firebase/firebase.config";
import PageTitle from "../../component/Shared/PageTitle/PageTitle";
import Spinner from "../../component/Shared/Spinner/Spinner";

const auth = getAuth(app);
const Login = () => {
  const { signIn, googleSignIn, loading } = useAuth();
  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef(); // Add a reference to the password input field
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Function to handle the form submission for email and password login
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        setSuccessful("User logged successful");
        setError("");
        // console.log(loggedUser);
        navigate(from, { replace: true });

        if (loading) {
          return <Spinner />;
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Function to handle Google sign-in
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        setSuccessful("User logged successful");
        navigate(from, { replace: true });
        // console.log(loggedUser);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Function to handle password reset
  const handleResetPassword = (e) => {
    const email = emailRef.current.value;
    if (!email) {
      setError("PLease provide your email address");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError("Please check your email");
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <PageTitle title="Fitmindful | Login" />

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/3 mx-auto">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-auto sm:h-8"
            src="https://i.ibb.co/vHzPBZ8/Logo-Transparent-min.png"
            alt="Fitmindful"
          />
        </div>

        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          Welcome back!
        </p>
        <div className="mb-6 text-center ">
        <p>
        Don’t have an account yet?{" "} 
        <Link
            to="/signup"
            className="text-sm text-blue-500 font-semibold hover:underline dark:text-blue-400"
          >
            Sign up
          </Link>
        </p>
       
        </div>
        <div className="grid grid-cols-1 gap-x-3">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <a className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
            or login with email
          </a>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <form onSubmit={handleLogin}>
          <p className="text-red-400 mt-2">{error}</p>
          <p className="text-green-400 mt-2">{successful}</p>
          <div className="mt-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Show plain text if `showPassword` is true
                id="password"
                name="password"
                ref={passwordRef}
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
              >
              {showPassword ? (
                    <svg
                      className="w-5 h-5 text-gray-500 cursor-pointer"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.5 16c2.485 0 4.5-2.015 4.5-4.5S11.985 7 9.5 7 5 9.015 5 11.5 7.015 16 9.5 16zm0 0L15 19.5m-5.5-3.5L15 19.5M3 12.5h1M20 12.5h1M3.999 12.5C4.006 8.358 7.357 5 11.5 5S18 8.358 18 12.5s-3.351 7.5-7.494 7.5c-.293 0-.58-.03-.86-.086M9.5 16h5"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.5 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-500 cursor-pointer"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.5 16c2.485 0 4.5-2.015 4.5-4.5S11.985 7 9.5 7 5 9.015 5 11.5 7.015 16 9.5 16zm0 0L15 19.5m-5.5-3.5L15 19.5M3 12.5h1M20 12.5h1M3.999 12.5C4.006 8.358 7.357 5 11.5 5S18 8.358 18 12.5s-3.351 7.5-7.494 7.5c-.293 0-.58-.03-.86-.086M9.5 16h5"
                      />
                    </svg>
                  )}
              </button>
            </div>
          </div>

          <div className="text-right">
            <p>
              Forget your password?{" "}
              <button
                onClick={handleResetPassword}
                className="bt text-teal-600"
              >
                Reset
              </button>
            </p>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="btn-gradiant w-full"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
