import React from "react";

const DetailedNote = ({detailedNote, handleCloseDetailedNote}) => {
    const styles = {
        container: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        detailedNote: {
            width: '60%',
            // height: '60%',
            // border: '1px solid black',
            borderRadius: '8px',
            backgroundColor: '#444444',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            gap: '10px'
        },
        resultItemLabelContainer: {
            display: 'flex',
            gap: '5px',
            marginTop: '5px',
            flexWrap: 'wrap',
            paddingBottom: '10px',
            borderBottom: '1px solid black'
          },
        noteContainer: {
            color: 'white'
        },
        resultItemLabels: {
            padding: "5px",
            border: '1px solid #444444',
            borderRadius: '8px',
            fontSize: "12px",
            color: '#e6e6e6',
            // color: 'black',
        }
    }

    return (
        <div style={styles.container}>
            <div className="blur" onClick={() => {handleCloseDetailedNote()}} />
            <div style={styles.detailedNote}>
                <div style={styles.resultItemLabelContainer}>
                  {detailedNote.labels.map((label, index) => (
                    <div key={index} style={{...styles.resultItemLabels, ...{ backgroundColor: label.color } }}>{label.name}</div>
                  ))}
                </div>
                <div style={styles.noteContainer}>
                    <span>
                        {detailedNote.note}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DetailedNote