import './side-nav-bar.styles.scss'
import logo from '../../assets/logo/astraLogo.png'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import { isSideNavBarOpenSelector } from '../../store/dashboard/dashboard.selector';
import { setIsSideNavBarOpen } from '../../store/dashboard/dashboard.action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

const SideNavBar = () => {
    const dispatch = useDispatch()
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    return (
        <>
            <div className={`${isSideNavBarOpen ? 'sideNavBar-container' : 'closeSideNavBar'} `}>
                <div className="sideNavBar-body">
                    <img className={`${isSideNavBarOpen ? '' : 'logo-small'}`} src={logo} alt="" />

                    <div className="sideNavBar-items">
                        <NavLink className='item' activeClassName='active' to='/dashboard'>
                            <div className="item-icon"> <DashboardIcon /> </div>
                            <div className={`${isSideNavBarOpen ? 'item-name' : 'no-item-name'}`}>Dashboard</div>
                        </NavLink>

                        <NavLink className="item" activeClassName='active dg-danger' to='/leads'>
                            <div className="item-icon"> <LeaderboardIcon /> </div>
                            <div className={`${isSideNavBarOpen ? 'item-name' : 'no-item-name'}`}>Leads</div>
                        </NavLink>
                    </div>
                </div>

                <div className="sideNavBar-close" onClick={() => { dispatch(setIsSideNavBarOpen(!isSideNavBarOpen)) }}>

                    {isSideNavBarOpen ? <ArrowBackIosNewIcon sx={{ fontSize: '15px', marginRight: '30px', color: 'gray' }} /> : <ArrowForwardIosIcon sx={{ fontSize: '15px', margin: 'auto', color: 'gray' }} />}
                </div>
            </div>
        </>
    )
}

export default SideNavBar