import React from 'react';

const PaginationArrow = ({ direction = 'right', onClick, disabled }) => (
  <svg
    width="29"
    height="29"
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={disabled ? null : onClick}
    style={{
      cursor: disabled ? 'default' : 'pointer',
      transform: direction === 'left' ? 'rotate(180deg)' : 'none',
      opacity: disabled ? 0.5 : 1
    }}
  >
    <rect width="29" height="29" rx="4.2034" fill="#D63A29"/>
    <path d="M12 22L18.7643 15.2365" stroke="white" strokeWidth="1.96777" strokeLinecap="round"/>
    <path d="M12 8.47266L18.7643 15.2362" stroke="white" strokeWidth="1.96777" strokeLinecap="round"/>
  </svg>
);

export default PaginationArrow;