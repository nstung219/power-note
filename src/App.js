import React, { useState } from 'react';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import NewItemPopup from './components/NewItemPopup';
import { Container, Section, Bar } from '@column-resizer/react';

function App() {
  const [labels, setLabels] = useState(['Tag1', 'Tag2']);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Filter results based on query
    setResults(
      labels
        .filter((label) => label.toLowerCase().includes(query.toLowerCase()))
        .map((label) => ({ string: label, labels: [label] }))
    );
  };

  const handleNewItemClick = () => {
    setShowPopup(true);
  };

  const handleAddLabel = (newLabels) => {
    setLabels([...labels, ...newLabels]);
    setShowPopup(false);
  };

  return (
    <Container style={styles.appContainer}>
      <Section minSize={150} defaultSize={300} style={styles.section}>
        <LeftBar labels={labels} onNewItemClick={handleNewItemClick} />
      </Section>
      <Bar size={1} style={{ background: 'currentColor', cursor: 'col-resize' }} />
      <Section minSize={1400} style={styles.section}>
        <RightBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          results={results}
        />
      </Section>
      {showPopup && (
        <NewItemPopup
          searchQuery={searchQuery}
          onClose={() => setShowPopup(false)}
          onAddLabel={handleAddLabel}
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