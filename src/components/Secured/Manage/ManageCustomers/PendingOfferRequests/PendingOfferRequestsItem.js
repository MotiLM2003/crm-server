import React, { useState, useEffect, useRef } from 'react';
import { formatMoney } from '../../../../../utils/formatting';
import moment from 'moment';

const PendingOfferRequestsItem = ({
  group,
  createOffer,
  showOffers,
  index,
  deleteOrder,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.addEventListener('focus', (e) => e.target.select());

    return () => {
      inputRef?.current?.removeEventListener('focus', (e) => e.target.select());
    };
  }, []);
  const price = formatMoney(group.inventory.items[3].text);
  const balance = formatMoney(group.customer.balance);
  const date = moment(group.expiration).format('DD-MM-YY HH:mm:ss');

  const renderBody = () => {
    return (
      <div
        key={group._id}
        className={`customers-log__item ${index % 2 == 0 ? 'alt' : ''}`}
      >
        <div>
          {group.customer.firstName} {group.customer.lastName}
        </div>
        <div>{balance}</div>
        <div>{group.inventory.items[0].text}</div>
        <div>{price}</div>
        <div>{group.offers.length}</div>
        <div>{date}</div>

        <div className={`pending-requests__buttons`}>
          <div className={`pending-requests__buttons`}>
            <input
              type='text'
              defaultValue={group.inventory.items[3].text}
              ref={inputRef}
            />
            <button
              className='button bg-success'
              onClick={() => createOffer(group, inputRef.current.value)}
            >
              Create offer
            </button>
          </div>
          <button className='button bg-info' onClick={() => showOffers(group)}>
            Show offers
          </button>
          <button
            className='button bg-warning'
            onClick={() => deleteOrder(group)}
          >
            Delete order
          </button>
        </div>
      </div>
    );
  };

  return renderBody();
};

export default PendingOfferRequestsItem;
