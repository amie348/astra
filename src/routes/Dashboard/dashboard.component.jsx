import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/user/user.selectors'
import { isSideNavBarOpenSelector } from '../../store/dashboard/dashboard.selector'

import { Navigate } from 'react-router-dom'

import SideNavBar from '../../components/side-nav-bar/side-nav-bar.component'

import './dashboard.styles.scss'
import Header from '../../components/header/header.component'

const Dashboard = () => {
    const { accessToken } = useSelector(currentUserSelector)
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)

    console.log(accessToken);

    return (
        <div className='dashboard-container'>
            <SideNavBar />
            <div className={`${isSideNavBarOpen ? 'dashboard-body dashboard-body-compressed' : 'dashboard-body'}`} >
                <Header />
                <div className="dashboard-content">
                    <h1>DASHBOARD</h1>

                    {
                        !accessToken ? <Navigate to='/' /> :
                            <div>
                                {/* <h2>{user.name}</h2>
                                <p>{user.email}</p> */}
                            </div>
                    }

                    {/* <ReactBootstrapTable /> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard