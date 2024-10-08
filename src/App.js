import React, { useEffect, useState, useRef, useCallback } from 'react';
import DetailedNote from './components/DetailedNote';
import LeftBar from './components/LeftBar';
import NewItemPopup from './components/NewItemPopup';
import NewItemResult from './components/NewItemResult';
import RightBar from './components/RightBar';
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
  const [flexSearchResults, setFlexSearchResults] = useState([]);
  const [ftsResults, setFtsResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlight, setHighlight] = useState('');
  const [searchLabels, setSearchLabels] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [noteClick, setNoteClick] = useState(false);
  const [detailedNote, setDetailedNote] = useState();
  const [isNewNoteCreated, setIsNewNoteCreated] = useState(true);

  const host = process.env.REACT_APP_API_URL || 'http://localhost:5000'

  const timeoutRef = useRef(null); // Timeout for search, using let to allow clearing the timeout

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

  const coloredNote = useCallback((note) => {
    return {
      ...note,
      labels: note.labels.map(label => ({ name: label, color: randomColor() }))
    }
  }, [])

  const flexSearchAdd = useCallback((note) => {
    index.add(note.id, note.note + " " + note.labels.map(label => label.name).join(" "));
  }, [])

  // Load items from data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`${host}/notes`, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(jsonData => {
            const newData = jsonData.map(note => coloredNote(note));
            setData(newData);
            newData.forEach(note => {
              flexSearchAdd(note)
            });
            setResults(newData);
          });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData()
  }, [host, coloredNote, flexSearchAdd]);

  // search for notes by flexSearch, same time async for fts from backend show unique result
  useEffect(() => {
    const resultList = data.filter(item => {
      const ids = [...flexSearchResults, ...ftsResults]
      if (searchQuery === "" && searchLabels.length === 0) {
        return true
      }
      return ids.includes(item.id)
    });
    setResults(resultList);
  }, [ftsResults, flexSearchResults, data]);

  useEffect(() => {
    const searchText = searchQuery + " " + searchLabels.join(" ");
    // Clear previous search timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setHighlight(searchQuery)
      setFlexSearchResults(index.search(searchText));
      if (searchText.length > 0) {
        fetch(`${host}/full-text-search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ note: searchText }),
        })
          .then(response => response.json())
          .then(jsonData => {
            setFtsResults(jsonData.map(item => item.id));
          });
      }
    }, 300); // Delay search, only search after .5 second of inactivity
    return () => { // Clear timeout when unmounting
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery, data, searchLabels, host]);

  // on search change, set query string
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
    fetch(`${host}/notes`, {
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
      .then(jsonData => {
        if (jsonData) {
          setData([...data, coloredNote(jsonData)]);
          flexSearchAdd(jsonData);
          generateLabels(jsonData)
        }
        setShowResult(true);
        setTimeout(() => setShowResult(false), 2000);
      });
    setShowPopup(false);
  };

  const generateLabels = (note) => {
    fetch(`${host}/classify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then(response => response.json())
      .then(jsonData => {
        const newNote = coloredNote(jsonData)
        const newData = data.map(item => item.id === newNote.id ? newNote : item )
        setData(newData)
        flexSearchAdd(newNote)
      });
  }

  const handleLabelSelect = (label) => {
    if (!searchLabels.includes(label)) {
      setSearchLabels([...searchLabels, label]);
    }
  }

  const handleSearchLabelClick = (label) => {
    setSearchLabels(searchLabels.filter(item => item !== label));
  }

  const handleNoteClick = (note) => {
    setNoteClick(true)
    setDetailedNote(note)
  }

  const handleCloseDetailedNote = () => {
    setNoteClick(false)
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
          highlight={highlight}
          onSearchChange={handleSearchChange}
          results={results}
          searchLabels={searchLabels}
          handleSearchLabelClick={handleSearchLabelClick}
          handleNoteClick={handleNoteClick}
        />
      </Section>
      {showPopup && (
        <NewItemPopup
          onClose={() => setShowPopup(false)}
          onAddNote={handleAddNote}
        />
      )}
      <NewItemResult isNewNoteCreated={isNewNoteCreated} showResult={showResult} />
      {noteClick && (
        <DetailedNote 
          detailedNote={detailedNote}
          handleCloseDetailedNote={handleCloseDetailedNote}
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