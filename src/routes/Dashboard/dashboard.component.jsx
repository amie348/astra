import React from 'react'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/user/user.selectors'

import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import './dashboard.styles.scss'

const Dashboard = () => {
    const navigate = useNavigate()
    const { user, accessToken } = useSelector(currentUserSelector)
    return (
        <>
            <div>
                <h1>DASHBOARD</h1>

                {
                    !accessToken ? <Navigate to='/' /> :
                        <div>
                            <h2>{user.username}</h2>
                            <p>{user.email}</p>
                        </div>
                }
            </div>
        </>
    )
}

export default Dashboard