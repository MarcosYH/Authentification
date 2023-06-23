import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo1 from "../assets/logo1.png";
import Cookies from "universal-cookie";
const cookies = new Cookies();
// get token generated on login
// eslint-disable-next-line no-unused-vars
const token = cookies.get("TOKEN");
export default function Welcome() {
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user info when the component mounts
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    const authToken = cookies.get("TOKEN");
    if (authToken) {
      axios
        .get("https://auth-api-adk2.onrender.com/user-info", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };
  return (
    <div>
      <nav className="w-full bg-gray-200 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link to={"/"}>
                <img src={logo1} alt="logo" className=" w-10 h-10" />
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li>
                  <Link
                    to="/"
                    className="text-black hover:text-indigo-400 font-bold"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-black hover:text-indigo-400 font-bold"
                    aria-current="page"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-black hover:text-indigo-400 font-bold"
                    aria-current="page"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>

              <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                <button
                  className="inline-block w-full px-4 py-2 text-center text-white bg-red-600 rounded-md shadow hover:bg-red-800"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="hidden space-x-2 md:inline-block">
            <button
              className="inline-block w-full px-4 py-2 text-center text-white bg-red-500 rounded-md shadow hover:bg-red-800"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>{" "}

      <div className="container mx-auto">
        <h1>Bienvenue sur la page d'accueil !</h1>
        {user && (
          <div>
            <p>Nom : {user.name}</p>
            <p>Email : {user.email}</p>
          </div>
        )}
      </div>

    </div>

  );
}
