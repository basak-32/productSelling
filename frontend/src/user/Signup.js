import { findAllByTestId } from '@testing-library/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';

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

  const signupForm = () => {
    return (
      <div className='row'>
        <div className="col-md-4 offset-sm-4 text-left">
          <from>

            <div class="form-row">
              <div class="col">
                <input type="text" class="form-control my-3" placeholder="First name" />
              </div>
              <div class="col">
                <input type="text" class="form-control my-3" placeholder="Last name" />
              </div>
              <div class="col">
                <input type="email" class="form-control my-3" placeholder="Email" />
              </div>
              <div class="col">
                <input type="password" class="form-control my-3" placeholder="Password" />
              </div>
            </div>            

            <button className="btn btn-success btn-block my-3">Submit</button>
          </from>
        </div>
      </div>
    )
  }

  return (
    <Base title='Signup Page' description='users signup here'>
      {signupForm()}
    </Base>
  )
}

export default Signup;