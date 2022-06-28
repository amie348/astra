import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router'

import './App.css';
import Login from './routes/login/login.component';
import Dashboard from './routes/Dashboard/dashboard.component'
import Leads from './routes/leads/leads.component';

import { useSelector } from 'react-redux'
import { currentUserSelector } from '../src/store/user/user.selectors'

import AppLayout from './components/app-layout/app-layout.component'
import Users from './routes/users/users.component';

function App() {
  const { accessToken } = useSelector(currentUserSelector)
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path='/' element={<Navigate to={`${accessToken ? '/dashboard' : '/login'}`} />} />
      <Route path='login' element={<Login />} />

      <Route element={<AppLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='leads' element={<Leads />} />
        <Route path='users' element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
