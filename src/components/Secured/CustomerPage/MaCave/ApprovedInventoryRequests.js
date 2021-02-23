import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { tdItem, tdOpacityVariant } from '../variations';
import { formatMoney } from '../../../../utils/formatting';
import { updateGroup } from '../../../../actions/customersActions';
import FormModel from '../../../FormModel/FormModel';

const ApprovedInventoryRequests = (props) => {
  const { headers } = props;
  const [groups, setGroups] = useState(null);
  const [currentGroup, setCurentGroups] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const groups = props.customer.inventories
      .filter((x) => x.status === 1)
      .map((group) => group.inventory);
    setGroups(groups);
    console.log(' effect', groups);
  }, []);

  useEffect(() => {
    const newGroups = props.customer.inventories
      .filter((x) => x.status === 1)
      .map((group) => ({ _id: group._id, inventory: group.inventory }));
    setGroups(newGroups);
  }, [props.customer]);

  const loadRetraitsModal = (group) => {
    setCurentGroups(group);
    setIsVisible(true);
  };
  const renderHeaders = () => {
    return (
      headers &&
      headers.map((header) => {
        return <th>{header}</th>;
      })
    );
  };

  const moveToRetrait = () => {
    const temp = { ...currentGroup, status: 2 };
    console.log(temp._id);
    setIsVisible(false);
    props.updateGroup(temp, { status: 2 });
  };

  const renderInventory = () => {
    return (
      groups &&
      groups.map((group) => {
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
            <td
              className='home-page-container__add-item'
              onClick={() => loadRetraitsModal(group)}
            >
              Retraits
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderInventory()}</tbody>
      </table>
      <FormModel isVisible={isVisible}>
        <div className='home-page-container__customer_add_item'>
          <h2 className='add-item-header'>CONFIRMATION REQUISE</h2>
          <p>effectuer le retrait</p>
          <div className='add-item-buttons'>
            <button className='button bg-success' onClick={moveToRetrait}>
              Qui
            </button>
            <button
              className='button bg-warning'
              onClick={() => {
                setIsVisible(false);
              }}
            >
              Non
            </button>
          </div>
        </div>
      </FormModel>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};

export default connect(mapStateToProps, { updateGroup })(
  ApprovedInventoryRequests
);
