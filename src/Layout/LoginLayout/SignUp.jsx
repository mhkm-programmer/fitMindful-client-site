import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import PageTitle from "../../component/Shared/PageTitle/PageTitle";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords don't match!",
      });
      return;
    }

    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserProfile(data.name, data.email)
        .then(() => {
          const saveUser = { name: data.name, email: data.email };
          fetch("https://summer-camp-server-side-kabircodefolio.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                // navigate("/");
                navigate(from, { replace: true });
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };

  // Function to handle Google sign-in

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser.displayName);
        updateUserProfile(loggedUser?.displayName, loggedUser?.email).then(
          () => {
            const saveUser = {
              name: loggedUser?.displayName,
              email: loggedUser?.email,
            };
            fetch("https://summer-camp-server-side-kabircodefolio.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });

                  navigate(from, { replace: true });
                }
                navigate(from, { replace: true });
              });
          }
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="py-12">
      <PageTitle title="Fitmindful | Login" />

      <div className="flex items-center justify-center mx-auto">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-auto sm:h-8"
                src="https://i.ibb.co/vHzPBZ8/Logo-Transparent-min.png"
                alt="Fitmindful"
              />
            </div>
            <div className="mt-5 space-y-2 text-center">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Sign up
              </h3>
              <p className="">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          <div className="grid gap-x-3">
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
                <g clip-path="url(#clip0_17_40)">
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

          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Or continue with
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-red-600">Photo URL is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                placeholder="Email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                })}
                placeholder="Password"
                className="input input-bordered"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2.5 focus:outline-none"
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
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "min" && (
                <p className="text-red-600">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one uppercase letter, one special
                  character, and one number.
                </p>
              )}
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
                placeholder="Confirm Password"
                className="input input-bordered"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-2.5 focus:outline-none"
              >
                {showConfirmPassword ? (
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
              {errors.confirmPassword?.type === "required" && (
                <p className="text-red-600">Confirm Password is required</p>
              )}
              {errors.confirmPassword?.type === "validate" && (
                <p className="text-red-600">Passwords do not match</p>
              )}
            </div>

            <div className="form-control mt-6">
              <input
                className="w-full btn-gradiant"
                type="submit"
                value=" Create account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

// <form onSubmit={handleSubmit(onSubmit)} className="card-body">
// <div className="form-control">
//   <label className="label">
//     <span className="label-text">Name</span>
//   </label>
//   <input
//     type="text"
//     {...register("name", { required: true })}
//     name="name"
//     placeholder="Name"
//     className="input input-bordered"
//   />
//   {errors.name && (
//     <span className="text-red-600">Name is required</span>
//   )}
// </div>
// <div className="form-control">
//   <label className="label">
//     <span className="label-text">Photo URL</span>
//   </label>
//   <input
//     type="text"
//     {...register("photoURL", { required: true })}
//     placeholder="Photo URL"
//     className="input input-bordered"
//   />
//   {errors.photoURL && (
//     <span className="text-red-600">Photo URL is required</span>
//   )}
// </div>
// <div className="form-control">
//   <label className="label">
//     <span className="label-text">Email</span>
//   </label>
//   <input
//     type="email"
//     {...register("email", { required: true })}
//     name="email"
//     placeholder="Email"
//     className="input input-bordered"
//   />
//   {errors.email && (
//     <span className="text-red-600">Email is required</span>
//   )}
// </div>
// <div className="form-control relative">
//   <label className="label">
//     <span className="label-text">Password</span>
//   </label>
//   <input
//     type={showPassword ? "text" : "password"}
//     {...register("password", {
//       required: true,
//       minLength: 6,
//       maxLength: 20,
//       pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
//     })}
//     placeholder="Password"
//     className="input input-bordered"
//   />
//   <button
//     type="button"
//     onClick={togglePasswordVisibility}
//     className="absolute right-2 top-2.5 focus:outline-none"
//   >
//     {showPassword ? (
//       <svg
//         className="w-5 h-5 text-gray-500 cursor-pointer"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M9.5 16c2.485 0 4.5-2.015 4.5-4.5S11.985 7 9.5 7 5 9.015 5 11.5 7.015 16 9.5 16zm0 0L15 19.5m-5.5-3.5L15 19.5M3 12.5h1M20 12.5h1M3.999 12.5C4.006 8.358 7.357 5 11.5 5S18 8.358 18 12.5s-3.351 7.5-7.494 7.5c-.293 0-.58-.03-.86-.086M9.5 16h5"
//         />
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M9.5 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
//         />
//       </svg>
//     ) : (
//       <svg
//         className="w-5 h-5 text-gray-500 cursor-pointer"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M9.5 16c2.485 0 4.5-2.015 4.5-4.5S11.985 7 9.5 7 5 9.015 5 11.5 7.015 16 9.5 16zm0 0L15 19.5m-5.5-3.5L15 19.5M3 12.5h1M20 12.5h1M3.999 12.5C4.006 8.358 7.357 5 11.5 5S18 8.358 18 12.5s-3.351 7.5-7.494 7.5c-.293 0-.58-.03-.86-.086M9.5 16h5"
//         />
//       </svg>
//     )}
//   </button>
//   {errors.password?.type === "required" && (
//     <p className="text-red-600">Password is required</p>
//   )}
//   {errors.password?.type === "min" && (
//     <p className="text-red-600">
//       Password must be at least 6 characters
//     </p>
//   )}
//   {errors.password?.type === "maxLength" && (
//     <p className="text-red-600">
//       Password must be less than 20 characters
//     </p>
//   )}
//   {errors.password?.type === "pattern" && (
//     <p className="text-red-600">
//       Password must have one uppercase letter, one special
//       character, and one number.
//     </p>
//   )}
// </div>
// <div className="form-control relative">
//   <label className="label">
//     <span className="label-text">Confirm Password</span>
//   </label>
//   <input
//     type={showConfirmPassword ? "text" : "password"}
//     {...register("confirmPassword", {
//       required: true,
//       validate: (value) => value === watch("password"),
//     })}
//     placeholder="Confirm Password"
//     className="input input-bordered"
//   />
//   <button
//     type="button"
//     onClick={toggleConfirmPasswordVisibility}
//     className="absolute right-2 top-2.5 focus:outline-none"
//   >
//     {showConfirmPassword ? (
//       <svg
//         className="w-5 h-5 text-gray-500 cursor-pointer"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M9.5 16c2.485 0 4.5-2.015 4.5-4.5S11.985 7 9.5 7 5 9.015 5 11.5 7.015 16 9.5 16zm0 0L15 19.5m-5.5-3.5L15 19.5M3 12.5h1M20 12.5h1M3.999 12.5C4.006 8.358 7.357 5 11.5 5S18 8.358 18 12.5s-3.351 7.5-7.494 7.5c-.293 0-.58-.03-.86-.086M9.5 16h5"
//         />
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M9.5 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
//         />
//       </svg>
//     ) : (
//       <svg
//         className="w-5 h-5 text-gray-500 cursor-pointer"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M9.5 16c2.485 0 4.5-2.015 4.5-4.5S11.985 7 9.5 7 5 9.015 5 11.5 7.015 16 9.5 16zm0 0L15 19.5m-5.5-3.5L15 19.5M3 12.5h1M20 12.5h1M3.999 12.5C4.006 8.358 7.357 5 11.5 5S18 8.358 18 12.5s-3.351 7.5-7.494 7.5c-.293 0-.58-.03-.86-.086M9.5 16h5"
//         />
//       </svg>
//     )}
//   </button>
//   {errors.confirmPassword?.type === "required" && (
//     <p className="text-red-600">Confirm Password is required</p>
//   )}
//   {errors.confirmPassword?.type === "validate" && (
//     <p className="text-red-600">Passwords do not match</p>
//   )}
// </div>
// <div className="form-control mt-6">
//   <input
//     className="btn btn-primary"
//     type="submit"
//     value="Sign Up"
//   />
// </div>
// </form>
