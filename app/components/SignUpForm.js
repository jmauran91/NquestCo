import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  errStyleCont,
  errStyleText
}) => (
  <div className="signup-form">
    <form action="/" onSubmit={onSubmit}>

      {errors.summary && <div className="error-container" style={errStyleCont}><p className="error-message" style={errStyleText}>{errors.summary}</p></div>}

      <div className="field-line">
        <input
          name="name"
          onChange={onChange}
          value={user.name}
          placeholder="Name..."
        />
      </div>

      <div className="field-line">
        <input
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

      <span>Already have an account? <Link to={'/login'}>Log in</Link></span>
    </form>

  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
