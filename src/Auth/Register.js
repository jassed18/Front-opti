import React, { useState } from "react";
import AlertMessage from "../components/AlertMessage";

const Register = ({ children }) => {
  const init_form = {
    username: "",
    password: "",
  };

  const [form, setForm] = useState(init_form);
  const [tc, setTC] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlerChangInput = (event) => {
    setForm((old) => ({
      ...old,
      [event.target.name]: event.target.value,
    }));
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Aquí podrías realizar una solicitud para registrar el usuario

    // Simula una acción exitosa
    setLoading(false);
    alert("Registro exitoso");
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
            id="checktc"
            className="form-check-input"
            checked={tc}
            onChange={() => setTC((old) => !old)}
            required
          />
          <label
            htmlFor="checktc"
            className="form-check-label"
            style={{ fontSize: 13 }}
          >
            Acepto los&nbsp;
            <a
              target="_blank"
              rel="noreferrer"
              href="https://example.com/terms-and-conditions" // Usa un enlace válido aquí
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
                Registrando&nbsp;
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              "REGISTRARSE"
            )}
          </button>
        </div>
        {children}
      </form>
    </div>
  );
};

export default Register;
