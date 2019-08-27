import React from 'react';
import { func, bool } from 'prop-types';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import soundfile from './opening.mp3';
const useStyles = makeStyles({
  root: {
    background: `url('/images/backgroundModal.jpg')`,
    color: '#e6ca3a',
    width: '100%',
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    zIndex: 2
  },
  closeButton: {
    float: 'right',
    position: 'relative',
    top: 10,
    right: 10,
    cursor: 'pointer',
    zIndex: 2
  },
  galaxy: {
    display: 'flex',
    flexDirection: 'column',
    top: 0
  },
  logo: {
    margin: 'auto',
    textAlign: 'center',
    paddingTop: 125,
    width: '100%',
    display: 'block',
    position: 'absolute',
    top: 0
  },
  fall: {
    width: 800,
    fontSize: 32,
    lineHeight: '50px',
    textIndent: 50,
    margin: 'auto',
    textAlign: 'center',
    perspective: 400,
    fontWeight: 'bold',
    height: '100%'
  },
  away: {
    margin: 'auto',
    animationDuration: '4s',
    animationDelay: '10s',
    animationName: '$farfar',
    opacity: 0,
    width: 350,
    display: 'block',
    textIndent: 0,
    paddingTop: '25%',
    position: 'absolute',
    fontWeight: 'normal'
  },
  text: {
    margin: 'auto',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    animationName: '$swcrawl',
    animationDelay: '15s',
    animationDuration: '35s',
    opacity: 0
  },
  headline: {
    textAlign: 'center',
    display: 'block',
    width: '100%',
    fontSize: 42,
    marginBottom: 30
  },
  logoImg: {
    width: '100%',
    opacity: 0,
    animationName: '$logo',
    animationDuration: '9s'
  },
  '@keyframes logo': {
    from: {
      width: '100%',
      opacity: 1
    },
    '90%': {
      opacity: 1
    },
    to: {
      width: 0,
      opacity: 0
    }
  },
  '@keyframes farfar': {
    '0%': {
      opacity: 0
    },
    '15%': {
      opacity: 1
    },
    '95%': {
      opacity: 1
    },
    '100%': {
      opacity: 0
    }
  },
  '@keyframes swcrawl': {
    '0%': {
      transform: `rotatex(45deg) translateY(470px)`,
      opacity: 1
    },
    '25%': {
      opacity: 1
    },
    '65%': {
      opacity: 1
    },
    '100%': {
      opacity: 0,
      transform: `rotatex(45deg) translateY(-50px)`
    }
  }
});
const OpeningCrawlModal = ({ open, text, title, setModal }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {open && (
        <div
          className={classes.root}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            className={classes.closeButton}
            color="inherit"
            onClick={() => setModal({ open: false })}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.galaxy}>
            <div className={classes.logo}>
              <img
                alt="logo"
                className={classes.logoImg}
                src="/images/logo.png"
              />
            </div>
            <div className={classes.fall}>
              <div className={classes.away}>
                A long time ago in a galaxy far, far away...
              </div>
              <p className={classes.text}>
                <i className={classes.headline}>{title}</i>
                {text.split('\r\n').map((item, i) => (
                  <React.Fragment key={`${item}_${title}_${i}`}>
                    {item} <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
          <audio src={soundfile} autoPlay />
        </div>
      )}
    </React.Fragment>
  );
};

OpeningCrawlModal.propTypes = {
  open: bool.isRequired,
  setModal: func.isRequired
};

export default OpeningCrawlModal;
