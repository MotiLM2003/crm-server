import React, { useState, useEffect, useRef } from 'react';

import api from '../../../apis/api';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import FormModel from '../../FormModel/FormModel';
import { newUser } from '../../../utils/models';
import SelectCountry from '../../SelectCountry';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../Loader/Loader';
import PaginationToolbar from './PaginationToolbar';
import SwitchCustomer from './SwitchCustomer';
import CustomerItem from './CustomerItem';
import Filters from './Filters';

import SellerDropdown from '../Custom/SellerDropdown/SellerDropdown';

let totalPages = 1;
let firstLoad = false;

const Customers = (props) => {
  const sFilters = {
    firstName: '',
    lastName: '',
    phone: '',
    status: '-1',
    email: '',
    country: '0',
    campaign: '-1',
    startDate: '',
    endDate: '',
    owner:
      props.user.role.type.toLowerCase() === 'admin' ? '0' : props.user._id,
    showAll: false,
  };

  const [customers, setCustomers] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [newCustomer, setNewCustomer] = useState(newUser);
  const [isSwitchCustomer, setIsSwitchCustomer] = useState(false);
  const [formError, setFormError] = useState('');
  const [filters, setFilters] = useState(sFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isUserSelected, setUserSelected] = useState(false);
  const [orderBy, setOrderBy] = useState('_id');
  const [limit, setLimit] = useState(100);
  const [users, setUsers] = useState(null);
  const fnRef = useRef();
  const lnRef = useRef();
  const phRef = useRef();
  const emRef = useRef();

  const getByOwner = async (filters) => {
    setIsLoading(true);
    firstLoad = true;

    try {
      const { data } = await api.post('/customers/get-by-owner', {
        filters,
        page,
        limit,
        orderBy,
      });

      const { customers, count } = data;

      // adding marked property to customers;
      setCustomers(
        customers.map((c) => {
          c.isMarked = false;
          return c;
        })
      );
      setTotalRecords(count);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error loading data');
      console.log(error);
    }

    setNewCustomer({
      ...newCustomer,
      userName: newCustomer.firstName,
      owner: props.user._id,
    });
  };
  useEffect(() => {
    if (customers) {
      setIsLoading(false);
    }
  }, [customers]);

  useEffect(() => {
    document.title = 'Champagne Deutz - Customers';
    getByOwner(filters);
    const getUsers = async () => {
      try {
        const { data } = await api.get('users/');
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (customers) {
      getByOwner(filters);
    }
  }, [orderBy]);

  useEffect(() => {
    if (customers) {
      getByOwner(filters);
    }
  }, [
    filters.country,
    filters.status,
    filters.campaign,
    page,
    filters.owner,
    filters.showAll,
  ]);

  useEffect(() => {
    totalPages = Math.ceil(totalRecords / limit);
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalRecords]);

  const dataChanged = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const addComment = async (comment) => {
    try {
      const { data } = await api.post('/comments/', comment);
      toast.info('😍 New comment created.', {
        position: 'bottom-left',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: false,
      });

      const newCustomer = customers.map((c, index) => {
        if (c._id === comment.owner) {
          if (!c.comments) {
            c.comments = [comment];
          } else {
            c.comments.push(comment);
          }
        }
        return c;
      });
      setCustomers(newCustomer);
    } catch (err) {
      console.log(err);
    }
  };

  const saveUser = async () => {
    if (
      newCustomer.firstName.length < 2 ||
      newCustomer.lastName.length < 2 ||
      newCustomer.email.length < 2 ||
      newCustomer.userPassword.length < 2 ||
      newCustomer.phone.length < 2 ||
      newCustomer.country === '0'
    ) {
      setFormError('All fields must be set.');
    } else {
      const { data } = await api.post('/customers/register', newCustomer);
      setIsNewUser(false);
      toast.info('🤑 Customer created.', {
        position: 'bottom-left',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: false,
      });
      setNewCustomer(newUser);
    }
  };

  const deleteComment = async ({ _id }) => {
    try {
      const { data } = await api.delete(`/comments/delete/${_id}`);

      const newCustomer = customers.map((c) => {
        if (c.comments.length > 0) {
          const newComments = c.comments.filter((x) => x._id !== _id);
          const temp = { ...c, comments: newComments };

          return temp;
        }
        return c;
      });
      setIsNewUser(false);
      toast.info('👽 Comment deleted.', {
        position: 'bottom-left',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: false,
      });
      setCustomers(newCustomer);
    } catch (err) {
      toast.info('😡 Something went worng', {
        position: 'bottom-left',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: false,
      });
    }
  };

  const filtersChanged = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const updateCustomer = async (customer) => {
    const newStatus = { ...customer, status: customer.status };

    setCustomers(
      customers.map((c) => {
        if (c._id === customer._id) {
          return newStatus;
        }
        return c;
      })
    );

    try {
      const { data } = await api.patch('customers/update', {
        _id: customer._id,
        update: { status: customer.status },
      });

      toast.info('🤟 Status updated.', {
        position: 'bottom-left',
        autoClose: 2500,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const onUserChanged = (id) => {
    const _id = id.target.value;
    setFilters({ ...filters, owner: _id });
  };

  const onUserMarked = (c) => {
    setCustomers(
      customers.map((cx) => {
        if (c._id === cx._id) cx.isMarked = !cx.isMarked;
        return cx;
      })
    );
  };

  const changeSwithCustomers = () => {
    const isOn = isSwitchCustomer;
    setIsSwitchCustomer((prev) => !prev);
    if (isOn) {
      setFilters({ ...filters, showAll: false });
      // getByOwner(filters);
    }
  };

  const swithcCustomersSubmit = () => {
    setIsSwitchCustomer(false);

    getByOwner(filters);
  };
  return (
    <div className='customers'>
      {isLoading && <Loader />}
      <FormModel isVisible={isNewUser}>
        <div className='new-customer'>
          <div className='form-model__header'>New Customer</div>
          <div className='divider'></div>
          {formError && (
            <div className='new-customer__error bg-warning'>{formError}</div>
          )}
          <input
            type='text'
            name='lastName'
            value={newCustomer.lastName}
            placeholder='Last Name'
            onChange={dataChanged}
          />
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            value={newCustomer.firstName}
            onChange={dataChanged}
          />
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={newCustomer.email}
            onChange={dataChanged}
          />
          <input
            type='text'
            name='phone'
            placeholder='Phone'
            value={newCustomer.phone}
            onChange={dataChanged}
          />
          <SelectCountry country={newCustomer.country} onChange={dataChanged} />
          <input
            type='password'
            name='userPassword'
            placeholder='Password'
            value={newCustomer.userpassword}
            onChange={dataChanged}
          />

          <div className='divider'></div>
          <div className='new-customer__tollbar'>
            <button
              className='button'
              onClick={() => {
                setIsNewUser(false);
              }}
            >
              Cancel
            </button>
            <button className='button bg-blue' onClick={saveUser}>
              Save Changes
            </button>
          </div>
        </div>
      </FormModel>
      <PaginationToolbar
        page={page}
        totalPages={totalPages}
        onChange={(e) => {
          setPage(e.target.value);
        }}
        totalRecords={totalRecords}
        previousPage={(e) => {
          if (page > 1) {
            setPage((prev) => prev - 1);
          }
        }}
        nextPage={(e) => {
          if (parseInt(page) < parseInt(totalPages)) {
            setPage((prev) => prev + 1);
          }
        }}
      />
      <div className='customers__toolbar'>
        <div className='customers__toolbar-buttons'>
          <button
            className='customers__button button bg-warning'
            onClick={() => setFilters({ ...filters, status: 1 })}
          >
            New
          </button>
          <button
            className='customers__button button bg-success'
            onClick={() => setFilters({ ...filters, status: 7 })}
          >
            Deposit
          </button>
          <button
            className='customers__button button bg-blue'
            onClick={() => setFilters({ ...filters, status: 9 })}
          >
            Interested
          </button>
          <button
            className='customers__button button bg-info'
            onClick={() => {
              getByOwner(filters);
            }}
          >
            Search
          </button>
          <button
            className='customers__button  button bg-warning'
            onClick={() => {
              setFilters({ ...sFilters });
              getByOwner(sFilters);
              fnRef.current.value = '';
              lnRef.current.value = '';
              phRef.current.value = '';
              emRef.current.value = '';
              setPage(1);
            }}
          >
            Reset
          </button>

          {props.user.role.type.toLowerCase() === 'admin' && (
            <div
              className='customers__admin-panel'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SellerDropdown
                users={users}
                defaultText='Un Controlled'
                onUserChange={onUserChanged}
              />
              {filters.owner === '0' ? (
                <div>
                  <input
                    type='checkbox'
                    checked={filters.showAll}
                    onChange={() =>
                      setFilters({ ...filters, showAll: !filters.showAll })
                    }
                  />
                  <label> Show all (without uncontrolled) </label>
                </div>
              ) : null}
              {customers && customers.filter((x) => x.isMarked).length > 0 && (
                <button
                  className='button  bg-success'
                  onClick={changeSwithCustomers}
                >
                  Switch Cusomers
                </button>
              )}
            </div>
          )}
        </div>
        <div>
          <button
            className='customers__button button bg-success'
            onClick={() => setIsNewUser(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className='customers__table-container'>
        <motion.table
          className='customers__table'
          variants={container}
          initial='hidden'
          animate='show'
        >
          <thead>
            <tr className='bg-grey'>
              {props.user.role.type.toLowerCase() === 'admin' ? (
                <th>
                  <input
                    type='checkbox'
                    onClick={(e) =>
                      setCustomers(
                        customers.map((c) => {
                          c.isMarked = e.target.checked;
                          return c;
                        })
                      )
                    }
                  />
                </th>
              ) : null}

              <th onClick={() => setOrderBy('createAt')}>Date</th>
              <th onClick={() => setOrderBy('firstName')}>First Name</th>
              <th onClick={() => setOrderBy('lastName')}>Last Name</th>
              <th onClick={() => setOrderBy('phone')}>Phone</th>
              <th onClick={() => setOrderBy('status')}>Status</th>
              <th onClick={() => setOrderBy('email')}>Email</th>
              <th onClick={() => setOrderBy('country')}>Country</th>
              <th onClick={() => setOrderBy('owner')}>Owner</th>
              <th>Real Deposit</th>
              <th onClick={() => setOrderBy('campaign')}>Campaign</th>
              <th>...</th>
            </tr>
            <Filters
              filters={filters}
              setFilters={setFilters}
              fnRef={fnRef}
              filtersChanged={filtersChanged}
              lnRef={lnRef}
              phRef={phRef}
              emRef={emRef}
              showCheckbox={props.user.role.type.toLowerCase() === 'admin'}
            />
          </thead>
          <tbody>
            {customers &&
              customers.map((customer, index) => (
                <CustomerItem
                  updateCustomer={updateCustomer}
                  key={customer._id}
                  customer={customer}
                  index={index}
                  addComment={addComment}
                  deleteComment={deleteComment}
                  onUserMarked={onUserMarked}
                  showCheckbox={props.user.role.type.toLowerCase() === 'admin'}
                />
              ))}
          </tbody>
        </motion.table>
      </div>
      {isSwitchCustomer && (
        <FormModel isVisible={isSwitchCustomer}>
          <SwitchCustomer
            changeSwithCustomers={changeSwithCustomers}
            swithcCustomersSubmit={swithcCustomersSubmit}
            customers={customers}
          />
        </FormModel>
      )}
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(Customers);
