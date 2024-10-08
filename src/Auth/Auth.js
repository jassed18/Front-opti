import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Avatar from "../assets/images/avatar2.jpg";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import RegisterAuth from "../Auth/RegisterAuth";
import { App } from "../config"; // Asegúrate de que esta ruta es correcta
import "./Auth.scss";


console.log("Google cliente ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    localStorage.removeItem('authState');
  }, []);

  const changeForm = (event) => {
    event.preventDefault();
    setIsSignIn((current) => !current);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <div className="d-none d-md-flex flex-column justify-content-center align-items-center">
              <img src={Avatar} alt="Avatar" />
            </div>
            {isSignIn ? (
              <Login>
                <div className="form-group d-flex justify-content-center align-items-center mt-3">
                  <a href="/" onClick={changeForm} className="btn btn-link">
                    No tengo usuario de red
                  </a>
                </div>
              </Login>
            ) : (
              <>
                {App.requestWithAuth ? (
                  <RegisterAuth>
                    <div className="form-group d-flex justify-content-center align-items-center mt-3">
                      <a href="/" onClick={changeForm} className="btn btn-link">
                        Ingresar con usuario de red
                      </a>
                    </div>
                  </RegisterAuth>
                ) : (
                  <Register>
                    <div className="form-group d-flex justify-content-center align-items-center mt-3">
                      <a href="/" onClick={changeForm} className="btn btn-link">
                        Ingresar con usuario de red
                      </a>
                    </div>
                  </Register>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;