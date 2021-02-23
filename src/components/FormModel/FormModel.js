import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

const containerVariant = {
  hidden: {
    scale: 0,
    borderRadius: 1200,
  },
  visible: {
    scale: 1,
    borderRadius: 1,
    transition: { duration: 0.5, when: 'beforeChildren' },
  },
};

const fadeInVariation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const cardVariant = {
  hidden: {
    top: '-100vh',
    // opacity: 0,
  },
  visible: {
    // opacity: 0.9,
    top: '40%',
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const FormModel = ({
  isVisible,
  children,
  containerAnimationType = 'fadeIn',
  contentAnimationType = 'fadeIn',
}) => {
  let containerAnimation = null;
  let contentAnimation = null;
  switch (containerAnimationType) {
    case 'fadeIn': {
      containerAnimation = fadeInVariation;
      break;
    }
  }

  switch (contentAnimationType) {
    case 'fadeIn': {
      contentAnimation = fadeInVariation;
      break;
    }
  }
  const modelRender = () => {
    return isVisible ? (
      <React.Fragment>
        <motion.div
          className='form-model'
          variants={containerAnimation}
          initial='hidden'
          animate='visible'
        >
          <motion.div className='form-model__card' variants={contentAnimation}>
            {children}
          </motion.div>
        </motion.div>
      </React.Fragment>
    ) : null;
  };
  return ReactDOM.createPortal(
    modelRender(),

    document.getElementById('form-model')
  );
};

export default FormModel;
