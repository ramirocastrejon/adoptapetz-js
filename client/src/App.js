import React from 'react';
import MainPages from './components/main/Pages';
import Header from './components/header/Header';
import {BrowserRouter as Router} from 'react-router-dom';
import { DataProvider } from './GlobalState';


function App() {
  return (
   <DataProvider>
     <Router>
        <div className='App'>
          <Header/>
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
