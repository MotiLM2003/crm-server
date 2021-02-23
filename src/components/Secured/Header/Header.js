import React, { useEffect } from 'react';
import img from '../../../images/logo.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../../../actions/userActions';

const Header = (props) => {
  useEffect(() => {}, []);
  const logOut = () => {
    props.logOut();
  };
  return (
    <header className='header-container'>
      <div className='header-container__brand'>
        <Link to='/backoffice/dashboard'>
          <img src={img} alt='logo' />
        </Link>
        <input
          type='text'
          className='header-container__search'
          placeholder='Search something....'
        />
      </div>
      <div className='header-container__toolbar'>
        {props.user.role.type.toLocaleLowerCase() === 'seller' ? (
          <i className='fas fa-user'></i>
        ) : (
          <Link to='/backoffice/manage/'>
            <i className='fas fa-user-shield header-container__icon-1'></i>
          </Link>
        )}

        <i
          className='fas fa-sign-out-alt header-container__icon-2'
          onClick={logOut}
        ></i>
      </div>
    </header>
  );
};

const propToState = (state) => {
  return {
    user: state.userReducer,
  };
};
export default connect(propToState, { logOut })(Header);
