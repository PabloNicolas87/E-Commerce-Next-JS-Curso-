'use client';
import { useState } from "react";
import { IoPersonOutline, IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "@/app/context/authContext";

const LoginForm = () => {
  const { registerUser, loginUser, googleLogin } = useAuthContext();

  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
  });

  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      registerUser(values);
    } else {
      loginUser(values);
    }
  };

  const toggleAuthMode = () => {
    setIsRegistering((prev) => !prev);
    setValues({ email: "", password: "", name: "", surname: "" });
  };

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-blur-xl px-3">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-900 py-4 px-6 rounded-xl max-w-md w-full space-y-4"
      >
        <div className="flex justify-center items-center ">
          <IoPersonOutline className="text-9xl text-white border-2 rounded-full border-white p-4" />
        </div>

        {isRegistering && (
          <>
            <div className="flex space-x-2 items-center">
              <input
                type="text"
                value={values.name}
                required={isRegistering}
                placeholder="Name"
                className="p-2 rounded-e-lg w-full block"
                name="name"
                onChange={handleChange}
              />
            </div>

            <div className="flex space-x-2 items-center">
              <input
                type="text"
                value={values.surname}
                required={isRegistering}
                placeholder="Surname"
                className="p-2 rounded-e-lg w-full block"
                name="surname"
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="flex space-x-2 items-center">
          <IoPerson className="text-3xl text-white" />
          <input
            type="email"
            value={values.email}
            required
            placeholder="Email"
            className="p-2 rounded-e-lg w-full block"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-2 items-center">
          <RiLockPasswordFill className="text-3xl text-white" />
          <input
            type="password"
            value={values.password}
            required
            placeholder="Password"
            className="p-2 rounded-e-lg w-full block"
            name="password"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <button
              className="bg-white py-3 px-6 sm:px-10 text-blue-900 rounded-full"
              type="submit"
            >
              {isRegistering ? "Register" : "Login"}
            </button>

            {!isRegistering && (
              <button
                className="flex items-center bg-white py-3 px-6 text-blue-900 rounded-full"
                type="button"
                onClick={() => googleLogin()}
              >
                <FcGoogle className="text-3xl" />
                Login with Google
              </button>
            )}
          </div>

          <button
            className="bg-white py-3 px-6 text-blue-900 rounded-full"
            type="button"
            onClick={toggleAuthMode}
          >
            {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
