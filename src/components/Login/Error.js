import React from 'react';
import { motion } from 'framer-motion';

const errorVariant = {
  hidden: {
    scale: 0.1,
    opacity: 0.1,
  },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const Error = ({ error }) => {
  return (
    <motion.div
      className='danger'
      variants={errorVariant}
      initial='hidden'
      animate='visible'
    >
      {error}
    </motion.div>
  );
};

export default Error;
