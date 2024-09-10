import React from 'react';

import removeIcon from '../assets/icons/remove.png';
import successIcon from '../assets/icons/success.png';

const NewItemResult = ({ isNewNoteCreated }) => {
  return (
    <div style={styles.popup}>
      {isNewNoteCreated ? 
        <div style={styles.result}>
          <img src={successIcon} alt="success" style={styles.resultIcon} />
          New note created!
        </div> : 
        <div style={styles.result}>
          <img src={removeIcon} alt="failed" style={styles.resultIcon} />
          Failed to create note
        </div>}
    </div>
  );
};

const styles = {
  popup: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '50px',
    marginTop: '20px',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center',
    color: '#e6e6e6'
  },
  contentContainer: {
    width: '300px',
    padding: '10px',
    // boxSizing: 'border-box',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '50px 0px 0px 50px',
    padding: '2px',
    gap: '10px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultIcon: {
    width: '30px',
    boxSizing: 'border-box',
  }
};

export default NewItemResult;
