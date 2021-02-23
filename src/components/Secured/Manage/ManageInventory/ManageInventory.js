import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import api from '../../../../apis/api';
import ManageInventoryItems from './ManageInventoryItems';
const ManageInventory = () => {
  const [groups, setGroups] = useState(null);
  const [headers, setHeaders] = useState(null);

  const setGroupItems = async (newItems, groupId) => {
    groups.map((group) => {
      if (group._id === groupId) {
        group.items = [...newItems];
      }

      return group;
    });

  };

  const getHeaders = async () => {
    try {
      const { data } = await api.get('/headers/get-headers', {});
      setHeaders(data.headers);
    } catch (err) {
      console.log('error', err);
    }
  };

  const getGroups = async () => {
    try {
      const { data } = await api.get('/inventroy/get-groups', {});
      setGroups(data);
    } catch (err) {
      console.log('error', err);
    }
  };

  const deleteGroup = async (group) => {
    const id = group.id;

    const { data } = await api.get(`/inventroy/delete-group/${id}`);
    setGroups(groups.filter((x) => x._id !== id));

    toast.warning(`👍 Group ${group.items[0].text} deleted.`);
  };

  const createGroup = async (group) => {
    try {
      const { data } = await api.post('/inventroy/save', group);
      setGroups([...groups, data]);
      toast.success('👍 New inventory group created.');
    } catch (err) {
      toast.error('👎 Something went wrong.');
      console.log('error', err);
    }
  };

  const editGroup = async (id) => {
    const group = groups.find((g) => g._id === id);
    const { data } = await api.patch(`/inventroy/update-group/${id}`, {
      items: group.items,
    });

    toast.success(`👍 ${group.items[0].text} successfully updated.`);
  };

  const inputChanged = (e, group) => {
    setGroups(
      groups.map((item) => {
        // return unchanged item.
        if (item._id !== group._id) return item;

        // updating group name and return it.
        item.name = e.target.value;
        return item;
      })
    );
  };

  useEffect(() => {
    getHeaders();
    getGroups();
  }, []);

  //  Rendring methods
  const renderGroupsHeader = () => {
    return (
      <div className='manage-inventory__item'>
        <div className='w-150'>Created</div>

        {headers &&
          headers.map((header) => {
            return <div className='w-200'>{header}</div>;
          })}
        <div className='w-50'>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
    );
  };
  const renderGroups = () => {
    return (
      groups &&
      groups.map((group) => {
        const date = moment(group.cretedAt).format('DD-MM-YY HH:mm:ss');
        return (
          <div className='manage-inventory__item'>
            <div className='w-150'>{date}</div>

            {headers && (
              <ManageInventoryItems
                headers={headers}
                group={group}
                setGroupItems={setGroupItems}
              />
            )}
            <div className='w-50' onClick={() => editGroup(group._id)}>
              <i className='far fa-edit manage-inventory__trash'> </i>
            </div>
            <div onClick={() => deleteGroup(group)}>
              <i className='fas fa-trash-alt manage-inventory__trash'></i>
            </div>
          </div>
        );
      })
    );
  };

  const onCreateGroups = () => {
    const group = {
      'isActive': true,
      'itemsGroup': [],
      'name': '',
      'items': headers.map((header) => ({ text: header })),
    };

    createGroup(group);
  };

  const inputVariant = {
    hidden: {
      scale: 0,
    },
    show: { scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const renderToolbar = () => {
    return (
      <section className='manage-inventory__toolbar'>
        <AnimatePresence>
          <motion.div
            variants={inputVariant}
            initial='hidden'
            animate='show'
            exit='exit'
            className='manage-inventory__add-header'
          >
            <button className='button bg-success' onClick={onCreateGroups}>
              Create an item
            </button>
          </motion.div>
        </AnimatePresence>

        <div> </div>
      </section>
    );
  };

  return (
    <div className='manage-inventory'>
      {renderToolbar()}

      <div className='manage-inventory__container'>
        <div className='manage-inventory__groups'>
          {renderGroupsHeader()}
          {renderGroups()}
        </div>
      </div>
      <ToastContainer position='bottom-left' autoClose={2500} />
    </div>
  );
};

export default ManageInventory;
