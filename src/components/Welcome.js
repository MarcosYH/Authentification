import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo1 from "../assets/logo1.png";
import imgwlc from "../assets/imgwelcome.png";
import imgprofil from "../assets/profile.png";
import Cookies from "universal-cookie";
const cookies = new Cookies();


// get token generated on login
// eslint-disable-next-line no-unused-vars
const token = cookies.get("TOKEN");
export default function Welcome() {
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vous pouvez effectuer ici le traitement d'envoi de la photo
    // vers votre serveur

    // Réinitialiser le champ de sélection de fichier
    setSelectedFile(null);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = cookies.get("TOKEN");

        if (!authToken) {
          throw new Error("Auth token not found");
        }

        const response = await axios.get(
          "https://auth-api-adk2.onrender.com/user-info",
          {
            headers: {
              Authorization: authToken,
            },
            params: {
              token: authToken,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.log(error);
        // Traitez les erreurs de manière appropriée
      }
    };
    fetchUserInfo();
  }, []);

  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("EMAIL", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };
  return (
    <div>
      <nav className="w-full bg-indigo-300 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link to={"/"}>
                <img src={logo1} alt="logo" className=" w-10 h-10" />
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2  rounded-md outline-none focus:border-black focus:border border border-black"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-black font-bold"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill="black"
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-black font-bold"
                      fill="black"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        fill="black"
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
                    to="/welcome"
                    className="text-black hover:text-indigo-400 font-bold"
                    aria-current="page"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-black hover:text-indigo-400 font-bold"
                    aria-current="page"
                  >
                    A propos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-black hover:text-indigo-400 font-bold"
                    aria-current="page"
                  >
                    Contacter-nous
                  </Link>
                </li>
              </ul>

              <div className="mt-3 space-y-2 md:hidden">
                <button
                  className="inline-block w-full px-4 py-2 text-center text-white bg-red-600 rounded-md shadow hover:bg-red-800"
                  onClick={() => logout()}
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
          <div className="hidden space-x-2 md:inline-block">
            {user && (
              <div className="relative inline-block">
                <div className=" flex items-center mt-2" onClick={toggleMenu}>
                <img
                    id="avatarButton"
                    type="button"
                    
                    data-dropdown-toggle="userDropdown"
                    data-dropdown-placement="bottom-start"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    src={imgprofil}
                    alt="User dropdown"
                  />
                  <svg
                    className=" h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
              
                </div>
                 
                {isOpen && (
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <div className="max-w-md mx-auto">
      <div className="mb-4">
        <img
          src={selectedFile ? URL.createObjectURL(selectedFile) : 'placeholder.png'}
          alt="PhotOj"
          className="w-40 h-40 rounded-full mx-auto mb-4"
        />
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center">
        
            <label type="button" htmlFor="profilePhoto" className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3">
              Choisir une photo
            </label>
            <input
              type="file"
              id="profilePhoto"
              accept="image/*"
              onChange={handleFileChange}
              className=" hidden"
            />
          </div>
        </form>
      </div>
      
    </div>
                    <div className="py-1">
                      <p className="block px-4 py-2 text-sm text-gray-700">
                        Nom : {user.name}
                      </p>
                      <p className="block px-4 py-2 text-sm text-gray-700">
                        Email : {user.email}
                      </p>
                      </div>
                      <div className=" text-center my-2">
                      <button
                        className="inline-block w-auto px-4 py-2 text-center text-white bg-red-500 rounded-md shadow hover:bg-red-800"
                        onClick={() => logout()}
                      >
                        Déconnexion
                      </button>

                      </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>{" "}
      <div className=" flex w-full">
        <div className=" w-1/2 my-10 mx-20 pt-20">
          {user && (
            <div>
              <h1 className=" font-bold md:text-6xl sm:text-4xl">
                Bienvenue {user.name}!
              </h1>
              {/* <p>Email : {user.email}</p> */}
            </div>
          )}
        </div>
        <div className="md:w-1/2 ">
          <img src={imgwlc} alt="imgwlc" className=" hover:animate-pulse" />
        </div>

      </div>
    </div>
  );
}
