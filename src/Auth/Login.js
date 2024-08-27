import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/Eslogan.png';
import { AuthContext } from '../context/AuthContext';
import AlertMessage from '../components/AlertMessage';
import './Login.scss'; // Asegúrate de que la ruta del archivo SCSS es correcta

const Login = ({ children }) => {
  const init_form = {
    username: '',
    password: '',
  };

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

    const validUsername = 'admin';
    const validPassword = 'admin';

    if (form.username === validUsername && form.password === validPassword) {
      try {
        await authContext.login('dummyToken', { username: form.username });
        navigate('/chat');
      } catch (err) {
        setError('Error al iniciar sesión.');
      }
      setLoading(false);
    } else {
      setError('Usuario o contraseña incorrecta.');
      setLoading(false);
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
        {children}
      </form>
    </div>
  );
};

export default Login;
