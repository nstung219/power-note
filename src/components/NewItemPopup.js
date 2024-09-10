import React, { useState, useEffect, useRef } from 'react';

const NewItemPopup = ({ onClose, onAddNote }) => {
  const [newNote, setNewNote] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [labels, setLabels] = useState([]);

  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.innerText);
    adjustHeight();
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  const addLabel = () => {
    if (newLabel && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel]);
    }
    setNewLabel('');
  };

  const removeLabel = (label) => {
    setLabels(labels.filter(l => l !== label));
  }

  return (
    <div style={styles.popup}>
      <div style={styles.popupContent}>
        <p style={{ color: '#e6e6e6' }}>New Note</p>
        <div style={styles.inputContainer}>
          {/* <textarea
            ref={textareaRef}
            type="text"
            value={newNote}
            onChange={(e) => handleNoteChange(e)}
            placeholder="Insert note"
            style={styles.noteInput}
          /> */}
          <div
            ref={textareaRef}
            contentEditable="true"
            onInput={handleNoteChange}
            style={styles.noteInput}
            placeholder="Add new note..."
            suppressContentEditableWarning={true}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Add new label"
            style={styles.labelInput}
          />
          <button onClick={addLabel} style={styles.addButton}>
            +
          </button>
        </div>
        {labels.length > 0 ?
          <div style={styles.labelsContainer}>
            {labels.map((label, index) => (
              <div onClick={(e) => removeLabel(e.target.textContent)} key={index} style={styles.label}>
                {label}
              </div>
            ))}
          </div>
          : ""}
        <div style={styles.actionButtons}>
          <div style={styles.spacer}></div>
          <button onClick={() => onAddNote({ "note": newNote, "labels": labels })} style={{ ...styles.spacer, ...styles.saveButton }}>
            Save
          </button>
          <button onClick={onClose} style={{ ...styles.spacer, ...styles.closeButton }}>
            Close
          </button>
          <div style={styles.spacer}></div>
        </div>
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
    alignItems: 'center',
    color: '#e6e6e6'
  },
  popupContent: {
    width: '400px',
    padding: '20px',
    backgroundColor: 'rgb(44,48,51)',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: '10px',
    display: 'flex',
  },
  noteInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: 'white',
    // marginBottom: '10px',
    color: 'black',
    fontSize: '14px',
    border: 'none',
    outline: 'none',
    boxSizing: 'border-box',
    resize: 'none',
    // textAlign: 'center',
  },
  labelInput: {
    flexGrow: '1',
    // width: 'calc(100% - 80px)',
    padding: '10px',
    borderRadius: '8px 0px 0px 8px',
    // color: '#e6e6e6',
    border: 'none',
    outline: 'none',
    boxSizing: 'border-box',
  },
  addButton: {
    flexShrink: '0',
    boxSizing: 'border-box',
    padding: '10px',
    borderRadius: '0px 8px 8px 0px',
    // border: '1px solid #007BFF',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer'
  },
  labelsContainer: {
    display: 'flex',
    gap: '5px',
    marginTop: '5px',
    flexWrap: 'wrap',
    // padding: '5px',
    // border: '1px solid #444444',
    borderRadius: '8px',
    width: '100%',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  label: {
    padding: "5px",
    border: '1px solid #444444',
    borderRadius: '8px',
    fontSize: "12px",
    cursor: 'pointer',
  },
  actionButtons: {
    width: '100%',
    display: 'flex',
    gap: '10px',
    // justifyContent: 'space-between',
  },
  spacer: {
    flex: '1',
    boxSizing: 'border-box',
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    // marginRight: '10px',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#007BFF',
  },
  closeButton: {
    backgroundColor: '#444444',
  },
};

export default NewItemPopup;
