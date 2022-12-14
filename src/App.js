import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Album from './pages/Album';
import Login from './pages/Login';
import Search from './pages/Search';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  render() {
    return (
      <main>
        <BrowserRouter basename={ process.env.PUBLIC_URL }>
          <Switch>
            <Route exact path="/trybetunes" component={ Login } />
            <Route exact path="/trybetunes/search" component={ Search } />
            <Route exact path="/trybetunes/album/:id" component={ Album } />
            <Route exact path="/trybetunes/favorites" component={ Favorites } />
            <Route exact path="/trybetunes/profile" component={ Profile } />
            <Route exact path="/trybetunes/profile/edit" component={ ProfileEdit } />
            <Route exact path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
