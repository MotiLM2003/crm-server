import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import moment from 'moment';
import { tdItem, tdOpacityVariant } from '../variations';
import { formatMoney } from '../../../../utils/formatting';
const WaitingInventoryRequets = (props) => {
  const { headers } = props;
  const [currentGroups, setCurrentGroups] = useState(null);

  const getFilterdGroup = () => {
    return props.customer.inventories.filter((x) => x.status === 0);
  };

  useEffect(() => {
    const groups = getFilterdGroup();
    setCurrentGroups(groups);
  }, []);

  useEffect(() => {
    const groups = getFilterdGroup();
    setCurrentGroups(groups);
  }, [props.customer.inventories.length]);
  const renderHeaders = () => {
    return (
      headers &&
      headers.map((header) => {
        return <th>{header}</th>;
      })
    );
  };

  const renderInventory = () => {
    return (
      currentGroups &&
      currentGroups.map((group) => {
        const date = moment(group.createdAt).format('DD-MM-YY HH:mm:ss');
        return (
          <motion.tr key={group._id} variants={tdItem}>
            {group.inventory.items.map((item, index) => {
              let text = item.text;
              if (index === 3) {
                text = formatMoney(item.text);
              }
              return (
                <AnimatePresence>
                  <motion.td variants={tdOpacityVariant}>{`${text}`}</motion.td>
                </AnimatePresence>
              );
            })}
            <td className='home-page-container__add-item' onClick={() => {}}>
              {date}
            </td>
          </motion.tr>
        );
      })
    );
  };

  return (
    <div>
      <table className='cards-container__inventory-list'>
        <thead>
          <tr>
            {renderHeaders()}
            <th>Expiration</th>
          </tr>
        </thead>
        <tbody>{renderInventory()}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};

export default connect(mapStateToProps)(WaitingInventoryRequets);
