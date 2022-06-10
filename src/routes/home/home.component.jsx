import './home.styles.scss'

import SideNavBar from '../../components/side-nav-bar/side-nav-bar.component'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className="home-container">
                <SideNavBar />
                <Outlet />
            </div>
        </>
    )
}

export default Home