import { Switch, Route, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../components/Login/Login';
import UserLogin from '../components/Login/UserLogin';
import Register from '../components/Login/Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Header from '../components/Secured/Header/Header';
import Dashboard from '../components/Secured/Dashboard/Dashboard';
import Customers from '../components/Secured/Customers/Customers';
import HomePage from '../components/Secured/CustomerPage/HomePage';
import Manage from '../components/Secured/Manage/Manage';
import CustomersDetails from '../components/Secured/CustomersDetails/CustomersDetails';
import Planning from '../components/Secured/Planning/Planning';
import OptionsMenu from '../components/Secured/Menu/OptionsMenu';
import CustomerHeader from '../components/Secured/CustomerPage/Header';
import BackToTop from '../components/BackToTop/BackToTop';

const AppRouter = ({ isAuthenticated, isCustomerAuth }) => {
  const location = useLocation();
  const authRender = () => {
    return (
      <div className='secured-container'>
        <Header />
        <div className='secured-container__main-content'>
          <OptionsMenu />
          <BackToTop />
          <div className='private-route-container'>
            <Switch location={location} key={location.key}>
              <PublicRoute exact path='/backoffice' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute
                path='/backoffice/dashboard'
                component={Dashboard}
              />
              <PrivateRoute exact path='/planning' component={Planning} />
              <PrivateRoute
                exact
                path='/backoffice/customers'
                component={Customers}
              />
              <PrivateRoute
                exact
                path='/backoffice/manage/'
                component={Manage}
              />
              <PrivateRoute
                path='/backoffice/customers/details/:id'
                component={CustomersDetails}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  };

  const publicRender = () => {
    return (
      <Switch location={location} key={location.key}>
        <PublicRoute exact path='/' component={UserLogin} />
        <PublicRoute exact path='/backoffice' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute path='/backoffice/dashboard' component={Dashboard} />
      </Switch>
    );
  };

  const customerPrivateRender = () => {
    return (
      <div class='customer-area'>
        <CustomerHeader />
        <Switch location={location} key={location.key}>
          <PublicRoute path='/' component={HomePage} />
          <PublicRoute path='/home/' component={HomePage} />
        </Switch>
      </div>
    );
  };

  if (isCustomerAuth) {
    return customerPrivateRender();
  } else {
    return isAuthenticated ? authRender() : publicRender();
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    isAuthenticated: !!state.userReducer._id,
    isCustomerAuth: !!state.customerReducer._id,
    customer: state.customer,
  };
};

export default connect(mapStateToProps)(AppRouter);
