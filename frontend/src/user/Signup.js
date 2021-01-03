import { findAllByTestId } from '@testing-library/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';

import { signup } from '../auth/helper/index';

const Signup = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const { firstName, lastName, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value})
  }

  const onSubmit = event => {
    event.preventDefault();

    setValues({...values, error: false});
    signup({ firstName, lastName, email, password })
      .then(data => {
        if (data.error) {
          setValues({...values, error: data.error, success: false })
        } else {
          setValues({
            ...values,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            error: '',
            success: true
          });
        };
      })
      .catch(error => console.log(error));
  };

  const signupForm = () => {
    return (
      <div className='row'>
        <div className="col-md-4 offset-sm-4 text-left">
          <from>

            <div class="form-row">
              <div class="col">
                <input 
                  type="text" 
                  class="form-control my-3" 
                  onChange={handleChange('firstName')} 
                  placeholder="First name" 
                  value={firstName}
                />
              </div>

              <div class="col">
                <input 
                  type="text" 
                  class="form-control my-3" 
                  onChange={handleChange('lastName')}
                  placeholder="Last name" 
                  value={lastName}
                />
              </div>

              <div class="col">
                <input 
                  type="email" 
                  class="form-control my-3" 
                  onChange={handleChange('email')}
                  placeholder="Email" 
                  value={email}
                />
              </div>

              <div class="col">
                <input 
                  type="password" 
                  class="form-control my-3" 
                  onChange={handleChange('password')}
                  placeholder="Password" 
                  value={password}
                />
              </div>
            </div>            

            <button onClick={onSubmit} className="btn btn-success btn-block my-3">Submit</button>
          </from>
        </div>
      </div>
    )
  }

  const successMessage = () => (
    <div
      className='alert alert-success'
      style={{display: success ? '' : 'none'}}
    >
      New account was created successfully.
      <Link to='/signin'>Sign in here</Link>
    </div>
  )

  const errorMessage = () => (
    <div
      className='alert alert-danger'
      style={{display: error ? '' : 'none'}}
    >
      {error}
    </div>
  )

  return (
    <Base title='Signup Page' description='users signup here'>
      {successMessage()}
      {errorMessage()}
      {signupForm()}
      <p className="text-white text-center">
        {JSON.stringify(values)}
      </p>
    </Base>
  )
}

export default Signup;