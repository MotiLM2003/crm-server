import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import SelectDepositType from '../../SelectDepositType';
import api from '../../../apis/api';
import { connect } from 'react-redux';
import { newDeposit as depoistModal } from '../../../utils/models';

import DepositLogs from './DepositLogs';
const Deposits = ({ customer, user }) => {
  let newDeposit = {};
  const [deposit, setDeposit] = useState(newDeposit);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState(null);

  useEffect(() => {
    const getLogs = async () => {
      const { data } = await api.get(
        `/deposit-logs/get-by-customer/${customer.id}`
      );

      console.log('data', data);
      setLogs(data);
    };
    newDeposit = {
      ...depoistModal,
      amount: '',
      isWithDeposit: false,
      customer: customer._id,
      user: user._id,
    };
    setDeposit(newDeposit);

    getLogs();
  }, []);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDeposit({ ...deposit, [name]: value });
  };

  const resetNewDeposit = () => {
    setDeposit({
      ...depoistModal,
      isWithDeposit: false,
      customer: customer._id,
      user: user._id,
      amount: '',
    });
  };

  const validate = () => {
    let isValid = true;
    if (deposit.amount === 0) isValid = false;
    if (deposit.depositType.toString() === '-1') isValid = false;
    if (deposit.method === '') isValid = false;
    if (!isValid) {
      setError('Please feel all  fields.');
    }

    return isValid;
  };

  const addNewdeposit = async () => {
    setError(null);
    if (!validate()) {
      toast.error('😡 Please fill all  fields');
      return;
    }
    let { data } = await api.post('/deposit-logs/save', deposit);
    if (deposit.isWithDeposit) {
      const { depositData } = await api.patch('/customers/deposit/', {
        _id: customer.id,
        amount: deposit.amount,
      });
    }

    resetNewDeposit();
    data = { ...data, user: user };
    setLogs([...logs, data]);
    toast.success('😍 New deposit log added.');
  };

  const isChecked = deposit.isWithDeposit;
  return (
    <div className='deposits'>
      <div className='deposits__add-new-deposit'>
        <div className='deposits__add'>
          <div className='deposits__add-header'>New Deposit</div>
          <div>
            <input
              name='isWithDeposit'
              type='checkbox'
              id='real-deposit'
              checked={deposit.isWithDeposit}
              onChange={(e) => {
                setDeposit({ ...deposit, isWithDeposit: e.target.checked });
              }}
            />
            <label for='real-deposit'> With real Deposit</label>
          </div>
          <div>
            <SelectDepositType
              value={deposit.depositType}
              name='depositType'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='number'
              value={deposit.amount}
              name='amount'
              placeholder='Amount'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='text'
              name='method'
              placeholder='Payment method'
              value={deposit.method}
              onChange={onChange}
            />
          </div>
          <div className='deposits__buttons'>
            <button className='button bg-warning' onClick={resetNewDeposit}>
              Cancel
            </button>
            <button className='button bg-success' onClick={addNewdeposit}>
              Deposit
            </button>
          </div>
        </div>

        {error && (
          <div className='deposits__new-despoit-errors bg-warning '>
            {error}
          </div>
        )}
      </div>

      <DepositLogs logs={logs} />

      <ToastContainer position='bottom-left' autoClose={2500} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(Deposits);
