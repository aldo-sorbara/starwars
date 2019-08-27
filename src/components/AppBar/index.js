import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appBar: {
    minHeight: 50,
    marginBottom: 50
  },
  logo: {
    height: 30,
    width: 'auto',
    verticalAlign: 'sub'
  }
}));

const AppBar = () => {
  const classes = useStyles();

  return (
    <MuiAppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Link to="/">
          <Typography variant="h6" noWrap>
            <img alt="logo" className={classes.logo} src="/images/logo.png" />
          </Typography>
        </Link>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
