import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../store/user/user.action'
import { setIsProfileDropDownOpen } from '../../store/dashboard/dashboard.action'
import './profile-dropdown.styles.scss'

const resetUser = {
    user: {},
    accessToken: ''
}

const ProfileDropDown = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className="profile-dropdown-container">
            <button className="btn btn-danger" onClick={() => {
                dispatch(setIsProfileDropDownOpen(false))
                dispatch(setCurrentUser(resetUser))
                navigate('/')
            }}>
                Logout
            </button>
        </div>
    )
}

export default ProfileDropDown