import React from 'react';

const SelectHeaders = ({
  headers,
  name,
  value,
  onChange,
  withAnyOption = true,
}) => {
  return (
    <select value={value} onChange={onChange} name={name}>
      {withAnyOption && <option value='-1'>-- Create Header --</option>}
      {headers.map((header, index) => (
        <option key={index} value={index}>
          {header}
        </option>
      ))}
    </select>
  );
};

export default SelectHeaders;
