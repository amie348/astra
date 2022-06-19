import SideNavBar from "../../components/side-nav-bar/side-nav-bar.component"
import './leads.styles.scss'

import Header from "../../components/header/header.component"
import ReactBootstrapTable from '../../components/leads-table/leads-table.component'

import { useEffect, useState } from "react"
import axios from "axios"

import { useSelector } from "react-redux"
import { isSideNavBarOpenSelector } from "../../store/dashboard/dashboard.selector"
import { currentUserSelector } from "../../store/user/user.selectors"
import { leadsSelector } from "../../store/leads/leads.selectors"

import { useDispatch } from "react-redux"
import { fetchLeadsStart, fetchLeadsSuccess, setLeadsRawData } from "../../store/leads/leads.action"
import { DeleteLeadDialogue } from "../../components/lead-delete-dialogue/lead-delete-component";
import { LeadFIlters } from "../../components/lead-filters/lead-filters-component";
import { BASE_API_URL } from "../../config"


const Leads = () => {

    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    const { accessToken } = useSelector(currentUserSelector)

    const dispatch = useDispatch()

    const { isLoading, pageNumber, offset, clickedRow, leadsRawData, searchFilters } = useSelector(leadsSelector)
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        console.log(searchFilters);
        dispatch(fetchLeadsStart())
        // https://astra-crm.herokuapp.com/api/lead/get
        axios.post(`${BASE_API_URL}/api/lead/get`, {
            pageNumber,
            offset,
            searchFilters
        }, {
            headers: {
                authorization: `${accessToken}`
            },
        }
        ).then((response) => {
            console.log(response);
            dispatch(setLeadsRawData(response.data))
            dispatch(fetchLeadsSuccess(response.data.leads))
        })


    }, [pageNumber, offset, searchFilters])



    const handleChangeShowDeleteModal = () => {
        setShowDeleteModal(false);
    }



    return (
        <div className="leads-container">
            <SideNavBar />
            <div className={`${isSideNavBarOpen ? 'leads-body leads-body-compressed' : 'leads-body'}`}>
                <Header />
                <div className="leads-content">

                    <DeleteLeadDialogue show={showDeleteModal} onHide={handleChangeShowDeleteModal} />

                    <div style={{ marginBottom: "30px" }}>
                        <LeadFIlters />
                    </div>
                    <ReactBootstrapTable setShowDeleteModal={setShowDeleteModal} />

                </div>
            </div>
        </div>
    )
}

export default Leads