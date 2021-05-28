import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar'
import NotFound from './views/404';

const App = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#92a3a2';

    return () => { document.body.style.removeProperty('backgroundColor'); }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <main className="d-flex justify-content-center min-vh-100 align-items-center">
        <Switch>
          <Route exact path='/'>
            <h1 className='text-success'>Home</h1>
          </Route>
          <Route exact path='/about'>
            <h1 className='text-danger'>About</h1>
          </Route>
          <Route exact path='/login'>
            <h1 className='text-danger'>Login</h1>
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
