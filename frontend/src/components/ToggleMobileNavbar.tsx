import React from 'react';

import { RiCloseLargeLine, RiMenu5Line } from 'react-icons/ri';
import { ToggleMobileNavbarButtonProps } from '../models/ToggleButton';

const ToggleMobileNavbarButton: React.FC<ToggleMobileNavbarButtonProps> = ({
  width,
  toggle,
  handleToggleButton,
}) => {
  return (
    <div className='flex ml-auto z-20'>
      {width < 1024 && (
        <button
          type='button'
          aria-label='menu boutton'
          onClick={handleToggleButton}
          style={{ fontSize: '40px' }}
          className={
            toggle
              ? 'transform transition duration-200 -rotate-90 '
              : 'transform transition duration-200 rotate-0 '
          }
        >
          {toggle ? <RiCloseLargeLine /> : <RiMenu5Line />}
        </button>
      )}
    </div>
  );
};

export default ToggleMobileNavbarButton;
