import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthWrapper from './components/AuthWrapper';
import Navbar from './components/Navbar'
import { useCheckAuth, get_user_id } from './hooks/useCheckAuth';
import NotFound from './views/404';
import Create from './views/cards/Create';
import LoginRegister from './views/users/login';
import Profile from './views/users/profile';


toast.configure();

const App = () => {
  const isAuthed = useCheckAuth();
  const id = get_user_id();

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
              {isAuthed ? <Redirect to={`/profile/${id}`} /> : <Redirect to='/login' />}
            </Route>
            <AuthWrapper exact path='/create'>
              <Create />
            </AuthWrapper>
            <AuthWrapper exact path='/profile/:user_id'>
              <Profile />
            </AuthWrapper>
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
