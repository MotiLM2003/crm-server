import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import SelectCountry from '../SelectCountry';
import { motion } from 'framer-motion';
import api from '../../apis/api';
import Error from './Error';
import { newCustomer as defaultCustomer } from '../../utils/models';
import Bubbles from '../Bubbles/Bubbles';

const Register = () => {
  const tempCustomer = { ...defaultCustomer, campaign: 0 };

  const [formData, setFormData] = useState(tempCustomer);
  const [serverResponse, setServerResponse] = useState(null);
  const [formErrors, setFormErrors] = useState({
    ...tempCustomer,
    isAgreed: '',
  });
  const dataChanged = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isAgrredChanged = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };
  const containerVariants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, when: 'beforeChildren' },
    },
  };

  const registerCustomer = async () => {
    let response = null;
    try {
      response = await api.post('/customers/register', formData);
      setServerResponse(1);
      setFormData(tempCustomer);
    } catch (err) {
      const { data } = err.response;
      setServerResponse(2);
    }
  };

  const onLogin = (e) => {
    setFormErrors({ ...tempCustomer });
    let hasErrors = false;
    if (formData.firstName.length < 2) {
      setFormErrors((prev) => ({ ...prev, firstName: 'Required field' }));
      hasErrors = true;
    }
    if (formData.lastName.length < 2) {
      setFormErrors((prev) => ({ ...prev, lastName: 'Required field' }));
      hasErrors = true;
    }
    if (formData.email.length < 2) {
      setFormErrors((prev) => ({ ...prev, email: 'Required field' }));
      hasErrors = true;
    }

    if (formData.country === '0') {
      setFormErrors((prev) => ({ ...prev, country: 'Required field' }));
      hasErrors = true;
    }
    if (formData.phone.length < 2) {
      setFormErrors((prev) => ({ ...prev, phone: 'Required field' }));
      hasErrors = true;
    }
    if (formData.userName.length < 2) {
      setFormErrors((prev) => ({ ...prev, userName: 'Required field' }));
      hasErrors = true;
    }
    if (formData.userPassword.length < 2) {
      setFormErrors((prev) => ({ ...prev, userPassword: 'Required field' }));
      hasErrors = true;
    }
    if (formData.passwordConfirm.length < 2) {
      setFormErrors((prev) => ({ ...prev, passwordConfirm: 'Required field' }));
      hasErrors = true;
    }
    if (!formData.isAgreed) {
      setFormErrors((prev) => ({ ...prev, isAgreed: 'Required field' }));
      hasErrors = true;
    }
    if (!hasErrors) {
      registerCustomer();
    }
  };
  return (
    <motion.div
      className='login-container register'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='login-container__corner-logo'>
        <img src={logo} alit='logo' />
      </div>
      <Bubbles />
      <div className='login-container__login-info register__login-info mt-15'>
        <img src={logo} alt='logo' />
        <div className='card-container bg-transparent-white register__form_fields'>
          {serverResponse && (
            <div
              className={
                serverResponse === 1
                  ? 'register__server-response bg-success'
                  : 'register__server-response bg-warning'
              }
            >
              {serverResponse == 1
                ? "You've been added"
                : 'Email already exists.'}
            </div>
          )}
          <input
            type='text'
            placeholder='Nom de famille'
            value={formData.firstName}
            name='firstName'
            onChange={dataChanged}
          />
          {formErrors.firstName && <Error error={formErrors.firstName} />}
          <input
            type='text'
            placeholder='Prénom'
            value={formData.lastName}
            onChange={dataChanged}
            name='lastName'
          />
          {formErrors.lastName && <Error error={formErrors.lastName} />}
          <input
            type='text'
            placeholder='E-Mail'
            value={formData.email}
            onChange={dataChanged}
            name='email'
          />
          {formErrors.email && <Error error={formErrors.email} />}
          <input
            type='text'
            placeholder='Téléphone'
            value={formData.phone}
            onChange={dataChanged}
            name='phone'
          />
          {formErrors.phone && <Error error={formErrors.phone} />}
          <SelectCountry value={formData.country} onChange={dataChanged} />
          {formErrors.country !== '0' && <Error error={formErrors.country} />}

          <p>Détails de votre compte:</p>
          <input
            type='text'
            placeholder='Username'
            value={formData.userName}
            onChange={dataChanged}
            name='userName'
          />
          {formErrors.userName && <Error error={formErrors.userName} />}
          <input
            type='password'
            placeholder='Password'
            value={formData.userPassword}
            onChange={dataChanged}
            name='userPassword'
          />
          {formErrors.userPassword && <Error error={formErrors.userPassword} />}

          <input
            type='password'
            placeholder='confirmation password'
            value={formData.passwordConfirm}
            onChange={dataChanged}
            name='passwordConfirm'
          />
          {formErrors.passwordConfirm && (
            <Error error={formErrors.passwordConfirm} />
          )}
          <div className='mt-2 mb-2'>
            <input
              type='checkbox'
              name='chbAgreement'
              id='chbAgreement'
              value={formData.isAgreed}
              onChange={isAgrredChanged}
              name='isAgreed'
            />
            <label for='chbAgreement'>
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          {formErrors.isAgreed && <Error error={formErrors.isAgreed} />}
          <div className='register__buttons'>
            <Link
              to='/'
              className='button bg-gray-light mt-1 login-container__login_button'
            >
              Retour
            </Link>
            <button
              className='button bg-blue mt-1 login-container__login_button'
              onClick={onLogin}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
