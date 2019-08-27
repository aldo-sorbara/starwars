import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useCurrentFilm } from '../../contexts/CurrentFilmContext';
import { MAX_PER_PAGE } from '../../utils/constants';
import api from '../../services/api';
import {
  Grid,
  TablePagination,
  CircularProgress,
  NativeSelect,
  InputLabel,
  FormControl,
  Input
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import filtersConfig from './filtersConfig';
import CardCharacter from '../../components/CardCharacter';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 20
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  filtersContainer: {
    textAlign: 'right'
  },
  formControl: {
    paddingRight: 20
  }
}));

const FilmCharacters = ({ match }) => {
  const { currentFilm, setCurrentFilm } = useCurrentFilm();
  const [loading, setLoading] = useState(true);
  const [currentPage, setPage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [currentCharacters, setCurrentCharacters] = useState([]);
  const [currentFilters, setFilters] = useState({});

  const classes = useStyles();
  useEffect(() => {
    if (!currentFilm || currentFilm.id.toString() !== match.params.filmId) {
      api(`https://swapi.co/api/films/${match.params.filmId}`)
        .then(response => response.json())
        .then(res => {
          setCurrentFilm({ ...res, id: match.params.filmId });
        })
        .catch(err => {
          console.log(err, 'err');
          setLoading(false);
        });
    } else {
      Promise.all(
        currentFilm.characters.map(url =>
          api(url).then(response => response.json())
        )
      )
        .then(res => {
          setCharacters(res);
          setCurrentCharacters(res);
          setLoading(false);
        })
        .catch(err => {
          console.log(err, 'error');
          setLoading(false);
        });
    }
  }, [currentFilm, match.params.filmId, setCurrentFilm]);

  const handleChange = (field, e) => {
    const newFilters = { ...currentFilters, [field]: e.target.value };
    setFilters(newFilters);
    setCurrentCharacters(
      characters.filter(character => {
        let matches = true;
        Object.keys(newFilters).forEach(filter => {
          if (
            newFilters[filter] &&
            ((!Array.isArray(character[filter]) &&
              newFilters[filter] !== character[filter]) ||
              (Array.isArray(character[filter]) &&
                !character[filter].includes(newFilters[filter])))
          ) {
            matches = false;
          }
        });

        return matches;
      })
    );
  };

  return loading ? (
    <div className={classes.loadingContainer}>
      <CircularProgress />
    </div>
  ) : (
    <div className={classes.root}>
      <div className={classes.filtersContainer}>
        {filtersConfig.map(filter => (
          <FormControl key={filter.name} className={classes.formControl}>
            <InputLabel>{filter.label}:</InputLabel>
            <NativeSelect
              value={currentFilters[filter.name]}
              onChange={e => handleChange(filter.name, e)}
              input={<Input name={filter.name} />}
            >
              <option value="" />
              {filter.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        ))}
      </div>
      <TablePagination
        component="nav"
        rowsPerPageOptions={[]}
        count={currentCharacters.length}
        rowsPerPage={MAX_PER_PAGE}
        page={currentPage}
        onChangePage={(_, newPage) => setPage(newPage)}
      />
      <Grid container spacing={6}>
        {currentCharacters
          .slice(
            currentPage * MAX_PER_PAGE,
            currentPage * MAX_PER_PAGE + MAX_PER_PAGE
          )
          .map(character => {
            return (
              <CardCharacter
                key={character.url}
                character={character}
                currentFilm={currentFilm}
              />
            );
          })}
      </Grid>
    </div>
  );
};

export default withRouter(FilmCharacters);
