export default (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN': {
      return { ...action.payload };
    }
    case 'LOG_OUT': {
      return {};
    }
    case 'GET_ALL': {
      return state;
    }
    default:
      return state;
  }
};
