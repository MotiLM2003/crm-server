import React, { useState, useEffect } from 'react';
import api from '../../../apis/api';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import CommentsHistory from '../Customers/CommentsHistory';
import Loader from '../../Loader/Loader';
import SwitchCustomerLogs from './SwitchCustomerLogs';
import SelectCampaign from '../../SelectCampaign';
import SelectStatus from '../../SelectStatus';
import Deposits from './Deposits';

const CustomersDetails = (props) => {
  const id = props.match.params.id;

  const [selectedTab, setSelectedTab] = useState('1');
  const [customer, setCustomer] = useState(null);
  const [comments, setComments] = useState(null);
  const getUser = async () => {
    try {
      const { data } = await api.get(`/comments/${id}`);
      const response = await api.get(`/customers/details/${id}`);
      setCustomer(response.data);
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (comment) => {
    const { data } = await api.delete(`/comments/delete/${comment._id}`);
  };

  const updateCustomer = async () => {
    let updates = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      status: customer.status,
      campaign: customer.campaign,
      country: customer.country,
      email: customer.email,
      phone: customer.phone,
      isActive: customer.isActive,
      autoOffers: customer.autoOffers,
    };

    if (customer.userPassword !== '') {
      updates = { ...updates, userPassword: customer.userPassword };
    }

    const { data } = await api.patch('customers/update/', {
      _id: customer._id,
      update: updates,
    });

    toast.info('🤘 User details updated!');
  };
  useEffect(() => {
    getUser();
    document.title = 'Champagne Deutz - Customer Details';
  }, []);

  const isSelected = (id) => {
    const result = id === selectedTab;
    return result;
  };
  const onTabChange = (e) => {
    const tab = e.target.id;
    setSelectedTab(tab);
  };
  const date = customer
    ? moment(customer.createAt).format('DD-MM-YY HH:mm:ss')
    : null;

  const onChange = (e) => {
    const value =
      e.target.name === 'isActive' || e.target.name === 'autoOffers'
        ? e.target.checked
        : e.target.value;
    setCustomer({ ...customer, [e.target.name]: value });
  };
  return !customer ? (
    <Loader />
  ) : (
    <div className='customers-details'>
      <ToastContainer
        position='bottom-left'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='customers-details__tabs'>
        <button
          id='1'
          className={`button bg-gray ${isSelected('1') ? 'selected' : ''}`}
          onClick={onTabChange}
        >
          Customer Details
        </button>
        <button
          id='2'
          className={`button bg-gray ${isSelected('2') ? 'selected' : ''}`}
          onClick={onTabChange}
        >
          History
        </button>
      </div>
      <section className='customers-details__content'>
        <div id='1' className={`${isSelected('1') ? '' : 'hide'}`}>
          <div className='customers-details__details'>
            <div className='card-container  dashboard__card-item'>
              <div className='card-container__header bg-info'>
                <i className='fas fa-user-tie'></i> Customer Details
              </div>
              <div className='customers-details__personal'>
                <div className='customers-details__form-group'>
                  <div>Active</div>
                  <div>
                    <input
                      type='Checkbox'
                      checked={customer.isActive}
                      name='isActive'
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='customers-details__form-group alt'>
                  <div>Auto Offers:</div>
                  <div>
                    <input
                      type='Checkbox'
                      checked={customer.autoOffers}
                      name='autoOffers'
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='customers-details__form-group'>
                  <div>Connect to personal website: </div>
                  <div>
                    <button className='button bg-success'>
                      <i className='fas fa-plug'></i> Connect
                    </button>
                  </div>
                </div>
                <div className='customers-details__form-group alt'>
                  <div>Created at: </div>
                  <div>{date}</div>
                </div>
                <div className='customers-details__form-group '>
                  <div>First Name: </div>
                  <div>
                    <input
                      type='text'
                      value={customer.firstName}
                      name='firstName'
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='customers-details__form-group alt'>
                  <div>Last Name: </div>
                  <div>
                    <input
                      type='text'
                      value={customer.lastName}
                      name='lastName'
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='customers-details__form-group '>
                  <div>Status: </div>
                  <div>
                    <SelectStatus
                      value={customer.status}
                      name='status'
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='customers-details__form-group alt'>
                  <div>Campaign: </div>
                  <div>
                    <SelectCampaign
                      value={customer.campaign}
                      name='status'
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='customers-details__form-group '>
                  <div>Country </div>
                  <div>{customer.country}</div>
                </div>
                <div className='customers-details__form-group alt'>
                  <div>Email: </div>
                  <div>
                    <input
                      type='text'
                      value={customer.email}
                      name='email'
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='customers-details__form-group '>
                  <div>Phone: </div>
                  <div>
                    <input
                      type='text'
                      value={customer.phone}
                      name='phone'
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='customers-details__form-group alt'>
                  <div>Password: </div>
                  <div>
                    <input
                      type='text'
                      value={customer.password}
                      name='userPassword'
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='customers-details__form-group '>
                  <div>Uid: </div>
                  <div>{customer._id}</div>
                </div>
                <div className='customers-details__buttons'>
                  <button
                    type='button'
                    className='button bg-blue-deep'
                    onClick={updateCustomer}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <div className='card-container  dashboard__card-item'>
              <div className='card-container__header bg-warning'>
                <i class='fas fa-wallet'></i> Deposit
              </div>
              <Deposits customer={customer} />
            </div>

            <div className='card-container  dashboard__card-item'>
              <div className='card-container__header bg-warning'>
                <i className='fas fa-comments'></i> Comments
              </div>
              {comments ? (
                <CommentsHistory
                  commentsList={comments}
                  deleteComment={deleteComment}
                />
              ) : (
                <div>Loading</div>
              )}
            </div>

            <div className='card-container  card-container__card-item'>
              <div className='card-container__header bg-turq'>
                <i className='far fa-credit-card'></i> Cards
              </div>
            </div>
          </div>
          <div className='customers-details__extras'>
            <div className='card-container  card-container__card-item'>
              <div className='card-container__header bg-turq'>
                <i className='fas fa-glass-cheers'></i> Champagnes
              </div>
            </div>
          </div>
        </div>

        <div id='2' className={`${isSelected('2') ? '' : 'hide'}`}>
          <SwitchCustomerLogs customer={customer} />
        </div>
      </section>
    </div>
  );
};

export default CustomersDetails;
