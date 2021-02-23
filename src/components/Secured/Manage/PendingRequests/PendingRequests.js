import React, { useState, useEffect } from 'react';
import api from '../../../../apis/api';
import PendingRequestItem from './PendingRequestItem';

const PendingRequests = () => {
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const getData = async (req, res) => {
      const { data } = await api.post('customers-inventory/get', {
        limit: 10,
        status: 0,
      });

      setGroups(data);
    };
    getData();
  }, []);

  const acceptProduct = async (group, isWithDeposit, customer, price) => {
    const { data } = await api.put(
      `customers-inventory/update-one/${group._id}`,
      {
        status: 1,
      }
    );

    if (parseInt(customer.balance) < parseInt(price)) price = customer.balance;

    const { depositData } = await api.patch('/customers/deposit/', {
      _id: customer.id,
      amount: -1 * price,
    });

    setGroups(groups.filter((g) => g._id !== group._id));
    console.log(isWithDeposit);
  };

  const deleteProduct = async (group) => {
    const { data } = await api.delete(
      `customers-inventory/delete/${group._id}`
    );
    setGroups(groups.filter((g) => g._id !== group._id));
  };
  const renderHeader = () => {
    return (
      <div className={`customers-log__item header`}>
        <div>Customer</div>
        <div>Balance</div>
        <div>Product</div>
        <div>Price</div>
        <div>Expiration</div>
        <div className={`pending-requests__buttons`}>Actions</div>
        <div className={`textCenter`}>Remove from balance</div>
      </div>
    );
  };

  const renderBody = () => {
    return (
      groups &&
      groups.map((group, index) => {
        return (
          <PendingRequestItem
            key={group._id}
            group={group}
            acceptProduct={acceptProduct}
            deleteProduct={deleteProduct}
            index={index}
          />
        );
      })
    );
  };

  return (
    <div className='pending-requests'>
      <div className='customers-log header'>{renderHeader()}</div>
      <div>{renderBody()}</div>
    </div>
  );
};

export default PendingRequests;
