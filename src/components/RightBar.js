import React, { useState, useEffect, useRef } from 'react';

import SeachIcon from '../assets/icons/search.png';
import '../App.css';

const RightBar = ({ searchQuery, onSearchChange, results }) => {

  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  const randomColor = () => {
    const blue = Math.floor(Math.random() * 256); // Random value for blue channel
    const red = Math.floor(Math.random() * 128) + 128; // Random value for red channel (128-255)
    const green = Math.floor(Math.random() * 128); // Random value for green channel (0-127)

    return `rgb(${red}, ${green}, ${blue})`;
  }

  // const handleNoteClick = (event) => {
  //   const { clientX, clientY } = event;
  //   setDropdownPosition({ x: clientX, y: clientY });
  //   setShowOptions(!showOptions);
  // };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <img src={SeachIcon} alt="Search Icon" style={styles.icon} />
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search..."
          style={styles.searchBar}
        />
      </div>
      <div style={styles.resultItemContainer}>
        <div className='right-bar-list scrollable-container'>
          <ul style={styles.resultUl}>
            {results.map((result, index) => (
              <li key={index} style={styles.resultItem}>
                <div style={styles.resultItemLabelContainer}>
                  {result.labels.map((label, index) => (
                    <div key={index} style={{...styles.resultItemLabels, ...{ backgroundColor: randomColor() }}}>{label}</div>
                  ))}
                </div>
                <strong style={styles.resultItemNote}>{result.note}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {false && showOptions && (
        <div
          ref={dropdownRef}
          style={{
            ...styles.dropdownMenu,
            left: dropdownPosition.x,
            top: dropdownPosition.y,
          }}
        >
          <button style={styles.dropdownItem} onClick={() => setShowOptions(false)} >Edit</button>
          <button style={styles.dropdownItem} onClick={() => setShowOptions(false)} >Delete</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  icon: {
    width: '20px',
    padding: '2px'
  },
  container: {
    width: '100%',
    // padding: '10px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownMenu: {
    position: 'fixed', // Use fixed to position relative to the viewport
    // backgroundColor: '#fff',
    // border: '1px solid #ddd',
    border: 'none',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    zIndex: 1,
  },
  dropdownItem: {
    padding: '5px',
    backgroundColor: '#fff',
    // border: '1px solid #444444',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    // textAlign: 'left',
  },
  searchContainer: {
    // width: '100%',
    padding: '10px',
    paddingTop: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid #444444',
    display: 'flex',
  },
  searchBar: {
    width: '100%',
    background: 'none',
    color: 'white',
    border: 'none',
    outline: 'none',
    // padding: '10px',
    // marginBottom: '10px',
    borderRadius: '8px',
    // border: '1px solid #444444'
  },
  resultItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    flex: '1',
    overflow: 'auto'
  },
  resultUl: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
  },
  resultItem: {
    padding: '10px',
    borderRadius: '8px',
    // border: '1px solid #444444',
    color: '#e6e6e6',
    backgroundColor: '#444444',
  },
  resultItemLabelContainer: {
    display: 'flex',
    gap: '5px',
    marginTop: '5px',
    flexWrap: 'wrap',
  },
  resultItemNote: {
    whiteSpace: "pre-line",
    fontSize: "14px",
    marginLeft: '10px',
    boxSizing: 'border-box',
  },
  resultItemLabels: {
    padding: "5px",
    border: '1px solid #444444',
    borderRadius: '8px',
    fontSize: "12px",
  }
};

export default RightBar;
