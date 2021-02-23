import React, { useState } from 'react';
import ManageInventory from './ManageInventory';
import ManageHeaders from './ManageHeaders';

const ManageInventoryMenu = () => {
  const [menu, setMenu] = useState(1);
  const isSelectedClass = (x) => {
    return menu === x ? 'selected' : '';
  };

  const changeMenu = (x) => {
    setMenu(x);
  };

  const getComponent = () => {
    switch (menu) {
      case 0: {
        return <ManageHeaders />;
      }
      case 1: {
        return <ManageInventory />;
      }
      case 2: {
        return () => {};
      }

      default: {
        return () => {};
      }
    }
  };

  return (
    <div className='manage-customers'>
      <div className='manage-customers__buttons'>
        <button
          className={`button  bg-blue-deep-inverse ${isSelectedClass(0)}`}
          onClick={() => changeMenu(0)}
        >
          Manage Headers
        </button>
        <button
          className={`button  bg-blue-deep-inverse ${isSelectedClass(1)}`}
          onClick={() => changeMenu(1)}
        >
          Manage Inventory Groups
        </button>
      </div>
      <div className='manage-content'>{getComponent()}</div>
    </div>
  );
};

export default ManageInventoryMenu;
