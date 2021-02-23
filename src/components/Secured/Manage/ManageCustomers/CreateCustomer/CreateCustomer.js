import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import api from '../../../../../apis/api';
import { newCustomer } from '../../../../../utils/models';
import SellerDropdown from '../../../Custom/SellerDropdown/SellerDropdown';
import SelectCountry from '../../../../SelectCountry';
import SelectCampaign from '../../../../SelectCampaign';
import SelectStatus from '../../../../SelectStatus';

const CreateCustomer = () => {
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(newCustomer);
  const [formErrors, setFormErrors] = useState(newCustomer);
  const registerCustomer = async () => {
    let response = null;
    try {
      response = await api.post('/customers/register', currentUser);
      toast.success('👍 Customer details was successfully registered.');
    } catch (err) {
      const { data } = err.response;
      toast.error(
        '⚠️ Error saving customer. Please check if email already exists.'
      );
    }
  };

  const onLogin = (e) => {
    setFormErrors({ ...newCustomer });
    let hasErrors = false;
    if (currentUser.firstName.length < 2) {
      setFormErrors((prev) => ({ ...prev, firstName: 'Required field' }));
      hasErrors = true;
    }
    if (currentUser.lastName.length < 2) {
      setFormErrors((prev) => ({ ...prev, lastName: 'Required field' }));
      hasErrors = true;
    }
    if (currentUser.email.length < 2) {
      setFormErrors((prev) => ({ ...prev, email: 'Required field' }));
      hasErrors = true;
    }

    if (currentUser.country === '0') {
      setFormErrors((prev) => ({ ...prev, country: 'Required field' }));
      hasErrors = true;
    }
    if (currentUser.phone.length < 2) {
      setFormErrors((prev) => ({ ...prev, phone: 'Required field' }));
      hasErrors = true;
    }
    if (currentUser.userName.length < 2) {
      setFormErrors((prev) => ({ ...prev, userName: 'Required field' }));
      hasErrors = true;
    }
    if (currentUser.userPassword.length < 2) {
      setFormErrors((prev) => ({ ...prev, userPassword: 'Required field' }));
      hasErrors = true;
    }

    if (currentUser.country < 0) {
      setFormErrors((prev) => ({ ...prev, country: 'Required field' }));
      hasErrors = true;
    }
    if (currentUser.campaign === '-1') {
      setFormErrors((prev) => ({ ...prev, campaign: 'Required field' }));
      hasErrors = true;
    }

    if (!hasErrors) {
      registerCustomer();
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await api.get('users/');
        setUsers(data);
      } catch (err) {
        console.log(err);
        toast.error('⚠️ Error loading users list.');
      }
    };

    getUsers();
  }, []);

  const onActiveChange = (e) => {
    setCurrentUser({ ...currentUser, isActive: e.target.checked });
  };
  const inputChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    if (name === 'owner' && value === '0') {
      value = undefined;
    }
    setCurrentUser({ ...currentUser, [e.target.name]: value });
  };

  const buttonText = 'Create new Customer';
  return (
    <div className='users'>
      <div className='manage__sellers'>
        <div>
          <input
            type='checkbox'
            checked={currentUser.isActive}
            onChange={onActiveChange}
          />
          <label> Active</label>
        </div>
        <input
          type='text'
          value={currentUser.firstName}
          onChange={inputChange}
          placeholder='First Name'
          name='firstName'
        />
        {formErrors.firstName && <p>{formErrors.firstName}</p>}
        <input
          type='text'
          value={currentUser.lastName}
          placeholder='Last Name'
          onChange={inputChange}
          name='lastName'
        />
        {formErrors.lastName && <p>{formErrors.lastName}</p>}

        <input
          type='text'
          value={currentUser.phone}
          placeholder='Phone'
          onChange={inputChange}
          name='phone'
        />
        {formErrors.phone && <p>{formErrors.phone}</p>}
        <SelectCountry value={currentUser.country} onChange={inputChange} />
        {formErrors.country !== '0' && <p>{formErrors.country}</p>}
        <SelectCampaign
          value={currentUser.campaign}
          name='campaign'
          onChange={inputChange}
        />
        {formErrors.campaign === '-1' && <p>{formErrors.campaign}</p>}
        <SelectStatus
          name='status'
          value={currentUser.status}
          withAnyOption={false}
          onChange={inputChange}
        />
        <SellerDropdown
          className='seller-dropdown'
          users={users}
          onUserChange={inputChange}
          currentUser={currentUser}
          defaultText='-- UnControlled --'
        />
        <input
          type='text'
          value={currentUser.email}
          placeholder='Email'
          onChange={inputChange}
          name='email'
        />
        {formErrors.email && <p>{formErrors.email}</p>}
        <input
          type='text'
          value={currentUser.userName}
          placeholder='User name'
          onChange={inputChange}
          name='userName'
        />
        {formErrors.userName && <p>{formErrors.userName}</p>}
        <input
          type='text'
          value={currentUser.userPassword}
          placeholder='Password'
          onChange={inputChange}
          name='userPassword'
        />
        {formErrors.userPassword && <p>{formErrors.userPassword}</p>}
        <div>
          <button className='button bg-success' onClick={onLogin}>
            {buttonText}
          </button>
        </div>
      </div>
      <ToastContainer position='bottom-left' autoClose={2500} />
    </div>
  );
};

export default CreateCustomer;
