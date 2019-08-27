import React, { useState, useContext, createContext } from 'react';
import { oneOfType, node, arrayOf } from 'prop-types';

export const CurrentFilmContext = createContext({
  currentFilm: null,
  setCurrentFilm: () => {}
});

export const useCurrentFilm = () => useContext(CurrentFilmContext);

const CurrentFilmProvider = ({ children }) => {
  const [currentFilm, setCurrent] = useState(null);

  const setCurrentFilm = filmData => {
    setCurrent(filmData);
  };

  const context = {
    currentFilm,
    setCurrentFilm
  };
  return (
    <CurrentFilmContext.Provider value={context}>
      {children}
    </CurrentFilmContext.Provider>
  );
};

CurrentFilmProvider.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export default CurrentFilmProvider;
