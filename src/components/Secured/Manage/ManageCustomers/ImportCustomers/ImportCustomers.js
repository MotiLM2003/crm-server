import React, { useState, useEffect } from 'react';
import DropZone from '../../../Custom/DropZone/DropZone';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';

import { newCustomer } from '../../../../../utils/models';
import { statuses } from '../../../../../utils/static_data';
import SellerDropdown from '../../../Custom/SellerDropdown/SellerDropdown';
import SelectCountry from '../../../../SelectCountry';
import SelectCampaign from '../../../../SelectCampaign';
import api from '../../../../../apis/api';

const ImportCustomers = () => {
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    ...newCustomer,
    campaignName: 'nat',
    ownerName: '-- UnControlled --',
    campaign: 0,
  });
  const [fileId, setFileId] = useState(null);
  const [sellers, setSellers] = useState(null);
  const onSetUsers = (newUsers) => {
    setUsers(newUsers.users);
    setFileId(newUsers.id);
  };

  const container = {
    hidden: { y: '-20vh', opacity: 0 },
    show: {
      y: 0,
      opacity: 1,

      transition: {
        type: 'spring',
        bounce: 0.35,
      },
    },
  };

  const noFilesVariant = {
    hidden: { opacity: 0, scale: 0 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        bounce: 0.25,
        stiffness: 50,
      },
    },
  };

  const inputChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    const ownerName = e.target.options[e.target.selectedIndex].text;
    if (name === 'owner' && value === '0') {
      value = undefined;
    }
    if (name === 'owner') {
      setCurrentUser({
        ...currentUser,
        [e.target.name]: value,
        ownerName: ownerName,
      });
    } else {
      setCurrentUser({
        ...currentUser,
        [e.target.name]: value,
        campaignName: ownerName,
      });
    }
  };

  const canceelUpload = () => {
    setUsers(null);
  };
  const createCustomers = async () => {
    const payload = {
      fileId,
      owner: currentUser.owner,
      campaign: currentUser.campaign,
    };
    try {
      const { data } = await api.post(
        'files//execute-import-customers',
        payload
      );
      setUsers(null);
      toast.success(`😍 ${data.length} Customers created.`, {
        position: 'bottom-left',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: false,
      });
    } catch (err) {}
  };
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await api.get('users/');
        setSellers(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, []);
  const renderUserContent = () => {
    return (
      users && (
        <motion.div
          className='import-customers__list'
          className='customers__table'
          variants={container}
          initial='hidden'
          animate='show'
        >
          <div className={`import-customers__item bg-info`}>
            <div style={{ width: '1rem' }}>#</div>
            <div>First name</div>
            <div>Last name</div>
            <div>Phone</div>
            <div>Email</div>
            <div>Country</div>
            <div>Status</div>
            <div>owner</div>
            <div>campgin</div>
          </div>

          {users.map((user, index) => {
            return (
              <div
                className={`import-customers__item ${
                  index % 2 === 0 ? ' alt' : ''
                }`}
              >
                <div style={{ width: '1rem' }}>{index + 1}</div>
                <div>{user.firstName}</div>
                <div>{user.firstName}</div>
                <div>{user.phone}</div>
                <div>{user.email}</div>
                <div>{user.country}</div>
                <div>{statuses[user.status]}</div>
                <div>{currentUser.ownerName}</div>
                <div>{currentUser.campaignName}</div>
              </div>
            );
          })}

          <div>
            <button className='button bg-success' onClick={createCustomers}>
              Confirm
            </button>
            <button className='button bg-warning' onClick={canceelUpload}>
              Cancel
            </button>
          </div>
        </motion.div>
      )
    );
  };

  const renderToolbar = () => {
    return (
      users && (
        <div className='import-customers__toolbar'>
          Seller:
          <SellerDropdown
            className='seller-dropdown'
            users={sellers}
            onUserChange={inputChange}
            currentUser={currentUser}
            defaultText='-- UnControlled --'
            withSellerTitle={false}
          />
          Campaign:
          <SelectCampaign
            value={currentUser.campaign}
            name='campaign'
            onChange={inputChange}
            withDefault={false}
          />
        </div>
      )
    );
  };

  const renderNoUpload = () => {
    return (
      !users && (
        <motion.div
          variants={noFilesVariant}
          initial='hidden'
          animate='show'
          className='import-customers__no-upload'
        >
          No files uploaded
        </motion.div>
      )
    );
  };

  return (
    <div className='import-customers'>
      <div>
        <DropZone onResponse={onSetUsers} />
      </div>
      <div className='import-customers__content'>
        {renderNoUpload()}
        {renderToolbar()}
        {renderUserContent()}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ImportCustomers;
