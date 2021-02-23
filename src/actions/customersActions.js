import api from '../apis/api';

export const login = (userDetails) => async (dispatch) => {
  try {
    const { data } = await api.post('/customers/login', userDetails);

    if (data.customer) {
      const { data2 } = await api.post('/customers-logs/save', {
        customer: data.customer._id,
        owner: data.customer.owner,
      });
    }
    dispatch({
      type: 'CUSTOMER_LOG_IN',
      payload: data.customer,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addInventoryGroup = (group) => async (dispatch) => {
  const { data } = await api.post('/customers-inventory/save', group);
  group._id = data._id;

  dispatch({
    type: 'ADD_INVENTORY',
    payload: data,
  });
};

export const deleteInventoryOffer = ({ group, offerId }) => async (
  dispatch
) => {
  const { data } = await api.post(
    `customers-inventory/delete-offer/${group._id}`,
    {
      _id: offerId,
    }
  );

  console.log('data', data);

  dispatch({
    type: 'DELETE_INVENTORY_OFFER',
    payload: { group, offerId },
  });
};

export const updateGroup = (group, updates) => async (dispatch) => {
  // const { data } = await api.put(
  //   `customers-inventory/update-one/${group._id}`,
  //   updates
  // );
  console.log(updates);

  dispatch({
    type: 'UPDATE_GROUP_STATUS',
    payload: { groupId: group, updates },
  });
};

export const updateBalance = (_id, balance) => async (dispatch, state) => {
  console.log('1', state);
  const { depositData } = await api.patch('/customers/deposit/', {
    _id: _id,
    amount: balance,
  });

  dispatch({
    type: 'UPDATE_BALANCE',
    payload: balance,
  });
};

export const loadData = (token) => async (dispatch) => {
  try {
    const { data } = await api.post('/customers/validateToken', { token });
    dispatch({
      type: 'CUSTOMER_LOG_IN',
      payload: data,
    });
  } catch (error) {
    console.log('error', error);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    const { data } = await api.post('customers/logOut');
    dispatch({
      type: 'CUSTOMER_LOG_OUT',
    });
  } catch (error) {}
};
