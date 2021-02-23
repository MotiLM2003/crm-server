import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { usePresence } from 'framer-motion';
import { campaigns, statuses } from '../../../utils/static_data';
import FormModel from '../../FormModel/FormModel';
import SelectStatus from '../../SelectStatus';
import { motion, AnimatePresence } from 'framer-motion';
import { getStatusClassName } from './utils/customers';
import api from '../../../apis/api';
import CustomersComments from './CustomersComments';
import CommentsHistory from './CommentsHistory';

const CustomerItem = ({
  customer,
  index,
  updateCustomer,
  addComment,
  deleteComment,
  onUserMarked,
  showCheckbox,
}) => {
  const [isPresent, safeToRemove] = usePresence();
  const [isVisible, setIsVisible] = useState(false);
  const commentRef = useRef();
  const [isCommentsvisible, setIsCommentsvisible] = useState(false);
  const statusClassName = getStatusClassName(customer);
  const [status, setStatus] = useState(customer.status);

  useEffect(() => {
    !isPresent && setTimeout(safeToRemove, 1000);
  }, [isPresent]);

  const className = index % 2 === 0 ? '' : 'customers__alt';
  const date = moment(customer.createAt).format('DD-MM-YYYY HH:mm:ss');

  const onAddComment = () => {
    addComment({
      comment: commentRef.current.value,
      owner: customer._id,
    });
  };

  const homepageLink = `/backoffice/customers/details/${customer._id}`;

  return (
    <tr className={className}>
      {showCheckbox ? (
        <td>
          <input
            type='checkbox'
            checked={customer.isMarked}
            onChange={() => onUserMarked(customer)}
          />
        </td>
      ) : null}

      <td>{date}</td>
      <td>
        <Link to={homepageLink}>{customer.firstName}</Link>
      </td>
      <td>
        <Link to={homepageLink}>{customer.lastName}</Link>
      </td>
      <td>{customer.phone}</td>
      <td>
        <div
          className={`customers__status ${statusClassName}`}
          onClick={() => setIsVisible(true)}
        >
          <FormModel isVisible={isVisible} blockingBackground={false}>
            <div className='customers__set-status'>
              <SelectStatus
                value={status}
                withAnyOption={false}
                onChange={(e) => setStatus(e.target.value)}
              />
              <div>
                <button
                  className='button bg-blue'
                  onClick={(e) => {
                    e.stopPropagation();
                    const newcustomer = {
                      ...customer,
                      status,
                    };
                    setIsVisible(false);
                    updateCustomer(newcustomer);
                  }}
                >
                  Update status
                </button>
                &nbsp;
                <button
                  className='button bg-gray'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </FormModel>
          {statuses[customer.status]}
        </div>
      </td>
      <td>
        <Link to={homepageLink}>{customer.email}</Link>
      </td>
      <td>{customer.country}</td>
      <td>{customer.owner ? customer.owner.firstName : 'Uncontrolled'}</td>
      <td>0</td>
      <td>{campaigns[customer.campaign]}</td>
      <td
        className='customers__comments'
        onClick={() => {
          setIsCommentsvisible(true);
        }}
      >
        <i className='fas fa-comment'></i>
        {customer.comments?.length > 0 ? (
          <div className='customers__comments_tag'>
            {customer.comments.length}
          </div>
        ) : (
          ''
        )}
        <CustomersComments isVisible={isCommentsvisible}>
          <div className='customers__comment_content'>
            <div>
              <textarea
                rows='5'
                col='5'
                placeholder='Add new comment...'
                ref={commentRef}
              ></textarea>
            </div>

            <div>
              <button
                className='button bg-gray'
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCommentsvisible(false);
                }}
              >
                Cancel
              </button>
              <button
                className='button bg-blue'
                onClick={(e) => {
                  e.stopPropagation();
                  onAddComment();
                  setIsCommentsvisible(false);
                }}
              >
                Add new comment
              </button>
            </div>
            {customer.comments && (
              <CommentsHistory
                commentsList={customer.comments}
                deleteComment={deleteComment}
              />
            )}
          </div>
        </CustomersComments>
      </td>
    </tr>
  );
};

export default React.memo(CustomerItem);
