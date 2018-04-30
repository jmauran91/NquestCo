import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <div className="login-form-container">
    <form action="/" onSubmit={onSubmit}>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <input
          type="text"
          name="email"
          onChange={onChange}
          value={user.email}
          placeholder="Email..."
        />
      </div>

      <div className="field-line">
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
          placeholder="Password..."
        />
      </div>

      <div className="button-line">
        <button type="submit"> Submit </button>
      </div>

      <span>Don't have an account? <Link to={'/signup'}>Create one</Link>.</span>
    </form>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
