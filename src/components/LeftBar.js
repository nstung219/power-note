import React from 'react';
import TagIcon from '../assets/icons/tag.png'

const LeftBar = ({ labels, onNewItemClick }) => {
    return (
        <div style={styles.container}>
            <div style={styles.logo}>
                Power Note
            </div>
            <button onClick={onNewItemClick} style={styles.button}>
                Add New Item
            </button>
            <div style={styles.labelsContainer}>
                <div>
                    LABELS
                </div>
                <ul style={styles.labelList}>
                {labels.map((label, index) => (
                    <li key={index} style={styles.label}>
                        <img src={TagIcon} alt="My Icon" style={styles.tagIcon}/>
                        <div style={styles.labelString}>{label}</div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
};

const styles = {
    logo: {
        width: '100%',
        paddingBottom: '10px',
        fontSize: '20px'
    },
    container: {
        width: '100%',
        height: '100%',
        padding: '10px',
        // border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    button: {
        width: '100%',
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
        backgroundColor: 'green'
    },
    labelList: {
        width: '100%',
        listStyleType: 'none',
        margin: '0',
        padding: '0'
    },
    tagIcon: {
        width: '20px',

    },
    label: {
        padding: '5px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        display: 'flex'
    },
    labelString: {
        paddingLeft: '5px'
    }
};

export default LeftBar;
