import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CustomerLogItem from './CustomerLogItem';
import api from '../../../../apis/api';

const CustomersLogs = (props) => {
  const [logs, setLogs] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const filters = {};
      if (props.user.role.type.toLowerCase() !== 'admin') {
        filters.owner = props.user._id;
      }
      const { data } = await api.post('/customers-logs/get', filters);
      setLogs(data);
    };
    getData();
  }, []);

  const renderLogsHeader = () => {
    return (
      logs && (
        <CustomerLogItem
          log={{
            createdAt: 'Date',
            customer: { firstName: 'Customer', lastName: '' },
            owner: { firstName: 'Seller', lastName: '' },
          }}
          index={-1}
        />
      )
    );
  };
  const renderLogs = () => {
    return (
      logs &&
      logs.map((log, index) => {
        return <CustomerLogItem log={log} index={index} />;
      })
    );
  };

  return (
    <div>
      <div className='customers-log header'>{renderLogsHeader()}</div>
      <div className='customers-log'>{renderLogs()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.userReducer };
};

export default connect(mapStateToProps)(CustomersLogs);
