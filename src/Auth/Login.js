import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Logo from '../assets/images/Eslogan.png';
import { AuthContext, useAuth } from '../context/AuthContext'; // Añade useAuth aquí
import AlertMessage from '../components/AlertMessage';
import './Login.scss';

const Login = ({ children }) => {
  const init_form = {
    username: '',
    password: '',
  };

  const { login } = useAuth(); // Extrae login del contexto
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState(init_form);
  const [tc, setTC] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlerChangInput = (event) => {
    setForm((old) => ({
      ...old,
      [event.target.name]: event.target.value,
    }));
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Aquí deberías hacer una llamada a tu API para autenticar al usuario
      // Por ahora, usaremos la lógica de autenticación simulada
      const validUsername = 'admin';
      const validPassword = 'admin';

      if (form.username === validUsername && form.password === validPassword) {
        await authContext.login('dummyToken', { username: form.username });
        navigate('/chat');
      } else {
        setError('Usuario o contraseña incorrecta.');
      }
    } catch (err) {
      setError('Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Credential Response:", credentialResponse);
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Decoded:", decoded);
      const email = decoded.email;
      const google_id = decoded.sub;

      console.log("Sending request to:", '/auth/google');
      const response = await fetch('/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correoElectronico: email, google_id }),
      });

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (response.ok) {
        const data = JSON.parse(responseText);
        console.log('Datos de autenticación recibidos:', data);

          // Guardar los datos en el localStorage
          const authState = {
            isAuthenticated: true,
            user: {
              id: data.user_id,
              email: data.correoElectronico
            },
            token: data.token
          };
          localStorage.setItem('authState', JSON.stringify(authState));

          console.log(localStorage.getItem('authState'));
        await login({
          id: data.user_id,
          email: data.correoElectronico,
          token: data.token
        });
        console.log("user_id:", data.user_id);
        console.log('Autenticación exitosa, redirigiendo a /chat');
        navigate('/chat');
      } else {
        setError('Error al iniciar sesión con Google: ' + (responseText || 'Error desconocido'));
      }
    } catch (err) {
      console.error("Error completo:", err);
      setError('Error al procesar la autenticación de Google: ' + err.message);
    }
  };


  const disabledSubmit = () =>
    form.username.length > 3 &&
      form.password.length > 3 &&
      tc &&
      !loading
      ? false
      : true;

  return (
    <div style={{ maxWidth: 370 }} className="p-3">
      <div className="d-flex justify-content-center align-items-center">
        <img src={Logo} alt="Logo" className="mb-5" style={{ maxWidth: 300 }} />
      </div>
      <form onSubmit={handlerSubmit}>
        <AlertMessage type="danger" show={!!error}>
          {error}
        </AlertMessage>
        <div className="mb-3">
          <input
            type="text"
            name="username"
            value={form.username}
            placeholder="Usuario"
            onChange={handlerChangInput}
            className="form-control border-pill py-2"
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Contraseña"
            onChange={handlerChangInput}
            className="form-control py-2"
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="checktclogin"
            className="form-check-input"
            checked={tc}
            onChange={() => setTC((old) => !old)}
            required
          />
          <label
            htmlFor="checktclogin"
            className="form-check-label"
            style={{ fontSize: 13 }}
          >
            Acepto los&nbsp;
            <a
              target="_blank"
              rel="noreferrer"
              href="/"
              className="text-decoration-none"
            >
              términos y condiciones
            </a>
            &nbsp;para el tratamiento de mis datos.
          </label>
        </div>
        <div className="d-grid gap-2">
          <button
            type="submit"
            disabled={disabledSubmit()}
            className="btn btn-primary mt-3 text-white py-2"
          >
            {loading ? (
              <>
                Ingresando&nbsp;
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              'INGRESAR'
            )}
          </button>
        </div>
        <div className="d-grid gap-2 mt-3">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Error al iniciar sesión con Google')}
            useOneTap
          />
        </div>
        {children}
      </form>
    </div>
  );
};

export default Login;