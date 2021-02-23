import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import SelectCampaign from '../../SelectCampaign';
import SelectStatus from '../../SelectStatus';
import SelectCountry from '../../SelectCountry';

const Filters = ({
  filters,
  setFilters,
  fnRef,
  filtersChanged,
  lnRef,
  phRef,
  emRef,
  showCheckbox,
}) => {
  return (
    <tr className='bg-white'>
      {showCheckbox && <th>&nbsp;</th>}

      <th rowSpan='1' colSpan='1' className='customers__search-dates'>
        <div>
          <DatePicker
            selected={filters.startDate}
            onChange={(date) => setFilters({ ...filters, startDate: date })}
          />
        </div>
        <div>
          <DatePicker
            selected={filters.endDate}
            onChange={(date) => setFilters({ ...filters, endDate: date })}
          />
        </div>
      </th>
      <th rowSpan='1' colSpan='1'>
        <div>
          <input
            ref={fnRef}
            type='text'
            name='firstName'
            onChange={filtersChanged}
          />
        </div>
      </th>
      <th rowSpan='1' colSpan='1'>
        <div>
          <input
            type='text'
            ref={lnRef}
            name='lastName'
            onChange={filtersChanged}
          />
        </div>
      </th>
      <th rowSpan='1' colSpan='1'>
        <div>
          <input
            type='text'
            ref={phRef}
            name='phone'
            onChange={filtersChanged}
          />
        </div>
      </th>
      <th>
        <SelectStatus
          value={filters.status}
          onChange={filtersChanged}
          name='status'
        />
      </th>
      <th rowSpan='1' colSpan='1'>
        <div>
          <input
            type='text'
            name='email'
            ref={emRef}
            onChange={filtersChanged}
          />
        </div>
      </th>
      <th>
        <SelectCountry value={filters.country} onChange={filtersChanged} />
      </th>
      <th>&nbsp;</th>
      <th className='customers__search-buttons'>
        <div></div>
        <div></div>
      </th>
      <th>
        <SelectCampaign
          value={filters.campaign}
          onChange={filtersChanged}
          name='campaign'
        />
      </th>
      <th>&nbsp; </th>
    </tr>
  );
};

export default Filters;
