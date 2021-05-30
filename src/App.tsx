import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';

import Navbar from './components/Navbar'
import NotFound from './views/404';
import Create from './views/cards/Create';
import LoginRegister from './views/users/login';
import Profile from './views/users/profile';

toast.configure();

const App = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#b5c1c0';

    return () => { document.body.style.removeProperty('backgroundColor'); }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <main className="container-fluid min-w-100 min-vh-100 d-flex align-items-center">
        <div className="d-flex w-100 justify-content-center ">
          <Switch>
            <Route exact path='/'>
              <h1 className='text-success'>Home</h1>
            </Route>
            <Route exact path='/create'>
              <Create />
            </Route>
            <Route exact path='/profile/:user_id'>
              <Profile />
            </Route>
            <Route exact path='/login'>
              <LoginRegister />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
