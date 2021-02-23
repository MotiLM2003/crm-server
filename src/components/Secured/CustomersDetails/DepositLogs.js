import React from 'react';
import { deposits } from '../../../utils//static_data';
import moment from 'moment';
import { formatMoney } from '../../../utils/formatting';
const DepositLogs = ({ logs }) => {
  return (
    <div className='deposits__logs'>
      <div className='deposits__logs-header'>Deposit Logs</div>
      <div className='deposits__logs-content'>
        <div className='deposits__log-item deposits__log-item-header'>
          <div>Created at</div>
          <div>Type</div>
          <div>Amount</div>
          <div>Method</div>
          <div>By</div>
        </div>
        {logs &&
          logs.map((log, index) => {
            return (
              <div
                key={index}
                className={`deposits__log-item ${index % 2 === 0 ? 'alt' : ''}`}
              >
                <div>{moment(log.createdAt).format('DD-MM-YY HH:mm:ss')}</div>
                <div>{deposits[log.depositType]}</div>
                <div>{formatMoney(log.amount)}</div>
                <div>{log.method}</div>
                <div>{`${log.user?.firstName} ${log.user?.lastName}`}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DepositLogs;
