import SideNavBar from "../../components/side-nav-bar/side-nav-bar.component"
import './leads.styles.scss'

import Header from "../../components/header/header.component"

const Leads = () => {
    return (
        <div className="leads-container">
            <SideNavBar />
            <div className='leads-body'>
                <Header />
                <div className="leads-content">
                    <h1>LEAD</h1>
                </div>
            </div>
        </div>
    )
}

export default Leads