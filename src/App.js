import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router'

import './App.css';
import Login from './routes/login/login.component';
import Dashboard from './routes/Dashboard/dashboard.component'
import Leads from './routes/leads/leads.component';

function App() {
  const navigate = useNavigate()
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='login' element={<Login />} />

      
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='leads' element={<Leads />} />
      

    </Routes>
  );
}

export default App;
