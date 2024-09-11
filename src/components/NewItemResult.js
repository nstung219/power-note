import React, { useState, useEffect } from 'react';

import removeIcon from '../assets/icons/remove.png';
import successIcon from '../assets/icons/success.png';

import '../App.css'

const NewItemResult = ({ isNewNoteCreated, showResult }) => {
  const [shouldRender, setShouldRender] = useState(showResult);

  useEffect(() => {
    if (showResult) {
      setShouldRender(true); // Show component immediately when isVisible is true
    } else {
      // Set a timeout to delay removing the component from the DOM until fade-out completes
      const timeoutId = setTimeout(() => setShouldRender(false), 2000); // Match the CSS transition duration
      return () => clearTimeout(timeoutId); // Cleanup the timeout if the component unmounts
    }
  }, [showResult]);

  return shouldRender && (
      <div style={styles.popup} className={`slide ${showResult ? 'visible' : ''}`}>
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
