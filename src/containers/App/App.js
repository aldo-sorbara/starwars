import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FilmCharactersPage from '../../pages/FilmCharacters';
import HomePage from '../../pages/Home/';
import NoMatchPage from '../../pages/404';
import GlobalState from '../GlobalState/GlobalState';
import AppBar from '../../components/AppBar';

const App = () => (
  <div>
    <GlobalState>
      <Router>
        <div>
          <main>
            <AppBar />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route
                path="/films/:filmId/characters"
                exact
                component={FilmCharactersPage}
              />
              <Route component={NoMatchPage} />
            </Switch>
          </main>
        </div>
      </Router>
    </GlobalState>
  </div>
);

export default App;
