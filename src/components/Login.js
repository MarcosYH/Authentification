import React from "react";
import { useState } from "react";
import imgLog from "../assets/imgLog1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email && password) {
      setError("");
      setLoading(true);
      
      const configuration = {
        method: "post",
        url: "https://auth-api-adk2.onrender.com/login",
        data: {
          email,
          password,
        },
      };
  
      axios(configuration)
        .then((result) => {
          console.log(result);
          setLoading(false);
          cookies.set("TOKEN", result.data.token, {
            path: "/",
          });
          cookies.set("EMAIL", email, { path: "/" });
  
        //   const userData = {
        //     name: result.data.name,
        //     email: result.data.email,
        //   };
  
          setEmail("");
          setPassword("");
          setLogin(true);
          setError2("");
          
          window.location.href = "/welcome";
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
  
          if (error.response && error.response.status === 404) {
            setError2("Email ou mot de passe incorrect");
          } else {
            setError2("Une erreur s'est produite. Vérifier vos informations");
          }
        });
    } else {
      setError("Veuillez remplir tous les champs");
    }
  };
  

  return (
    <>
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        {/*Image login*/}
        <div>
          <img src={imgLog} alt="Sampleimage" />
        </div>
        {/*Boutton face et tweeter*/}   
        <div className="md:w-1/3 max-w-sm">
        <h1 className=" text-5xl font-bold text-center my-14">Connexion</h1>
          <div className="text-center md:text-left">
            <label className="mr-1">Se connecter avec </label>
            <button
              type="button"
              className="mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </button>
            <button
              type="button"
              className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>
          </div>
          <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
              Où
            </p>
          </div>

          {/* Formulaire de login */}
          <form onSubmit={(e) => handleSubmit(e)}>
            {/*Input E-mail*/}
            <input
              className="text-sm w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
            {/*Input Mots de passe*/}
            <div className="relative container mx-auto ">
              <input
                className=" my-4 text-sm w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-blue-200 focus:border-blue-200 block dark:focus:ring-blue-200 dark:focus:border-blue-200"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mots de passe"
                required
                name="password"
                id="passwordlogin"
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

            <div className="mt-4 flex justify-end font-semibold text-sm">
              <a
                className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                href="/forgetpassword"
              >
                Mots de passe oublié?
              </a>
            </div>
            {error && error2 ?(
              <p className="text-red-600 text-center">{error}</p>
            ): (<p className="text-red-600 text-center">{error2}</p>)}
            
            {/*Boutton conexion*/}
            <div className=" flex justify-center">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-900 w-64 px-4 py-2 text-white uppercase rounded-md tracking-wider flex justify-center items-center font-bold text-sm"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Connexion
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
            {login ? (
              <p className=" text-green-600 text-center">
                Vous êtes connecté avec succès
              </p>
            ) : (
              <p className=" text-red-600 text-center"></p>
            )}
          </form>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-center">
            Vous n'avez pas de compte ?
            <Link
              to="/register"
              className=" mx-2 text-red-600 hover:underline hover:underline-offset-4"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
