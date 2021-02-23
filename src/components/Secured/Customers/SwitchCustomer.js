import React, { useEffect, useState } from 'react';
import SellerDropdown from '../Custom/SellerDropdown/SellerDropdown';
import SelectStatus from '../../SelectStatus';
import SelectCampaign from '../../SelectCampaign';
import api from '../../../apis/api';

const SwitchCustomer = ({
  changeSwithCustomers,
  customers,
  swithcCustomersSubmit,
}) => {
  const [users, setUsers] = useState(null);
  const [params, setParams] = useState({
    owner: -1,
    status: -1,
    campaign: -1,
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await api.get('users/');
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, []);

  const inputChanged = (e) => {
    const name = e.target.name;

    const value = e.target.value;
    setParams({ ...params, [name]: value });
  };

  const onSubmit = async () => {
    if (params.owner === -1) params.owner = null;
    if (params.status === -1) params.status = 0;
    if (params.campaign === -1) params.campaign = 0;
    const ids = customers.filter((x) => x.isMarked).map((item) => item._id);
    const { data } = await api.patch('/customers/update-many', {
      ids,
      updates: params,
    });

    const logs = customers
      .filter((x) => x.isMarked)
      .map((customer) => {
        return {
          ownerFrom: customer.owner?._id,
          ownerTo: params?.owner,
          customer: customer._id,
        };
      });

    const { data2 } = await api.post('/customers-switch/save-many', logs);

    swithcCustomersSubmit();
  };

  return (
    <div className='customers__switch-container'>
      <div className='customers__switch-content'>
        <div className='w-175'>Switch to</div>
        <div className='w-75' style={{ textAlign: 'center' }}>
          Count
        </div>
        <div className='w-200'>Status</div>
        <div className='w-100'>Campaign</div>
      </div>
      <div className='customers__switch-content'>
        <div className='w-175'>
          <SellerDropdown
            users={users}
            defaultText='-- UnControlled --'
            onUserChange={inputChanged}
          />
        </div>
        <div className='w-75' style={{ textAlign: 'center' }}>
          {customers.filter((x) => x.isMarked).length}
        </div>
        <div className='w-200'>
          <SelectStatus
            value={params.status}
            onChange={inputChanged}
            name='status'
          />
        </div>
        <div className='w-100'>
          <SelectCampaign
            value={params.campaign}
            onChange={inputChanged}
            name='campaign'
          />
        </div>
      </div>
      <div className='customers__switch-buttons'>
        <button className='button bg-success' onClick={onSubmit}>
          Switch owners
        </button>
        <button className='button bg-warning' onClick={changeSwithCustomers}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SwitchCustomer;
