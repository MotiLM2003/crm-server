import api from '../apis/api';

export const login = (userDetails) => async (dispatch) => {
  try {
    const { data } = await api.post('/users/login', userDetails);

    dispatch({
      type: 'LOG_IN',
      payload: data.user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loadData = (token) => async (dispatch) => {
  try {
    const { data } = await api.post('/users/validateToken', { token });
    dispatch({
      type: 'LOG_IN',
      payload: data,
    });
  } catch (error) {
    console.log('error', error);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    const { data } = await api.post('users/logOut');
    dispatch({
      type: 'LOG_OUT',
    });
  } catch (error) {}
};
