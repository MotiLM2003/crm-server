import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';

import SelectHeaders from './SelectHeaders/SelectHeaders';

import api from '../../../../apis/api';

const ManageHeaders = () => {
  const [headers, setHeaders] = useState(null);
  const [currentHeader, setCurrentHeader] = useState('-1');
  const inputRef = useRef();

  const getHeaders = async () => {
    try {
      const { data } = await api.get('/headers/get-headers', {});
      setHeaders(data.headers);
    } catch (err) {
      console.log('error', err);
    }
  };

  const deleteHeader = async (header) => {
    const { data } = await api.post('/headers/remove-header', { header });
  };

  const createHeader = async (header) => {
    try {
      const { data } = await api.post('/headers/add-header', { header });
    } catch (err) {
      console.log(err);
    }
  };

  // on headers select changed.
  const onChange = (e) => {
    const value = e.target.value;
    setCurrentHeader(value);
  };

  const onCreateHeader = () => {
    const value = inputRef.current.value;
    if (!value) {
      toast.error('🐛 You must provide an Header title.');
    }
    try {
      createHeader(value);
      const temp = [...headers, value];
      setHeaders(temp);
      inputRef.current.value = '';
      toast.success('👍 New inventory header created!');
    } catch (e) {
      toast.error('👎 Something went wrong.');
      console.log(e);
    }
  };

  // on trash clicked
  const onDelete = (e) => {
    const header = headers[parseInt(currentHeader)];
    try {
      deleteHeader(header);
      setHeaders(headers.filter((itemHeader) => itemHeader !== header));
      toast.success('👍 Inventory header deleted!');
    } catch (e) {
      toast.error('👎 Something went wrong.');
      console.log(e);
    }
  };
  // framer motion variants;
  const inputVariant = {
    hidden: {
      scale: 0,
    },
    show: { scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const trashVariant = {
    hidden: {
      opacity: 0,
    },
    show: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
    exit: { opacity: 0, transition: { delay: 0, duration: 0.1 } },
    transition: {
      duration: 500,
    },
  };

  useEffect(() => {
    getHeaders();
  }, []);

  const renderToolbar = () => {
    return (
      <section className='manage-inventory__toolbar'>
        <div>
          {headers && <SelectHeaders headers={headers} onChange={onChange} />}
        </div>
        <AnimatePresence>
          {currentHeader === '-1' && (
            <motion.div
              variants={inputVariant}
              initial='hidden'
              animate='show'
              exit='exit'
              className='manage-inventory__add-header'
            >
              <input type='text' ref={inputRef} />
              <button className='button bg-success' onClick={onCreateHeader}>
                Create Header
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {parseInt(currentHeader) > -1 && (
            <motion.div
              variants={trashVariant}
              initial='hidden'
              animate='show'
              exit='exit'
            >
              <i
                className='fas fa-trash-alt manage-inventory__trash button'
                onClick={onDelete}
              ></i>
            </motion.div>
          )}
        </AnimatePresence>

        <div> </div>
      </section>
    );
  };

  return (
    <div>
      {renderToolbar()}
      <ToastContainer position='bottom-left' autoClose={2500} />
    </div>
  );
};

export default ManageHeaders;
