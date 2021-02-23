import { combineReducers } from 'redux';
import userReducer from './usersReducer';
import customerReducer from './customerReducer';
export default combineReducers({ userReducer, customerReducer });
