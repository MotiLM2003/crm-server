import React, { useState, useEffect } from 'react';
import api from '../../../apis/api';
import moment from 'moment';

const SwitchCustomerLogs = ({ customer }) => {
  const [logs, setLogs] = useState(null);
  const getLogs = async () => {
    const { data } = await api.get(
      `/customers-switch/get-by-customer/${customer._id}`
    );
    setLogs(data);
  };

  useEffect(() => {
    getLogs();
  }, []);

  const renderHeaders = () => {
    return (
      logs && (
        <div className='customers-details__history header'>
          <div className='w-200'>Date</div>
          <div className='w-200'>From</div>
          <div className='w-200'>To</div>
        </div>
      )
    );
  };

  const renderLogs = () => {
    return (
      logs &&
      logs.map((log) => {
        console.log(log.ownerFrom);
        const date = moment(log.createdAt).format('DD-MM-YY HH:mm:ss');
        return (
          <div key={log._id} className='customers-details__history'>
            <div className='w-200'>{date}</div>
            <div className='w-200'>
              {log.ownerFrom
                ? `${log.ownerFrom.firstName} ${log.ownerFrom.lastName}`
                : 'unCotrolled'}
            </div>
            <div className='w-200'>
              {log.ownerTo
                ? `${log.ownerTo.firstName} ${log.ownerTo.lastName}`
                : 'unCotrolled'}
            </div>
          </div>
        );
      })
    );
  };
  return (
    <div>
      {renderHeaders()}
      {renderLogs()}
    </div>
  );
};

export default SwitchCustomerLogs;
