import React from 'react';
import TagIcon from '../assets/icons/label.svg'

const LeftBar = ({ labels, onNewItemClick }) => {
    return (
        <div style={styles.container}>
            <div style={styles.logo}>
                Power Note
            </div>
            <button onClick={onNewItemClick} style={styles.button}>
                New Item
            </button>
            <div style={styles.labelsContainer}>
                <div style={styles.contentTypes}>
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
        fontSize: '20px',
        color: 'white',
        borderBottom: '1px solid #444444',
    },
    container: {
        width: '100%',
        height: '100%',
        padding: '10px',
        // border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-between'
    },
    button: {
        width: '100%',
        padding: '5px',
        borderRadius: '5px',
        // border: '1px solid #007BFF',
        border: 'none',

        backgroundColor: '#004774',
        color: '#e6e6e6',
        cursor: 'pointer',
        marginTop: '20px',
        marginBottom: '20px',
    },
    contentTypes: {
        color: '#e6e6e6',
        fontSize: '16px',
        paddingBottom: '5px',
        fontWeight: 'bold',
    },
    contentContainer: {
        // width: '100%',
        borderBottom: '1px solid #444444',
        padding: '10px',
    },
    labelsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        // backgroundColor: 'green'
    },
    labelList: {
        width: '100%',
        listStyleType: 'none',
        margin: '0',
        padding: '0'
    },
    tagIcon: {
        width: '22px',
        padding: '2px'
    },
    label: {
        padding: '5px',
        borderRadius: '8px',
        // border: '1px solid #ccc',
        display: 'flex',
        color: '#e6e6e6',
    
    },
    labelString: {
        paddingLeft: '5px',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export default LeftBar;
