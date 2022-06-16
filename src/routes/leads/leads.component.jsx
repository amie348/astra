import SideNavBar from "../../components/side-nav-bar/side-nav-bar.component"
import './leads.styles.scss'

import Header from "../../components/header/header.component"
import ReactBootstrapTable from '../../components/react-bootstrap-table2/react-bootstrap-table.component'

import { useSelector } from "react-redux"
import { isSideNavBarOpenSelector } from "../../store/dashboard/dashboard.selector"


const Leads = () => {
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    return (
        <div className="leads-container">
            <SideNavBar />
            <div className={`${isSideNavBarOpen ? 'leads-body leads-body-compressed' : 'leads-body'}`}>
                <Header />
                <div className="leads-content">
                    <h1>LEADS</h1>
                    <ReactBootstrapTable />
                </div>
            </div>
        </div>
    )
}

export default Leads