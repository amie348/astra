import './header.styles.scss'

import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/user/user.selectors'
import { isProfileDropDownOpenSelector } from '../../store/dashboard/dashboard.selector';

import { useDispatch } from 'react-redux';
import { setIsProfileDropDownOpen } from '../../store/dashboard/dashboard.action';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileDropDown from '../profile-dropdown/profile-dropdown.component'

const Header = () => {
    const dispatch = useDispatch()

    const { user } = useSelector(currentUserSelector)
    const isProfileDropDownOpen = useSelector(isProfileDropDownOpenSelector)
    const { name, companyName } = user;

    return (
        <div className='header-container'>
            <div className='content'>
                <span className='companyName'>{companyName}</span>
                <span className='userName'>
                    <span onClick={() => { dispatch(setIsProfileDropDownOpen(!isProfileDropDownOpen)) }}> <AccountCircleIcon /> </span>
                    {name}
                </span>
            </div>

            {isProfileDropDownOpen && <ProfileDropDown />}
        </div>
    )
}

export default Header