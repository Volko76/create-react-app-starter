import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Create from './components/create';
import Read from './components/read';
import { Menu } from 'semantic-ui-react';
import Update from './components/update';
import axios from 'axios';
import Tarifications from './components/tarifications';
import Scan from './components/scan';

axios.defaults.baseURL = 'http://localhost:3001';

function App() {
  return (
    <Router>
      <div className="main">
        <Menu>
          <Menu.Item as={Link} to="/create" name='send_colis'>
            Envoyer un colis
          </Menu.Item>

          <Menu.Item as={Link} to="/read" name='reviews'>
            Suivre son colis
          </Menu.Item>

          <Menu.Item as={Link} to="/scan" name='scan'>
            Scanner un colis
          </Menu.Item>

          <Menu.Item as={Link} to="/tarifs" name='tarifs'>
            Tarifications
          </Menu.Item>
        </Menu>
        <h2 className="main-header">Rya - Système de suivi de colis</h2>

        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update" element={<Update />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/tarifs" element={<Tarifications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;