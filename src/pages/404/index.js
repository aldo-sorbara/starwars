import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  notFoundImg: {
    margin: '40px auto',
    display: 'block',
    width: 300
  },
  link: {
    textAlign: 'center',
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <img
        alt="notFoundPage"
        className={classes.notFoundImg}
        src="/images/404.png"
      />
      <Link to="/" className={classes.link}>
        <Typography gutterBottom variant="h5" component="h2">
          Return to home Page
        </Typography>
      </Link>
    </React.Fragment>
  );
};

export default withRouter(NotFound);
