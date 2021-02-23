import React, { useState, useEffect } from 'react';
import moment from 'moment';

import api from '../../../apis/api';

const CommentsHistory = ({ commentsList, deleteComment }) => {
  const [comments, setComments] = useState(commentsList);

  return (
    <div className='customers__comments_list'>
      <h1>Comments History:</h1>

      <div>
        <div className='customers__comment'>
          <div>Date</div>
          <div> Comment</div>
          <div>Seller</div>
          <div>&nbsp;</div>
        </div>
        {comments &&
          comments
            .sort((a, b) => (a.createAt < b.createAt ? 1 : -1))
            .map((comment) => {
              const date = moment(comment.createAt).format('DD-MM-YY HH:mm:ss');
              return (
                <div className='customers__comment'>
                  <div>{date}</div>
                  <div> {comment.comment}</div>
                  <div>{comment.addedBy?.userName}</div>
                  <div>
                    <button
                      className='button bg-warning'
                      onClick={() => {
                        setComments(
                          comments.filter((c) => c._id !== comment._id)
                        );
                        deleteComment(comment);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CommentsHistory;
