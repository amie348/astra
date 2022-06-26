import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/user/user.selectors'
import { isSideNavBarOpenSelector } from '../../store/dashboard/dashboard.selector'

import { Navigate, Route, Routes } from 'react-router-dom'

import SideNavBar from '../../components/side-nav-bar/side-nav-bar.component'

import './dashboard.styles.scss'
import Header from '../../components/header/header.component'

const Dashboard = () => {
    const { accessToken } = useSelector(currentUserSelector)
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)

    return (
        <div className='layout-container'>
            <div className={`${isSideNavBarOpen ? 'layout-body layout-body-compressed' : 'layout-body'}`} >
                <div className="layout-content">
                    <h1>DASHBOARD</h1>
                </div>
            </div>
        </div>
    )
}

export default Dashboard