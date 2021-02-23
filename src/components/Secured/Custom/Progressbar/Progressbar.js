import React from 'react';

const Progressbar = ({ progress }) => {
  return (
    <div className='progress-bar'>
      <div className='progress-bar__bar' style={{ width: `${progress}%` }}>
        <div className='progress-bar__text'>{progress}%</div>
      </div>
    </div>
  );
};

export default Progressbar;
