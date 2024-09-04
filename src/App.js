import React, { useEffect, useState } from 'react';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import NewItemPopup from './components/NewItemPopup';
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

  // Load items from data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/data.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setResults(jsonData);
        jsonData.forEach(note => {
          console.log(note.note + " " +note.labels.join(" "))
          index.add(note, note.note + " " +note.labels.join(" "));
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData()
  }, []);

  useEffect(() => {
    setResults(data);
  }, [data]);

  // search
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Filter results based on query
    console.log(index.search(query))
    // setResults(
    //   // data.filter(item => {
    //   //   if (query === '') return true;
    //   //   return item.labels.includes(query)
    //   // }) // update this with flex search
    //   index.search(query)
    // );
  };

  // newItem button
  const handleNewItemClick = () => {
    setShowPopup(true);
  };

  // add label to new item
  const handleAddNote = (note) => {
    // add fetch save note to db
    setData([...data, note]);
    setShowPopup(false);
  };

  return (
    <Container style={styles.appContainer}>
      <Section minSize={150} defaultSize={250} style={styles.section}>
        <LeftBar labels={new Set(data.flatMap(item => item.labels))} onNewItemClick={handleNewItemClick} />
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