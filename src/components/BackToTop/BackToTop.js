import React, { useEffect } from 'react';

const BackToTop = () => {
  const buttonRef = React.useRef();

  const goTopTop = () => {
    window.scrollTo(0, 0);
  };

  const checkScroll = (e) => {
    const scroll = window.scrollY;

    if (scroll < 300) {
      buttonRef.current.style.opacity = 0;
    } else {
      buttonRef.current.style.opacity = 1;
    }
  };
  useEffect(() => {
    buttonRef.current.addEventListener('click', goTopTop);
    document.addEventListener('scroll', checkScroll);
    return () => {
      buttonRef?.current?.removeEventListener('click', goTopTop);
      document.removeEventListener('scroll', checkScroll);
    };
  });

  return (
    <div className='back-to-top' ref={buttonRef}>
      <i className='fas fa-arrow-alt-circle-up'></i>
    </div>
  );
};

export default BackToTop;
