import React from 'react';

const RightBar = ({ searchQuery, onSearchChange, results }) => {
  return (
    <div style={styles.container}>
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search..."
        style={styles.searchBar}
      />
      <div style={styles.resultContainer}>
        {results.map((result, index) => (
          <div key={index} style={styles.resultItem}>
            <strong>{result.string}</strong>
            <div>{result.labels.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
  },
  searchBar: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  resultContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  resultItem: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc'
  }
};

export default RightBar;
