import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment';
import { tdItem, tdOpacityVariant } from '../variations';
import { formatMoney } from '../../../../utils/formatting';
import FormModel from '../../../FormModel/FormModel';
import { updateGroup } from '../../../../actions/customersActions';

const RetraitsRequests = (props) => {
  const { headers } = props;
  const [groups, setGroups] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const getFilterdGroup = () => {
    return props.customer.inventories.filter((x) => x.status === 2);
  };

  useEffect(() => {
    const groups = getFilterdGroup();
    setGroups(groups);
  }, []);

  useEffect(() => {
    const groups = getFilterdGroup();
    setGroups(groups);
  }, [props.customer.inventories.length]);

  useEffect(() => {
    const newGroups = props.customer.inventories
      .filter((x) => x.status === 2)
      .map((group) => ({ _id: group._id, inventory: group.inventory }));
    setGroups(newGroups);
    console.log('customers', newGroups);
  }, [props.customer]);

  const renderHeaders = () => {
    return (
      headers &&
      headers.map((header) => {
        return <th>{header}</th>;
      })
    );
  };

  const moveToMaCave = () => {
    const temp = { ...currentGroup, status: 1 };
    setIsVisible(false);
    props.updateGroup(temp, { status: 1 });
  };

  const loadMaCaveModel = (group) => {
    setCurrentGroup(group);
    setIsVisible(true);
  };
  const renderInventory = () => {
    return (
      groups &&
      groups.map((group) => {
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
            <td
              className='home-page-container__add-item textCenter bg-in-warning'
              onClick={() => loadMaCaveModel(group)}
            >
              Annuler
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
            <th className='textCenter'>Action</th>
          </tr>
        </thead>
        <tbody>{renderInventory()}</tbody>
      </table>
      <FormModel isVisible={isVisible}>
        <div className='home-page-container__customer_add_item'>
          <h2 className='add-item-header'>CONFIRMATION REQUISE</h2>
          <p>effectuer le retrait</p>
          <div className='add-item-buttons'>
            <button className='button bg-success' onClick={moveToMaCave}>
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

export default connect(mapStateToProps, { updateGroup })(RetraitsRequests);
