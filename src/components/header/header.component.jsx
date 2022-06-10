import './header.styles.scss'

import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/user/user.selectors'

const Header = () => {

    const { user } = useSelector(currentUserSelector)
    const { username, companyName } = user;


    return (
        <div className='header-container'>
            <span className='companyName'>{companyName}</span>
            <span className='userName'>{username}</span>
        </div>
    )
}

export default Header