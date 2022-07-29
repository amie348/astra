import './side-nav-bar.styles.scss'
import logo from '../../assets/logo/astraLogo.png'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PeopleIcon from '@mui/icons-material/People';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';

import { isSideNavBarOpenSelector } from '../../store/dashboard/dashboard.selector';
import { currentUserSelector } from '../../store/user/user.selectors';
import { setIsSideNavBarOpen } from '../../store/dashboard/dashboard.action';


import { Tooltip, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

const SideNavBar = () => {
    const dispatch = useDispatch()
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    const { user } = useSelector(currentUserSelector)

    const { role, notionUrl, addReportingUrl } = user


    const openNotes = () => {

        if (notionUrl) {
            const newWindow = window.open(notionUrl, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null
        }
    }

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

                        <NavLink className="item" activeClassName='active dg-danger' to='/new-leads'>
                            <div className="item-icon"> <LeaderboardIcon /> </div>
                            <div className={`${isSideNavBarOpen ? 'item-name' : 'no-item-name'}`}>New Leads</div>
                        </NavLink>

                        <NavLink className="item" activeClassName='active dg-danger' to='/follow-up-leads'>
                            <div className="item-icon"> <LeaderboardIcon /> </div>
                            <div className={`${isSideNavBarOpen ? 'item-name' : 'no-item-name'}`}>Follow Up Leads</div>
                        </NavLink>

                        <NavLink className="item" activeClassName='active dg-danger' to='/leads'>
                            <div className="item-icon"> <LeaderboardIcon /> </div>
                            <div className={`${isSideNavBarOpen ? 'item-name' : 'no-item-name'}`}>All Leads</div>
                        </NavLink>
                        {
                            role == 'SUPERADMIN' ?
                                <NavLink className="item" activeClassName='active dg-danger' to='/users'>
                                    <div className="item-icon"> <PeopleIcon /> </div>
                                    <div className={`${isSideNavBarOpen ? 'item-name' : 'no-item-name'}`}>Users</div>
                                </NavLink> :

                                ''
                        }

                        {addReportingUrl ?
                            <NavLink className="item" activeClassName='active dg-danger' to='/ad-reporting'>
                                <div className="item-icon"> <SummarizeIcon /> </div>
                                <div className={`${isSideNavBarOpen ? 'item-name' : 'no-item-name'}`}>Ad Reporting</div>
                            </NavLink>
                            :
                            null
                        }


                        <div className="item" activeClassName='active dg-danger' onClick={openNotes} >
                            <div className="item-icon"> <NoteAltIcon /> </div>
                            <div className={`${isSideNavBarOpen ? 'item-name' : 'no-item-name'}`}>Practice Portal</div>
                        </div>

                    </div>
                </div>

                <div>

                    {/* <div style={{display: "flex", justifyContent: "center"}}>
                        <Tooltip title="Open Notes">
                            <span onClick={openNotes}>
                                <IconButton>
                                    <NoteAltIcon  fontSize='large' />
                                </IconButton>
                            </span>
                        </Tooltip> 
                    </div> */}

                    <div className="sideNavBar-close" onClick={() => { dispatch(setIsSideNavBarOpen(!isSideNavBarOpen)) }}>

                        {isSideNavBarOpen ? <ArrowBackIosNewIcon sx={{ fontSize: '15px', marginRight: '30px', color: 'gray' }} /> : <ArrowForwardIosIcon sx={{ fontSize: '15px', margin: 'auto', color: 'gray' }} />}

                    </div>
                </div>

            </div>
        </>
    )
}

export default SideNavBar