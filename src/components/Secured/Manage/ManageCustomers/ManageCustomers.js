import React, { useState } from 'react';
import CreateCustomer from './CreateCustomer/CreateCustomer';
import ImportCustomers from './ImportCustomers/ImportCustomers';
import PendingRequest from '../PendingRequests/PendingRequests';
import PendingOfferRequests from './PendingOfferRequests/PendingOfferRequests';
const ManageCustomers = () => {
  const [menu, setMenu] = useState(1);
  const isSelectedClass = (x) => {
    return menu === x ? 'selected' : '';
  };

  const changeMenu = (x) => {
    setMenu(x);
  };

  const getComponent = () => {
    switch (menu) {
      case 1: {
        return <CreateCustomer />;
      }
      case 2: {
        return <ImportCustomers />;
      }
      case 3: {
        return <PendingRequest />;
      }
      case 4: {
        return <PendingOfferRequests />;
      }

      default: {
        return <CreateCustomer />;
      }
    }
  };

  return (
    <div className='manage-customers'>
      <div className='manage-customers__buttons'>
        <button
          className={`button  bg-blue-deep-inverse ${isSelectedClass(1)}`}
          onClick={() => changeMenu(1)}
        >
          Create Customers
        </button>

        <button
          className={`button bg-blue-deep-inverse ${isSelectedClass(2)}`}
          onClick={() => changeMenu(2)}
        >
          Import Customers
        </button>
        <button
          className={`button bg-blue-deep-inverse ${isSelectedClass(3)}`}
          onClick={() => changeMenu(3)}
        >
          Pending Orders Requests
        </button>
        <button
          className={`button bg-blue-deep-inverse ${isSelectedClass(4)}`}
          onClick={() => changeMenu(4)}
        >
          Offers Requests
        </button>
      </div>
      <div className='manage-content'>{getComponent()}</div>
    </div>
  );
};

export default ManageCustomers;
