import React from 'react';
import './App.css';
import MainForm from './components/Form/MainForm';
import MainTable from './components/Table/MainTable';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <MainForm />
        <MainTable />
      </div>
    </div>
  );
}

export default App;
