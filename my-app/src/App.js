import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Login from './pages/login';
import Members from './pages/members';
import Logout from './pages/logout';
import Profile from './pages/profile';

const App = ()=>(
  <BrowserRouter>
    <div>
      <Route path="/login" component={Login} />
      <Route path="/members" component={Members} />
      <Route path= "/logout" component={Logout} />
      <Route path="/profile/:email" component={Profile} />
    </div>
  </BrowserRouter>
)
export default App;