import React from 'react'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/user/user.selectors'

import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import SideNavBar from '../../components/side-nav-bar/side-nav-bar.component'
import { Outlet } from 'react-router-dom'

import './dashboard.styles.scss'
import Header from '../../components/header/header.component'
import ReactBootstrapTable from '../../components/react-bootstrap-table2/react-bootstrap-table.component'

const Dashboard = () => {
    const navigate = useNavigate()
    const { user, accessToken } = useSelector(currentUserSelector)
    return (
        <div className='dashboard-container'>
            <SideNavBar />
            <div className='dashboard-body'>
                <Header />
                <div className="dashboard-content">
                    <h1>DASHBOARD</h1>

                    {
                        !accessToken ? <Navigate to='/' /> :
                            <div>
                                <h2>{user.username}</h2>
                                <p>{user.email}</p>
                            </div>
                    }

                    <ReactBootstrapTable />
                </div>
            </div>
        </div>
    )
}

export default Dashboard