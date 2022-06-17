import SideNavBar from "../../components/side-nav-bar/side-nav-bar.component"
import './leads.styles.scss'

import Header from "../../components/header/header.component"
import ReactBootstrapTable from '../../components/leads-table/leads-table.component'

import { useEffect } from "react"
import axios from "axios"

import { useSelector } from "react-redux"
import { isSideNavBarOpenSelector } from "../../store/dashboard/dashboard.selector"
import { currentUserSelector } from "../../store/user/user.selectors"
import { leadsSelector } from "../../store/leads/leads.selectors"

import { useDispatch } from "react-redux"
import { fetchLeadsStart, fetchLeadsSuccess } from "../../store/leads/leads.action"

const Leads = () => {
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    const { accessToken } = useSelector(currentUserSelector)
    const dispatch = useDispatch()
    const { isLoading, pageNumber, offset, clickedRow } = useSelector(leadsSelector)

    useEffect(() => {
        dispatch(fetchLeadsStart())
        axios.post('https://astra-crm.herokuapp.com/api/lead/get', {
            pageNumber,
            offset,
            searchFilters: {}
        }, {
            headers: {
                authorization: `${accessToken}`
            },
        }
        ).then((response) => {
            console.log(response);
            dispatch(fetchLeadsSuccess(response.data.leads))
        })
    }, [pageNumber, offset])

    useEffect(() => {
        // axios.post('https://astra-crm.herokuapp.com/api/lead/get', {
        //     pageNumber,
        //     offset,
        //     searchFilters: {}
        // }, {
        //     headers: {
        //         authorization: `${accessToken}`
        //     },
        // }
        // ).then((response) => {
        //     console.log(response);
        //     dispatch(fetchLeadsSuccess(response.data.leads))
        // })

        console.log(clickedRow);
    }, [clickedRow])

    return (
        <div className="leads-container">
            <SideNavBar />
            <div className={`${isSideNavBarOpen ? 'leads-body leads-body-compressed' : 'leads-body'}`}>
                <Header />
                <div className="leads-content">
                    <ReactBootstrapTable />
                </div>
            </div>
        </div>
    )
}

export default Leads