import { Outlet } from 'react-router-dom';

import Header from '../header/header.component';
import SideNavBar from '../side-nav-bar/side-nav-bar.component';

import './app-layout.styles.scss'

import { useSelector } from 'react-redux';
import { isSideNavBarOpenSelector } from '../../store/dashboard/dashboard.selector';

const AppLayout = () => {
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    return (
        <>
            <SideNavBar />
            <Header />
            <Outlet />
        </>
    )
}

export default AppLayout