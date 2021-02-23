import React, { useState, useEffect } from 'react';
import moment from 'moment';
import api from '../../../../apis/api';
import { formatMoney } from '../../../../utils/formatting';
const DWaitingRequests = () => {
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

  const renderHeader = () => {
    return (
      <div className={`customers-log__item header`}>
        <div>Customer</div>
        <div>Balance</div>
        <div>Product</div>
        <div>Price</div>
        <div>Expiration</div>
      </div>
    );
  };

  const renderBody = () => {
    return (
      groups &&
      groups.map((group, index) => {
        const price = formatMoney(group.inventory.items[3].text);
        const balance = formatMoney(group.customer.balance);
        const date = moment(group.expiration).format('DD-MM-YY HH:mm:ss');

        return (
          <div className={`customers-log__item ${index % 2 == 0 ? 'alt' : ''}`}>
            <div>
              {group.customer.firstName} {group.customer.lastName}
            </div>
            <div>{balance}</div>
            <div>{group.inventory.items[0].text}</div>
            <div>{price}</div>
            <div>{date}</div>
          </div>
        );
      })
    );
  };

  return (
    <div>
      <div className='customers-log header'>{renderHeader()}</div>
      <div>{renderBody()}</div>
    </div>
  );
};
export default DWaitingRequests;
