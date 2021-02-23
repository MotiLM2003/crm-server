import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { login } from '../../actions/userActions';
import Bubbles from '../Bubbles/Bubbles';
import Error from './Error';

import logoIcon from '../../images/logo-icon.png';
import logoText from '../../images/logo-text.png';
import logo from '../../images/logo.png';
const containerVariants = {
  hidden: {
    opacity: 0.2,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, when: 'beforeChildren' },
  },
};

const logoVariant = {
  hidden: {
    scale: 0,
    opacity: 0,
    rotateY: 0,
    y: '-4rem',
  },
  visible: {
    scale: 1,
    rotateY: 360,
    opacity: 1,
    transition: { delay: 0.1, duration: 1.4, type: 'tween', ease: 'easeInOut' },
  },
};

const logoTextVariant = {
  hidden: {
    opacity: 0,

    y: '-4rem',
  },
  visible: {
    opacity: 1,

    transition: { duration: 1, type: 'tween', ease: 'easeOut' },
  },
};

const Login = (props) => {
  const [userDetails, setUserDetails] = useState({
    email: 'motiphone2003@gmail.com',
    password: '1234',
    hasError: false,
  });

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    document.title = 'champagne Deutz';
  }, []);

  useEffect(() => {
    const _isSignedIn = !!props.user?._id;
    setIsSignedIn(_isSignedIn);
  }, [props.user?._id]);

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // window.location = '/backoffice/dashboard/';
  }, [isSignedIn]);

  const initLogin = () => {
    const hasError =
      userDetails.email.length < 2 || userDetails.password.length < 2;
    setUserDetails({
      ...userDetails,
      hasError,
    });

    if (!hasError) {
      props.login(userDetails);
    }
  };

  return isSignedIn ? (
    <Redirect to='/backoffice/dashboard' />
  ) : (
    <motion.div
      className='login-container p-1'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='login-container__corner-logo'>
        <img src={logo} alit='logo' />
      </div>
      <Bubbles />
      <div className='login-container__login-info mt-15'>
        <div className='login-container__logo-container'>
          <motion.img src={logoIcon} alt='logo' variants={logoVariant} />
          <motion.img src={logoText} alt='logo' variants={logoTextVariant} />
        </div>

        <div className='card-container bg-transparent-white login-container__form_fields'>
          <input
            type='text'
            placeholder='Email ou Username'
            className='mb-2'
            name='email'
            onChange={onChange}
            value={userDetails.email}
          />
          {}
          <input
            type='password'
            placeholder='Password'
            className='mb-1'
            name='password'
            onChange={onChange}
            value={userDetails.password}
          />
          <motion.button
            className='button bg-blue mt-1 mb-2 login-container__login_button'
            onClick={initLogin}
          >
            Login
          </motion.button>
          {userDetails.hasError && <Error error='Wrong credentials.' />}
          <div className='divider mt-1'></div>
        </div>
      </div>
    </motion.div>
  );
};

const stateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

export default connect(stateToProps, { login })(Login);
