import React, { useState, useEffect } from 'react';
import FormModel from '../../FormModel/FormModel';
const CustomersComments = ({ isVisible, children }) => {
  return isVisible ? (
    <FormModel isVisible={isVisible}>{children}</FormModel>
  ) : null;
};

export default CustomersComments;
