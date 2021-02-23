import React from 'react';
import moment from 'moment';
const CustomerLogItem = ({ log, index }) => {
  const date =
    index === -1 ? 'Date' : moment(log.createdAt).format('DD-MM-YYYY HH:mm:ss');
  const ownerName = log.owner
    ? `${log.owner.firstName} ${log.owner.lastName}`
    : 'UnControlled';
  return !log.customer ? null : (
    <div className={`customers-log__item ${index % 2 == 0 ? 'alt' : ''}`}>
      <div>{date}</div>
      <div>
        {log.customer.firstName} {log.customer.lastName}
      </div>
      <div>{ownerName}</div>
    </div>
  );
};

export default CustomerLogItem;
