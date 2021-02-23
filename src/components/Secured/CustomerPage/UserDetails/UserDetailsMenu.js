import React, { useState, useEffect } from 'react';
import Information from './Information';
import History from './History';
import Factures from './Factures';
import UserPassword from './UserPassword';

const UserDetails = () => {
  const [menu, setMenu] = useState(0);

  const renderTab = () => {
    switch (menu) {
      case 0: {
        return <Information />;
      }
      case 1: {
        return <History />;
      }
      case 2: {
        return <Factures />;
      }
      case 3: {
        return <UserPassword />;
      }
    }
  };

  const renderIsSelected = (x) => {
    return parseInt(x) === menu ? 'ma-cave__tab--selected' : '';
  };
  return (
    <div className='user-details'>
      <div className='ma-cave'>
        <section className='ma-cave__tabs'>
          <div
            className={`ma-cave__tab ${renderIsSelected(0)}`}
            onClick={() => setMenu(0)}
          >
            Informations
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(1)}`}
            onClick={() => setMenu(1)}
          >
            Historique
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(2)}`}
            onClick={() => setMenu(2)}
          >
            Factures
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(3)}`}
            onClick={() => setMenu(3)}
          >
            Password
          </div>
        </section>
        <section className='ma-cave__content'>{renderTab()}</section>
      </div>
    </div>
  );
};

export default UserDetails;
