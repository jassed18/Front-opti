import React from "react";
import PropTypes from "prop-types";

const AlertMessage = ({ type, show, children }) => {
  if (!show) return null;

  const alertClass = `alert alert-${type}`;

  return (
    <div className={alertClass} role="alert">
      {children}
    </div>
  );
};

AlertMessage.propTypes = {
  type: PropTypes.oneOf(["success", "danger", "warning", "info"]).isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default AlertMessage;  // Exportar como exportación por defecto
