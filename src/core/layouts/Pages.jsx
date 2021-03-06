import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import PagesHeader from '../../core/components/header/PagesHeader';
import pagesRoutes from '../../core/routes/pages';

import pagesStyle from '../../assets/jss/layouts/pagesStyle';
import Homepage from '../../feature/homepage/Homepage';

class Pages extends React.Component {
  componentDidMount() {
    document.body.style.overflow = 'unset';
  }


  getRoutes() {

    let possui = false;
    let routes = pagesRoutes.map((prop, key) => {
      if (prop.collapse) {
        return null;
      }

      if (prop.path === this.props.location.pathname) {
        possui = true;
      }
      if (prop.redirect) {
        return (

          <Redirect from={prop.path} to={prop.pathTo} key={key} />
        );
      }
      return (
        <Route
          path={prop.path}
          component={prop.component}
          key={key}
        />
      );
    })

    if (!possui && this.props.location.pathname !== "/") {
        this.props.history.push("/");
    }
    return routes
  }

  render() {
    const { classes, ...rest } = this.props;
    return (

      <div> <PagesHeader {...rest} />

        <div className={classes.wrapper} ref='wrapper'>
          <div className={classes.fullPage}>
            <Switch>
              <Route path="/" component={Homepage} exact></Route>
              {this.getRoutes()}
            </Switch>
          </div></div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Pages);
