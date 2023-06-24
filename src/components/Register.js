import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import imgh from "../assets/im2.png";
import "../styles/Registers.css";

function Registers() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const isEmailValid = (email) => {
    // Expression régulière pour valider l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && password) {
      setError(""); // Réinitialiser l'erreur si tous les champs sont remplis
      setEmailError("");

      if (!isEmailValid(email)) {
        // L'adresse e-mail n'est pas valide, afficher une erreur
        setEmailError("Veuillez entrer une adresse e-mail valide");
        return;
      }

      if (password.length < 8) {
        // Le mot de passe est trop court, afficher une erreur
        setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
        return;
      }
      setLoading(true);

      // Effectuer les actions nécessaires (envoi des données, etc.)
      const configuration = {
        method: "post",
        url: "https://auth-api-adk2.onrender.com/register",
        data: {
          name,
          email,
          password,
        },
      };

      axios(configuration)
        .then((result) => {
          setRegister(true);
          setLoading(false);
          window.location.href = "/login";
          console.log(result);
          setName("");
          setEmail("");
          setPassword("");
          setError("");
          setError2("");
          setPasswordError("");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);

          if (error.response && error.response.status === 404) {
            setError2(
              "Veuillez entrer un nom ou email valide"
            );
          } else {
            setError2("Une erreur s'est produite. Veuillez réessayer plus tard.");
          }
        });
    } else {
      setError("Veuillez remplir tous les champs"); // Afficher l'erreur si des champs sont vides
    }
  };

  // const register = () => {
  //     console.log('register')
  //     fetch("https://talkative-xqnz.onrender.com/auth/register", {
  //         method: 'POST',
  //         body: JSON.stringify({
  //             "account":
  //             {
  //             email: "eliot@dev.com",
  //             password: "Pas55word@",
  //             },
  //             "profile":
  //             {
  //             username: "elidev",
  //             firstname: "Eliot",
  //             lastname: "Fagnon",
  //             profilePic:""
  //             }

  //         }),
  //         headers: {
  //             "Content-Type": "application/json"
  //         }
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //         console.log(data);
  //     })
  //     .catch((err) => { console.log('err', err); });
  // }

  return (
    <>
      <div>
        <div className=" h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <img
            src={imgh}
            alt="imgh"
            className="imgre justify-center lg:float-left hidden md:block"
          />
          <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:max-w-lg sm:rounded-lg">
            {/* Formulaire d'inscription */}
            <form onSubmit={(e) => handleSubmit(e)}>
              <h1 className="text-3xl text-center font-bold text-black">
                {"S'inscrire"}
              </h1>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined my-2"
                >
                  Nom
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="nom"
                    value={name}
                    className="text-sm w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Entrer votre nom"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className=" my-2 block text-sm font-medium text-gray-700 undefined"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className=" text-sm w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrer votre Address email "
                    required
                  />
                  {emailError && (
                    <p className="text-red-600 text-center">{emailError}</p>
                  )}
                </div>
              </div>
              {/* Password */}
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className=" my-2 block text-sm font-medium text-gray-700 undefined"
                >
                  Mot de passe
                </label>
                <div className="relative container mx-auto ">
                  <input
                    className=" my-4 text-sm w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-blue-200 focus:border-blue-200 block dark:focus:ring-blue-200 dark:focus:border-blue-200"
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mots de passe"
                    required
                    name="password"
                    id="passwordregister"
                  />
                  <label
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </label>
                </div>
                  {passwordError && (
                    <p className="text-red-600 text-center">{passwordError}</p>
                  )}
              </div>
              {error && <p className="text-red-600 text-center">{error}</p>}
              {error2 && <p className="text-red-600 text-center">{error2}</p>}
              {/* button register */}
              <div className="flex items-center justify-center my-8">
                <button
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-900 flex justify-center items-center font-bold text-sm"
                  onClick={(e) => handleSubmit(e)}
                >
                  S'inscrire
                  {loading && (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className=" mx-3 w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </button>
              </div>

              {/* display success message */}
              {register ? (
                <p className=" text-green-600 text-center my-2">
                  You Are Registered Successfully
                </p>
              ) : (
                <p className=" text-red-600 text-center my-2"></p>
              )}
            </form>
            <div className="mt-4 text-grey-600 text-center">
              Vous avez déjà un compte ?{" "}
              <span>
                <Link className="text-blue-600 hover:underline" to="/login">
                  Log in
                </Link>
              </span>
            </div>
            <div className="flex items-center w-full my-4">
              <hr className="w-full" />
              <p className="px-3 ">OR</p>
              <hr className="w-full" />
            </div>
            <div className="my-6 space-y-2">
              <button
                aria-label="Login with Google"
                type="button"
                className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
                <p>Login with Google</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registers;
