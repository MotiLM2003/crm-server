import React, { useState, useEffect } from 'react';
import api from '../../../../../apis/api';
import PendingOfferRequestsItem from './PendingOfferRequestsItem';
import { formatMoney } from '../../../../../utils/formatting';
import { ToastContainer, toast } from 'react-toastify';
import { uid } from 'uid';

const PendingOfferRequests = () => {
  const [groups, setGroups] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);

  const addOffer = async (id, updates) => {
    const { data } = api.post(
      `/customers-inventory/push-offers/${id}`,
      updates
    );
  };
  useEffect(() => {
    const getData = async (req, res) => {
      const { data } = await api.post('customers-inventory/get', {
        status: 1,
      });

      setGroups(data);
    };
    getData();
  }, []);

  useEffect(() => {}, [groups]);

  const createOffer = async (group, offer) => {
    const temp = groups.map((g) => {
      if (g._id === group._id) {
        const price = group.inventory.items[3].text;
        const data = { _id: uid(16), price, offer };
        g.offers.push(data);
        addOffer(g._id, data);

        toast.success('👍 New offer created.');
      }
      return g;
    });
    setGroups(temp);
    setCurrentGroup(group);
  };

  const showOffers = (group) => {
    setCurrentGroup(group);
  };

  const deleteOrder = async (group) => {
    const { data } = await api.delete(
      `customers-inventory/delete/${group._id}`
    );
    setGroups(groups.filter((g) => g._id !== group._id));
    toast.success('👍 Order deleted.');
  };

  const deleteOffer = (group, offer) => {
    group.offers = group.offers.filter((x) => x._id !== offer._id);

    setGroups(groups.map((g) => (g._id == group._id ? group : g)));
    toast.success('👍 Offer deleted.');
  };
  const renderHeader = () => {
    return (
      <div className={`customers-log__item header `}>
        <div>Customer</div>
        <div>Balance</div>
        <div>Product</div>
        <div>Price</div>
        <div>Offers</div>
        <div>Expiration</div>
        <div className={`pending-requests__buttons`}>Actions</div>
      </div>
    );
  };

  const renderBody = () => {
    return (
      groups &&
      groups.map((group, index) => {
        return (
          <PendingOfferRequestsItem
            group={group}
            showOffers={showOffers}
            createOffer={createOffer}
            index={index}
            deleteOrder={deleteOrder}
          />
        );
      })
    );
  };
  const renderOffersList = () => {
    if (!currentGroup) {
      return (
        <div className='pending-orders__no-offers'>Please select an order</div>
      );
    } else if (currentGroup.offers.length === 0) {
      return <div className='pending-orders__no-offers'>No offers found</div>;
    } else {
      return (
        <div>
          <div className='pending-orders__order-list'>
            <div className='w-50'>#</div>
            <div className='w-150'>Original price</div>
            <div className='w-150'>Offer</div>
            <div className='w-150'>Actions</div>
          </div>
          {currentGroup.offers.map((offer, index) => {
            return (
              <div className='pending-orders__order-list'>
                <div class='w-50'>{index + 1}.</div>
                <div className='w-150'>{formatMoney(offer.price)}</div>
                <div className='w-150'>{formatMoney(offer.offer)}</div>
                <div className='w-150'>
                  <button
                    className='button bg-warning'
                    onClick={() => deleteOffer(currentGroup, offer)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className='pending-requests'>
      <div className='pending-requests__orders-list'>
        <div className='customers-log header'>{renderHeader()}</div>
        <div>{renderBody()}</div>
      </div>
      <div className='pending-orders'>
        <div className='pending-orders__header'>
          <div>Offers list</div>
        </div>
        <div>{renderOffersList()}</div>
      </div>
      <ToastContainer position='bottom-left' autoClose={2500} />
    </div>
  );
};

export default PendingOfferRequests;
