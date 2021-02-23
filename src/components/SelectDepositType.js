import React from 'react';
import { deposits } from '../utils/static_data';

const SelectDepositType = ({
  name = 'deposit',
  value,
  onChange,
  withAnyOption = true,
}) => {
  return (
    <select value={value} onChange={onChange} name={name}>
      {withAnyOption && <option value='-1'>-- Select --</option>}
      {deposits.map((deposit, index) => (
        <option key={index} value={index}>
          {deposit}
        </option>
      ))}
    </select>
  );
};

export default SelectDepositType;
