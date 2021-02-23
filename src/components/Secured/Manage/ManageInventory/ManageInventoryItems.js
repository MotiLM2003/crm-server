import React, { useState, useEffect } from 'react';

const ManageInventoryItems = ({ headers, group, setGroupItems }) => {
  const [items, setItems] = useState(group.items);

  const inputChanged = (e, i) => {
    setItems(
      items.map((item, index) => {
        return index === i ? { text: e.target.value } : item;
      })
    );
  };

  useEffect(() => {
    setGroupItems(items, group._id);
  }, [items]);

  return (
    items &&
    items.map((item, index) => {
      return (
        <div key={item._id} className='w-200'>
          <input
            type='text'
            value={item.text}
            placeholder={headers[index]}
            onChange={(e) => inputChanged(e, index)}
          />
        </div>
      );
    })
  );
};

export default ManageInventoryItems;
