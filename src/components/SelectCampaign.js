import React from 'react';
import { campaigns } from '../utils/static_data';
const SelectCampaign = ({ value, onChange, name, withDefault = true }) => {
  return (
    <select value={value} onChange={onChange} name={name}>
      {withDefault && <option value='-1'>-- Any campaign --</option>}
      {campaigns.map((campaign, index) => (
        <option key={index} value={index}>
          {campaign}
        </option>
      ))}
    </select>
  );
};

export default SelectCampaign;
