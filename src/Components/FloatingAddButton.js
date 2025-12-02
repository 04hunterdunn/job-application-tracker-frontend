import React from 'react';

function FloatingAddButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Add new job"
      className="floating-add-btn"
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        width: '48px',
        height: '48px',
        borderRadius: '9999px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '24px',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        backgroundColor: '#10b981', // green
        color: 'white',
      }}
    >
      +
    </button>
  );
}

export default FloatingAddButton;