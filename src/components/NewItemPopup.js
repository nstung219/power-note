import React, { useState } from 'react';

const NewItemPopup = ({ searchQuery, onClose, onAddLabel }) => {
  const [newLabel, setNewLabel] = useState('');
  const [labels, setLabels] = useState([]);

  const addLabel = () => {
    if (newLabel) {
      setLabels([...labels, newLabel]);
      setNewLabel('');
    }
  };

  return (
    <div style={styles.popup}>
      <div style={styles.popupContent}>
        <h3>New Item</h3>
        <p>Search Query: {searchQuery}</p>
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Add new label"
          style={styles.input}
        />
        <button onClick={addLabel} style={styles.addButton}>
          +
        </button>
        <div style={styles.labelsContainer}>
          {labels.map((label, index) => (
            <div key={index} style={styles.label}>
              {label}
            </div>
          ))}
        </div>
        <button onClick={() => onAddLabel(labels)} style={styles.saveButton}>
          Save
        </button>
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  popup: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popupContent: {
    width: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  input: {
    width: 'calc(100% - 40px)',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '10px'
  },
  addButton: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #007BFF',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer'
  },
  labelsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginBottom: '10px'
  },
  label: {
    padding: '5px',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  saveButton: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #28a745',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px'
  },
  closeButton: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #dc3545',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer'
  }
};

export default NewItemPopup;
