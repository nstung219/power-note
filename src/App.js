import React, { useEffect, useState } from 'react';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import NewItemPopup from './components/NewItemPopup';
import NewItemResult from './components/NewItemResult';
import { Container, Section, Bar } from '@column-resizer/react';
import FlexSearch from "flexsearch";

import './App.css'

const index = new FlexSearch.Index({
  tokenize: "forward",
  cache: true,
  resolution: 9,
});

function App() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isNewNoteCreated, setIsNewNoteCreated] = useState(true);

  const host = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Load items from data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`${host}/notes`,{
          method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
          setData(data);
          setResults(data);
          data.forEach(note => {
            index.add(note.id, note.note + " " + note.labels.join(" "));
          });
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData()
  }, [host]);

  useEffect(() => {
    setResults(
      data.filter(item => {
        if (searchQuery === '') return true;
        return index.search(searchQuery).includes(item.id)
      })
    );
  }, [searchQuery, data]);

  // search
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // newItem button
  const handleNewItemClick = () => {
    setShowPopup(true);
  };

  // add label to new item
  const handleAddNote = async (note) => {
    // add fetch save note to db and replace note update
    fetch(`${host}/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then(response => {
        if (!response.ok) {
          setIsNewNoteCreated(false);
        } else {
          setIsNewNoteCreated(true);
          return response.json()
        }
      })
      .then(res_data => {
        if (res_data) {
          index.add(res_data.id, res_data.note + " " + res_data.labels.join(" "));
          setData([...data, res_data]);
        }
        setShowResult(true);
        setTimeout(() => setShowResult(false), 2000);
      });
    setShowPopup(false);
  };

  const handleLabelSelect = (label) => {
    setSearchQuery(searchQuery === '' ? label : searchQuery + ' ' + label);
  }

  return (
    <Container style={styles.appContainer}>
      <Section minSize={150} defaultSize={250} style={styles.section}>
        <LeftBar labels={new Set(data.flatMap(item => item.labels))} onNewItemClick={handleNewItemClick} handleLabelSelect={handleLabelSelect} />
      </Section>
      <Bar size={1} style={{ background: '#444444', cursor: 'col-resize' }} />
      <Section minSize={1400} style={styles.section}>
        <RightBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          results={results}
        />
      </Section>
      {showPopup && (
        <NewItemPopup
          onClose={() => setShowPopup(false)}
          onAddNote={handleAddNote}
        />
      )}
      <NewItemResult isNewNoteCreated={isNewNoteCreated} showResult={showResult}/>
    </Container>
  );
}

const styles = {
  section: {
    display: 'flex',
    boxSizing: 'border-box'
  },
  appContainer: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    fontColor: 'rgb(136,177,207)',
    backgroundColor: 'rgb(44,48,51)'
  },
  leftBar: {
    flex: '1'
  },
  rightBar: {
    flex: '2'
  }
};

export default App;