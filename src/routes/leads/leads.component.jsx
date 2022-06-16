import SideNavBar from "../../components/side-nav-bar/side-nav-bar.component"
import './leads.styles.scss'

import Header from "../../components/header/header.component"
import ReactBootstrapTable from '../../components/react-bootstrap-table2/react-bootstrap-table.component'

import { useEffect } from "react"
import axios from "axios"

import { useSelector } from "react-redux"
import { isSideNavBarOpenSelector } from "../../store/dashboard/dashboard.selector"
import { currentUserSelector } from "../../store/user/user.selectors"

import { useDispatch } from "react-redux"
import { setLeadsData } from "../../store/leads/leads.action"


const Leads = () => {
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    const { accessToken } = useSelector(currentUserSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.post('https://astra-crm.herokuapp.com/api/lead/get', {
            pageNumber: 1,
            offset: 5,
            searchFilters: {}
        }, {
            mode: 'no-cors',
            headers: {
                authorization: `${accessToken}`
            },
        }
        ).then((response) => {
            // console.log(response.data.leads);
            dispatch(setLeadsData(response.data.leads))
        })
    }, [])

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