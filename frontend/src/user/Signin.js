import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Base from '../core/Base';

import { signin, authenticate, isAuthenticated } from '../auth/helper';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    didRedirect: false
  })

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value})
  }

  const onSubmit = event => {
    event.preventDefault();

    setValues({...values, error: false, loading: true});
    signin({email, password})
      .then(data => {
        if (data.error) {
          setValues({...values, error: data.error, loading: false});
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            })
          })
        }
      })
      .catch(console.log('signin request failed!'));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <p>redirect to admin dashboard</p>
      } else {
        return <p>redirect to user dashboard</p>
      }
    }

    if (isAuthenticated()) {
      return <Redirect to='/' />
    }
  }

  const loadingMessage = () => (
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    )
  )

  const errorMessage = () => (
    <div
      className='alert alert-danger'
      style={{display: error ? '' : 'none'}}
    >
      {error}
    </div>
  )

  const signinForm = () => {
    return (
      <div className='row'>
        <div className="col-md-4 offset-sm-4 text-left">
          <from>

            <div class="form-row">              
              <div class="col">
                <input 
                  onChange={handleChange('email')} 
                  value={email} 
                  type="email" 
                  class="form-control my-3" 
                  placeholder="Email" />
              </div>
              <div class="col">
                <input
                  onChange={handleChange('password')}
                  value={password} 
                  type="password" 
                  class="form-control my-3" 
                  placeholder="Password" />
              </div>
            </div>            

            <button onClick={onSubmit} className="btn btn-success btn-block my-3">Submit</button>

          </from>
        </div>
      </div>
    )
  }


  return (
    <Base title='Signin Page' description='users signin here'>
      {loadingMessage()}
      {errorMessage()}
      {performRedirect()}
      {signinForm()}
    </Base>
  )
}

export default Signin;