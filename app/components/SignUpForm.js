import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
      <label> Name:    </label>
        <input
          name="name"
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div className="field-line">
      <label> Email:    </label>
        <input
          name="email"
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
      <label> Password:   </label>
        <input
          type="text"
          name="password"
          onChange={onChange}
          value={user.password}
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
