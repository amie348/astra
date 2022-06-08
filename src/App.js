import { Routes, Route } from 'react-router-dom';

import './App.css';
import Login from './routes/login/login.component';
import Dashboard from './routes/Dashboard/dashboard.component'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
