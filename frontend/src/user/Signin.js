import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Base from '../core/Base';

const Signin = () => {
  const signinForm = () => {
    return (
      <div className='row'>
        <div className="col-md-4 offset-sm-4 text-left">
          <from>

            <div class="form-row">              
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
    <Base title='Signin Page' description='users signin here'>
      {signinForm()}
    </Base>
  )
}

export default Signin;