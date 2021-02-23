import React, { useEffect } from 'react';
import img from '../../../images/logo.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../../utils/formatting';

const Header = (props) => {
  const { customer } = props;
  return (
    <header className='header-container'>
      <div className='header-container__brand'>
        <Link to='/backoffice/dashboard'>
          <img src={img} alt='logo' />
        </Link>
      </div>
      <div className='header-container__toolbar'>
        <div>
          <div>
            <i className='fas fa-user'></i>
            {customer.firstName} {customer.lastName}
          </div>
          <div>
            <i class='fas fa-money-bill'></i>
            {formatMoney(customer.balance)}
          </div>
          <div>
            <i className='fas fa-sign-out-alt header-container__icon-2'></i>
            (Déconnexion)
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};

export default connect(mapStateToProps)(Header);
