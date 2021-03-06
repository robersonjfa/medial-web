const pagesStyle = theme => ({
  wrapper: {
    height: 'auto',
    position: 'relative',
    top: '0'
  },
  fullPage: {
    position: 'relative',
    minHeight: '100vh',
    margin: '0',
    border: '0',
    color: '#000',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'fit-content!important'
    },
    '& footer': {
      position: 'absolute',
      bottom: '0',
      width: '100%',
      border: 'none !important'
    },
    '&:before': {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    '&:before,&:after': {
      display: 'block',
      content: '',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      zIndex: '2'
    }
  }
});

export default pagesStyle;
