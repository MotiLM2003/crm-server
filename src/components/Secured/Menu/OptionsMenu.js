import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../../history';

import close from '../../../images/close.svg';

const OptionsMenu = (props) => {
  const [menuItem, setMenuItem] = useState(0);
  const [subMenuItem, setSubMenuItem] = useState(0);
  const [isSubMenuOn, setIsSubMenuOn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {}, []);
  const loadPage = (menuItem) => {
    setMenuItem(menuItem);
    switch (menuItem) {
      case 0: {
        history.push('/backoffice/dashboard');
        break;
      }
      case 1: {
        history.push('/backoffice/customers');
        break;
      }

      case 2: {
        history.push('/backoffice/planning');
        break;
      }
      case 3: {
        history.push('/backoffice/manage/');
        break;
      }
    }
  };

  return (
    <div
      className={`secured-container__menu ${
        isMenuOpen ? '' : 'secured-container--close'
      }`}
    >
      <div
        className={`secured-container__close`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <label
          labelfor='chbMenu'
          className={`secured-container__humburger ${
            !isMenuOpen ? '' : 'secured-container__menu--closed'
          }`}
        ></label>
      </div>

      <div
        className={`secured-container__menu-item ${
          menuItem == 0 ? 'secured-container__selected' : ''
        }`}
        onClick={() => loadPage(0)}
      >
        <div className='secured-container__menu-icon-container'>
          <i className='fas fa-tachometer-alt'></i>
        </div>
        <span>Dashboard</span>
      </div>
      <div
        className={`secured-container__menu-item ${
          menuItem === 1 ? 'secured-container__selected' : ''
        }`}
        onClick={() => loadPage(1)}
      >
        <div className='secured-container__menu-icon-container'>
          <i className='fas fa-users'></i>
        </div>
        <span>Customers</span>
      </div>

      <div
        className={`secured-container__menu-item ${
          menuItem === 2 ? 'secured-container__selected' : ''
        }`}
        onClick={() => loadPage(2)}
      >
        <div className='secured-container__menu-icon-container'>
          <i className='far fa-calendar-alt'></i>
        </div>
        <span>Planning</span>
      </div>
      {props.user.role.type.toLocaleLowerCase() === 'admin' && (
        <div
          className={`secured-container__menu-item ${
            menuItem == 3 ? 'secured-container__selected' : ''
          }`}
          onClick={() => loadPage(3)}
        >
          <div className='secured-container__menu-icon-container'>
            <i className='fas fa-user-shield header-container__icon-1'></i>
          </div>
          <span>Manage</span>
        </div>
      )}
    </div>
  );
};

const propToState = (state) => {
  return {
    user: state.userReducer,
  };
};
export default connect(propToState)(OptionsMenu);
