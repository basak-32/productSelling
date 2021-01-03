import React from 'react';

import NavBar from './NavBar';

const Base = ({
  title='My Title',
  description='My description',
  className='text-white p-4',
  children
}) => (
  <div>
    <NavBar />
    <div className='container-fluid'>
      <div className='jumbotron text-white text-center'>
        <h2>{title}</h2>
        <p className='lead'>{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className='footer mt-auto py-2'>
      <div className="container-fluid bg-success text-white text-center py-2">
        <h4>If you got any question, feel free to reach out!</h4>
        <button className="btn btn-warning btn-md">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">An <span className='text-white'>Amazing</span> Store</span>
      </div>
    </footer>
  </div>
)

export default Base;