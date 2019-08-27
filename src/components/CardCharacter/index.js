import React, { useState } from 'react';
import {
  Button,
  Collapse,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  Grid,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  CircularProgress,
  Divider
} from '@material-ui/core';
import api from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import OpeningCrawlModal from '../OpeningCrawlModal';
import { romanize } from '../../utils';

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
  listHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 0
  },
  listItem: { borderLeft: `4px solid ${theme.palette.secondary.main}` }
}));

const AppBar = ({ character, currentFilm }) => {
  const classes = useStyles();
  const [openingCrawl, setOpeningCrawl] = useState({ open: false });
  const [expanded, setExpanded] = useState({});
  const [filmsLoading, setFilmsLoading] = useState({});
  const [otherFilmsObj, setOtherFilms] = useState({});
  const otherFilms = character.films.filter(film => film !== currentFilm.url);

  const handleOtherFilms = (character, otherFilms) => {
    setExpanded({ ...expanded, [character.url]: true });
    setFilmsLoading({
      ...filmsLoading,
      [character.url]: true
    });

    Promise.all(
      otherFilms.map(film => api(film).then(response => response.json()))
    ).then(res => {
      setFilmsLoading({ ...filmsLoading, [character.url]: false });
      setOtherFilms({ ...otherFilmsObj, [character.url]: res });
    });
  };

  return (
    <React.Fragment>
      <Grid item xs={12} md={6} sm={6}>
        <Card key={character.name}>
          <div className={classes.avatar}>
            {character.name.match(/\b(\w)/g).join('')}
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {character.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Eyes are {character.eye_color} and gender is {character.gender}
            </Typography>
            <ListSubheader className={classes.listHeader}>Films:</ListSubheader>
            <CardActionArea
              onClick={() =>
                setOpeningCrawl({
                  open: true,
                  title: `Episode ${romanize(currentFilm.episode_id)} - ${
                    currentFilm.title
                  }`,
                  text: currentFilm.opening_crawl
                })
              }
            >
              <ListItem className={classes.listItem}>
                <ListItemText
                  primary={`${currentFilm.title} - Episode ${romanize(
                    currentFilm.episode_id
                  )}`}
                />
              </ListItem>
            </CardActionArea>
            {!expanded[character.url] && otherFilms.length ? (
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleOtherFilms(character, otherFilms)}
                >
                  See full list of films
                </Button>
              </CardActions>
            ) : (
              <div />
            )}
            <Collapse in={expanded[character.url]}>
              <React.Fragment>
                {filmsLoading[character.url] ? (
                  <CircularProgress />
                ) : (
                  otherFilmsObj[character.url] &&
                  otherFilmsObj[character.url].map(film => (
                    <CardActionArea
                      key={film.episode_id}
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
                      <Divider />
                      <ListItem className={classes.listItem}>
                        <ListItemText
                          primary={`${film.title} - Episode ${romanize(
                            film.episode_id
                          )}`}
                        />
                      </ListItem>
                    </CardActionArea>
                  ))
                )}
              </React.Fragment>
            </Collapse>
          </CardContent>
        </Card>
      </Grid>
      <OpeningCrawlModal
        open={openingCrawl.open}
        title={openingCrawl.title}
        text={openingCrawl.text}
        setModal={setOpeningCrawl}
      />
    </React.Fragment>
  );
};

export default AppBar;
