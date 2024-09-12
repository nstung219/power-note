import React, { useEffect, useState } from 'react';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import NewItemPopup from './components/NewItemPopup';
import NewItemResult from './components/NewItemResult';
import { Container, Section, Bar } from '@column-resizer/react';
import FlexSearch from "flexsearch";

import './App.css'

const index = new FlexSearch.Index({
  tokenize: "full",
  cache: true,
  resolution: 9,
});

function App() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLabels, setSearchLabels] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isNewNoteCreated, setIsNewNoteCreated] = useState(true);

  const host = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const randomColor = () => {
    // const blue = Math.floor(Math.random() * 256); // Random value for blue channel
    // const red = Math.floor(Math.random() * 128) + 128; // Random value for red channel (128-255)
    // const green = Math.floor(Math.random() * 128); // Random value for green channel (0-127)

    // return `rgb(${red}, ${green}, ${blue})`;
    let red, green, blue;

    do {
      blue = Math.floor(Math.random() * 128);
      red = Math.floor(Math.random() * 128) + 50;
      green = Math.floor(Math.random() * 128) + 50;
    } while (red + green + blue < 200); // Ensure the sum of RGB values is high enough to avoid black-related colors

    return `rgb(${red}, ${green}, ${blue})`;
  }

  const flexSearchAdd = (note) => {
    index.add(note.id, note.note + " " + note.labels.map(label => label.name).join(" "));
  }

  // Load items from data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`${host}/notes`,{
          method: 'GET'
        })
        .then(response => response.json())
        .then(jsonData => {
          const newData = jsonData.map(item => ({
            ...item,
            labels: item.labels.map(label => ({ name: label, color: randomColor() }))
          }))
          setData(newData);
          setResults(newData);
          jsonData.forEach(note => {
            flexSearchAdd(note)
          });
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData()
  }, [host]);

  useEffect(() => {
    const searchText = searchQuery + " " + searchLabels.join(" ");
    setResults(
      data.filter(item => {
        if (searchText === ' ') return true;
        return index.search(searchText).includes(item.id)
      })
    );
  }, [searchQuery, data, searchLabels]);

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
          const newData = {
            ...res_data,
            labels: res_data.labels.map(label => ({ name: label, color: randomColor() }))
          }
          flexSearchAdd(note)
          setData([...data, newData]);
        }
        setShowResult(true);
        setTimeout(() => setShowResult(false), 2000);
      });
    setShowPopup(false);
  };

  const handleLabelSelect = (label) => {
    if (!searchLabels.includes(label)) {
      setSearchLabels([...searchLabels, label]);
    }
    
  }

  const handleSearchLabelClick = (label) => {
    setSearchLabels(searchLabels.filter(item => item !== label));
  }

  return (
    <Container style={styles.appContainer}>
      <Section minSize={150} defaultSize={250} style={styles.section}>
        <LeftBar labels={new Set(data.flatMap(item => item.labels.map((label) => label.name)))} onNewItemClick={handleNewItemClick} handleLabelSelect={handleLabelSelect} />
      </Section>
      <Bar size={1} style={{ background: '#444444', cursor: 'col-resize' }} />
      <Section minSize={1400} style={styles.section}>
        <RightBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          results={results}
          searchLabels={searchLabels}
          handleSearchLabelClick={handleSearchLabelClick}
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