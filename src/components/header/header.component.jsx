import './header.styles.scss'

import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/user/user.selectors'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../store/user/user.action'

import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(currentUserSelector)
    const { name, companyName } = user;

    const resetUser = {
        user: {},
        accessToken: ''
    }

    return (
        <div className='header-container'>
            <div className='content'>
                <span className='companyName'>{companyName}</span>
                <span className='userName'>{name}</span>
            </div>

            <span className='logout' onClick={() => {
                dispatch(setCurrentUser(resetUser))
                navigate('/')
            }}>Logout</span>
        </div>
    )
}

export default Header