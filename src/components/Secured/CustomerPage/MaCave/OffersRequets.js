import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { tdItem, tdOpacityVariant } from '../variations';
import { formatMoney } from '../../../../utils/formatting';
import {
  deleteInventoryOffer,
  updateGroup,
  updateBalance,
} from '../../../../actions/customersActions';

const OffersRequets = (props) => {
  const { headers } = props;
  const [currentGroups, setCurrentGroups] = useState(null);

  const getFilterdGroup = () => {
    return props.customer.inventories.filter((x) => x.status === 1);
  };

  useEffect(() => {
    const groups = getFilterdGroup();
    setCurrentGroups(groups);
  }, []);

  useEffect(() => {
    const groups = getFilterdGroup();
    setCurrentGroups(groups);
  }, [props.customer]);

  const deleteOffer = (group, offerId) => {
    props.deleteInventoryOffer({ group, offerId });
  };

  const acceptOffer = (group, offer) => {
    console.log(group);
    const balance = offer.offer;
    props.updateGroup(group, { status: 3 });
    props.updateBalance(props.customer._id, balance);
    // setCurrentGroups(getFilterdGroup());
  };

  const renderHeaders = () => {
    return (
      headers && (
        <tr>
          <th>{headers[0]}</th>
          <th>{headers[1]}</th>
          <th>{headers[2]}</th>
          <th>Prix d'achat</th>
          <th>Prix de l'offre</th>
          <th>Expiration</th>
          <th colspan='2'>Action</th>
        </tr>
      )
    );
  };

  const renderInventory = () => {
    console.log('rendering');
    return (
      currentGroups &&
      currentGroups.map((group) => {
        const date = moment(group.createdAt).format('DD-MM-YY HH:mm:ss');
        return (
          //   <motion.tr key={group._id} variants={tdItem}>
          //     {group.inventory.items.map((item, index) => {
          //       let text = item.text;
          //       if (index === 3) {
          //         text = formatMoney(item.text);
          //       }
          //       return (
          //         <AnimatePresence>
          //           <motion.td variants={tdOpacityVariant}>{`${text}`}</motion.td>
          //         </AnimatePresence>
          //       );
          //     })}
          //     <td className='home-page-container__add-item' onClick={() => {}}>
          //       {date}
          //     </td>
          //   </motion.tr>
          group.offers.map((offer) => {
            return (
              <tr key={offer._id}>
                <td>{group.inventory.items[0].text}</td>
                <td>{group.inventory.items[1].text}</td>
                <td>{group.inventory.items[2].text}</td>
                <td>{formatMoney(offer.price)}</td>
                <td>{formatMoney(offer.offer)}</td>
                <td>{date}</td>
                <td
                  className='home-page-container__add-item bg-in-success'
                  onClick={() => acceptOffer(group, offer)}
                >
                  Accept
                </td>
                <td
                  className='home-page-container__add-item bg-in-warning'
                  onClick={() => deleteOffer(group, offer._id)}
                >
                  Reject
                </td>
              </tr>
            );
          })
        );
      })
    );
  };

  return (
    <div>
      <table className='cards-container__inventory-list'>
        <thead>{renderHeaders()}</thead>
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

export default connect(mapStateToProps, {
  deleteInventoryOffer,
  updateGroup,
  updateBalance,
})(OffersRequets);
