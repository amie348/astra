import { Outlet, Link, Navigate } from 'react-router-dom'

import './profile-dropdown.styles.scss'


const ProfileDropDown = () => {
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">

            </div>
            <button><Navigate to={'/'} /></button>
        </div>
    )
}

export default ProfileDropDown