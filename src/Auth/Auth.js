import React, { useState } from "react";
import Avatar from "../assets/images/avatar2.jpg";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import RegisterAuth from "../Auth/RegisterAuth";
import { App } from "../config"; // Asegúrate de que esta ruta es correcta
import "./Auth.scss"; // Importa el archivo SCSS

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const changeForm = (event) => {
    event.preventDefault();
    setIsSignIn((current) => !current);
  };

  return (
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
  );
};

export default Auth;
