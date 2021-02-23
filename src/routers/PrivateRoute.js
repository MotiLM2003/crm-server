import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loadData } from '../actions/userActions';
import Cookies from 'universal-cookie';
import Header from '../components/Secured/Header/Header';

const cookie = new Cookies();

const token = cookie.get('token');
export const PrivateRoute = ({
  isAuthenticated,
  user,
  component: Component,
  loadData,
  ...rest
}) => {
  useEffect(() => {
    if (!isAuthenticated) {
      loadData(token);
    }
  }, []);
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/backoffice/' />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    isAuthenticated: !!state.userReducer._id,
  };
};
export default connect(mapStateToProps, { loadData })(PrivateRoute);
