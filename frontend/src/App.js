import React from 'react';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div style={styles.app}>
      <h1 style={styles.header}>Customer 360 Dashboard</h1>
      <Chatbot />
    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
  },
};

export default App;