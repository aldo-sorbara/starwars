import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../../services/api';
import { romanize } from '../../utils';
import { useCurrentFilm } from '../../contexts/CurrentFilmContext.js';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid
} from '@material-ui/core';
import OpeningCrawlModal from '../../components/OpeningCrawlModal';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  avatar: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontWeight: 600,
    fontSize: 80,
    textAlign: 'center',
    padding: '50px 0',
    letterSpacing: 10
  },
  root: {
    padding: 20
  },
  title: {
    fontSize: 20
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const HomePage = ({ history }) => {
  const classes = useStyles();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openingCrawl, setOpeningCrawl] = useState({ open: false });
  const { setCurrentFilm } = useCurrentFilm();

  useEffect(() => {
    api('https://swapi.co/api/films')
      .then(response => {
        return response.json();
      })
      .then(res => {
        setLoading(false);
        setFilms(res.results);
      })
      .catch(err => {
        console.log(err, 'error');
        setLoading(false);
      });
  }, []);

  const handleCurrentFilm = filmIndex => {
    const currentFilm = {
      ...films[filmIndex],
      id: filmIndex + 1
    };
    setCurrentFilm(currentFilm);
    history.push(`/films/${currentFilm.id}/characters`);
  };

  return loading ? (
    <div className={classes.loadingContainer}>
      <CircularProgress />
    </div>
  ) : (
    <div className={classes.root}>
      <Grid container spacing={6}>
        {films.map((film, index) => (
          <Grid key={film.episode_id} item xs={12} md={4} sm={6}>
            <Card>
              <div className={classes.avatar}>{romanize(film.episode_id)}</div>
              <CardHeader
                title={
                  <CardActionArea
                    className={classes.title}
                    onClick={() =>
                      setOpeningCrawl({
                        open: true,
                        title: `Episode ${romanize(film.episode_id)} - ${
                          film.title
                        }`,
                        text: film.opening_crawl
                      })
                    }
                  >
                    Episode {romanize(film.episode_id)} - {film.title}
                  </CardActionArea>
                }
                subheader={`Directed by ${film.director}`}
              />
              <CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => handleCurrentFilm(index)}
                  >
                    see full cast
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <OpeningCrawlModal
        open={openingCrawl.open}
        title={openingCrawl.title}
        text={openingCrawl.text}
        setModal={setOpeningCrawl}
      />
    </div>
  );
};

export default withRouter(HomePage);
