import React from 'react';

import SeachIcon from '../assets/icons/search.png';

const RightBar = ({ searchQuery, onSearchChange, results }) => {
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
      <div style={styles.resultContainer}>
        {results.map((result, index) => (
          <div key={index} style={styles.resultItem}>
            <strong>{result.string}</strong>
            { result.labels.map((label, index) => (
              <div key={index}>{label}</div>
            ))}
          </div>
        ))}
      </div>
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
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
    
  },
  resultItem: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #444444'
  }
};

export default RightBar;
