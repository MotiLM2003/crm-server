import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SelectCountry from '../../../SelectCountry';
const Information = (props) => {
  const [customer, setCustomer] = useState({
    firstName: props.customer.firstName,
    lastName: props.customer.lastName,
    email: props.customer.email,
    country: props.customer.country,
    phone: props.customer.phone,
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, ' ', value);
    setCustomer({ ...customer, [name]: value });
  };

  return (
    <div>
      <div className='user-info'>
        <div className='user-info__container'>
          <div className='flex'>
            <label>Prénom:</label>
            <input
              type='text'
              placeholder='Prénom'
              name='firstName'
              value={customer.firstName}
              onChange={onChange}
            />
          </div>
          <div className='flex'>
            <label>Nom:</label>
            <input
              type='text'
              placeholder='Nom'
              name='lastName'
              value={customer.lastName}
              onChange={onChange}
            />
          </div>

          <div className='flex'>
            <label>E-mail:</label>
            <input
              type='text'
              placeholder='E-mail'
              name='email'
              value={customer.email}
              onChange={onChange}
            />
          </div>
          <div className='flex'>
            <label>Téléphone:</label>
            <input
              type='text'
              placeholder='Téléphone'
              name='phone'
              value={customer.phone}
              onChange={onChange}
            />
          </div>
          <div className='flex'>
            <label>Pays:</label>
            <SelectCountry
              value={customer.country}
              name='country'
              onChange={onChange}
            />
          </div>
        </div>
        <div className='user-info__container'>
          <div className='flex'>
            <lel>Adresse:</lel>
            <input
              type='text'
              placeholder='Adresse'
              name='phone'
              value={customer.address}
              onChange={onChange}
            />
          </div>
          <div className='flex'>
            <label>Code postal:</label>
            <input
              type='text'
              placeholder='Code postal'
              name='phone'
              value={customer.postCode}
              onChange={onChange}
            />
          </div>
          <div className='flex'>
            <label>Ville:</label>
            <input
              type='text'
              placeholder='Ville'
              name='phone'
              value={customer.ville}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div className='user-info__buttons'>
        <button className='button bg-in-success'>Update details</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};

export default connect(mapStateToProps)(Information);
