import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar'

const App = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#92a3a2';

    return () => { document.body.style.removeProperty('backgroundColor'); }
  }, []);

  return (
    <BrowserRouter>
    <Navbar />
      <Switch>
        <Route exact path='/'>
          <main className='d-flex justify-content-center min-vh-100 align-items-center'>
            <h1 className='text-success'>Home</h1>
          </main>
        </Route>
        <Route exact path='/about'>
          <main className='d-flex justify-content-center min-vh-100 align-items-center'>
            <h1 className='text-danger'>About</h1>
          </main>
        </Route>  
        <Route exact path='/login'>
          <main className='d-flex justify-content-center min-vh-100 align-items-center'>
            <h1 className='text-danger'>Login</h1>
          </main>
        </Route>
        <Route path='*'>
          <main className='d-flex justify-content-center min-vh-100 align-items-center'>
            <h1>404</h1>
            {/* <h1 className='text-danger'>404, {useLocation().pathname} not found</h1> */}
          </main>
        </Route>  
      </Switch>   
    </BrowserRouter>
  );
}

export default App;
