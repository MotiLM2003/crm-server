export const getStatusClassName = (customer) => {
  let statusClassName = '';

  switch (parseInt(customer.status)) {
    case 0: {
      statusClassName = 'bg-gray-light';
      break;
    }
    case 1: {
      statusClassName = 'bg-warning';
      break;
    }
    case 2: {
      statusClassName = 'bg-success';
      break;
    }
    case 3: {
      statusClassName = 'bg-blue';
      break;
    }
    case 4: {
      statusClassName = 'bg-info';
      break;
    }
    case 5: {
      statusClassName = 'bg-info';
      break;
    }
    case 6: {
      statusClassName = 'bg-success';
      break;
    }
    case 7: {
      statusClassName = 'bg-blue-light';
      break;
    }
    case 8: {
      statusClassName = 'bg-blue-light';
      break;
    }
  }
  return statusClassName;
};
