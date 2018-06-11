import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Select from 'react-select';


const SignUpForm = ({
  onSubmit,
  onChange,
  handleSelection,
  errors,
  user,
  selectedCategory,
  errStyleCont,
  errStyleText
}) => (
  <div className="signup-form">
    <form action="/" onSubmit={onSubmit}>

      {errors.summary && <div className="error-container" style={errStyleCont}><p className="error-message" style={errStyleText}>{errors.summary}</p></div>}

      <div className="field-line">
        <input
          name="name"
          className="signup-form-input"
          onChange={onChange}
          value={user.name}
          placeholder="Name..."
        />
      </div>

      <div className="field-line">
        <input
          name="email"
          className="signup-form-input"
          onChange={onChange}
          value={user.email}
          placeholder="Email..."
        />
      </div>

      <div className="field-line">
        <input
          type="password"
          name="password"
          className="signup-form-input"
          onChange={onChange}
          value={user.password}
          placeholder="Password..."
        />
      </div>

      <div className="field-line signup-category-selction">
        <label className="signup-category-selection-warning">
          This can be changed later; Nquest keeps you up to speed on the projects
          being updated or created based on the focus-areas you designate.
        </label>
        <Select
        closeOnSelect={true}
        clearable={true}
        searchable={true}
        name="category"
        value={selectedCategory}
        onChange={handleSelection}
        options={[
            {value: 'artHistory', label: 'Art History'},
            {value: 'Archaeology', label: 'Archaeology'},
            {value: 'Anthropology', label: 'Anthropology'},
            {value: 'Biology', label: 'Biology'},
            {value: 'Business', label: 'Business'},
            {value: 'Chemistry', label: 'Chemistry'},
            {value: 'computerScience', label: 'Computer Science'},
            {value: 'Engineering', label: 'Engineering'},
            {value: 'Economics', label: 'Economics'},
            {value: 'Education', label: 'Education'},
            {value: 'Finance', label: 'Finance'},
            {value: 'Linguistics', label: 'Linguistics'},
            {value: 'History', label: 'History'},
            {value: 'Mathematics', label: 'Mathematics'},
            {value: 'Music', label: 'Music'},
            {value: 'Nutrition', label: 'Nutrition'},
            {value: 'Philosophy', label: 'Philosophy'},
            {value: 'Physics', label: 'Physics'},
            {value: 'politicalScience', label: 'Political Science'},
            {value: 'Psychology', label: 'Psychology'},
            {value: 'Religion', label: 'Religion'},
            {value: 'socialSciences', label: 'Social Sciences'},
            {value: 'Other', label: "Other..."},
          ]}
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
  handleSelection: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default SignUpForm;
