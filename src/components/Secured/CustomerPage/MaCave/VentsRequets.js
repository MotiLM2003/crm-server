import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { tdItem, tdOpacityVariant } from '../variations';
import { formatMoney } from '../../../../utils/formatting';
import {
  deleteInventoryOffer,
  updateGroup,
} from '../../../../actions/customersActions';

const VentsRequets = (props) => {
  const { headers } = props;
  const [groups, setGroups] = useState(null);

  const getFilterdGroup = () => {
    return props.customer.inventories.filter((x) => x.status === 3);
  };

  useEffect(() => {
    const groups = getFilterdGroup();
    setGroups(groups);
  }, []);

  useEffect(() => {
    const groups = getFilterdGroup();
    setGroups(groups);
  }, [props.customer]);

  const renderHeaders = () => {
    return (
      headers && (
        <tr>
          <th>{headers[0]}</th>
          <th>{headers[1]}</th>
          <th>{headers[2]}</th>
          <th>Prix d'achat</th>
          <th>Prix de l'offre</th>
          <th className='textCenter'>Bénéfices</th>
          <th className='textCenter'>Statut</th>
        </tr>
      )
    );
  };

  const renderInventory = () => {
    console.log('rendering');
    return (
      groups &&
      groups.map((group) => {
        const date = moment(group.createdAt).format('DD-MM-YY HH:mm:ss');
        const offer = group.offers[0];
        console.log('offer', offer);
        const benefits = parseInt(offer.offer) - parseInt(offer.price);

        return (
          <tr key={offer._id}>
            <td>{group.inventory.items[0].text}</td>
            <td>{group.inventory.items[1].text}</td>
            <td>{group.inventory.items[2].text}</td>
            <td>{formatMoney(offer.price)}</td>
            <td>{formatMoney(offer.offer)}</td>
            <td className='textCenter'>{formatMoney(benefits)}</td>
            <td className='home-page-container__add-item textCenter'>{date}</td>
          </tr>
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

export default connect(mapStateToProps)(VentsRequets);
