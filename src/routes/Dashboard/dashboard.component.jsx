import React from 'react'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/user/user.selectors'

import SideNavBar from '../../components/side-nav-bar/side-nav-bar.component'

import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import './dashboard.styles.scss'

const Dashboard = () => {
    const navigate = useNavigate()
    const { user, accessToken } = useSelector(currentUserSelector)
    return (
        <>
            <div className="dashboard-container">
                <SideNavBar />
            </div>


            {/* <h1>Dashboard</h1>
            {
                !accessToken ? <Navigate to='/' /> :
                    <div>
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                    </div>
            } */}
        </>
    )
}

export default Dashboard