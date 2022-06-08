import React from 'react'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/user/user.selectors'

import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const { user, accessToken } = useSelector(currentUserSelector)
    return (
        <>
            <h1>Dashboard</h1>
            {
                !accessToken ? <Navigate to='/' /> :
                    <div>
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                    </div>
            }
        </>
    )
}

export default Dashboard