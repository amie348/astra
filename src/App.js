import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router'

import './App.css';
import Login from './routes/login/login.component';
import Dashboard from './routes/Dashboard/dashboard.component'
import Leads from './routes/leads/leads.component';
import SetPassword from './routes/change-password/change-password.component';

import { useSelector } from 'react-redux'
import { currentUserSelector } from '../src/store/user/user.selectors'

import CreateUsersForm from '../src/routes/users/users-component/create-users-form/create-users-form.component'

import AppLayout from './components/app-layout/app-layout.component'
import Users from './routes/users/users.component';
import Notes from './routes/notes/notes.component';
import UserProfile from './routes/users/users-component/user-profile/user-profile.component';

function App() {
  const { user, accessToken } = useSelector(currentUserSelector)
  const { role } = user
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path='/' element={<Navigate to={`${accessToken ? '/dashboard' : '/login'}`} />} />
      <Route path='/set-password' element={<SetPassword />} />
      <Route path='login' element={<Login />} />

      <Route element={<AppLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='leads' element={<Leads />} />
        <Route path='users' element={role == 'SUPERADMIN' ? <Users /> : <Navigate to={'/dashboard'} />} />
        <Route path='update-users/:id' element={<CreateUsersForm />} />
        <Route path='create-user' element={<CreateUsersForm />} />

        <Route path='ad-reporting' element={<Notes />} />
        <Route path='user-profile' element={<UserProfile />} />
      </Route>
    </Routes >
  );
}

export default App;
