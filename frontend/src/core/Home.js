import React from 'react';
import { API } from '../backend';

import '../styles.css';

const Home = () => {
  console.log('API IS', API);

  return (
    <div>
      <h1 className='text-white' >Home Page !!!</h1>
    </div>
  )
}

export default Home;