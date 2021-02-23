import React, { useEffect } from 'react';
import Loader from '../../Loader/Loader';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import api from '../../../apis/api';

import CustomerLogs from './DCustomersLogs/CustomersLogs';
import DWaitingRequests from './NewPending/DWaitingRequests';

import { containerVariants, itemVariants } from './variants';

const Dashboard = (props) => {
  useEffect(() => {
    document.title = 'Champagne Deutz - Dashboard';
  }, []);

  return (
    <div className='dashboard'>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        div
        className='dashboard__cards'
      >
        <motion.div
          className='card-container  dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-warning'>
            Pending order requests
          </div>
          <DWaitingRequests />
        </motion.div>

        <motion.div
          className='card-container  dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-warning'>
            Pending offers requests
          </div>
          pending offers
        </motion.div>

        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-success'>
            Month Perfs Total: 0
          </div>
        </motion.div>
        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-blue'>
            Last Customers Connection
          </div>
          <CustomerLogs />
        </motion.div>
        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-info'>Last Withdrawals</div>
        </motion.div>
        <motion.div
          className='card-container dashboard__card-item'
          variants={itemVariants}
        >
          <div className='card-container__header bg-info'>Last Desposits</div>
        </motion.div>
      </motion.div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { user: state.userReducer };
};
export default connect(mapStateToProps)(Dashboard);
