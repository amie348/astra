import './leads.styles.scss'

import ReactBootstrapTable from './leads-components/leads-table/leads-table.component'

import { useEffect, useState } from "react"
import axios from "axios"

import { useSelector } from "react-redux"
import { isSideNavBarOpenSelector } from "../../store/dashboard/dashboard.selector"
import { currentUserSelector } from "../../store/user/user.selectors"
import { leadsSelector } from "../../store/leads/leads.selectors"

import { useDispatch } from "react-redux"
import { fetchLeadsStart, fetchLeadsSuccess, setLeadsRawData, setIsLoading } from "../../store/leads/leads.action"
import { DeleteLeadDialogue } from "./leads-components/lead-delete-dialogue/lead-delete-component";
import { LeadFIlters } from "./leads-components/lead-filters/lead-filters-component";
import { BASE_API_URL } from "../../assets/config"
import ErrorHandling from "../../components/errorHandler";

const FollowUpLeads = () => {

    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    const { accessToken, user } = useSelector(currentUserSelector)

    const dispatch = useDispatch()

    const { isLoading, pageNumber, offset, clickedRow, leadsRawData, searchFilters } = useSelector(leadsSelector)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [followLeadReRender, setFollowLeadReRender] = useState(false)

    useEffect(() => {

        dispatch(fetchLeadsStart())
        axios.post(`${BASE_API_URL}/api/lead/get`, {
            pageNumber,
            offset,
            searchFilters: { ...searchFilters, funnelStage: "FOLLOW UP" }
        }, {
            headers: {
                authorization: `${accessToken}`
            },
        }
        ).then((response) => {
            console.log(response);
            console.log(user);
            dispatch(setIsLoading(false))
            dispatch(setLeadsRawData(response.data))
            dispatch(fetchLeadsSuccess(response.data.leads))
        }).catch(error => {

            dispatch(setIsLoading(false))
            ErrorHandling(error)

        })


    }, [pageNumber, offset, searchFilters, followLeadReRender])



    const handleChangeShowDeleteModal = () => {
        setShowDeleteModal(false);
    }

    return (
        <div className="layout-container">
            <div className={`${isSideNavBarOpen ? 'layout-body-compressed' : 'layout-body'}`}>
                <div className="layout-content">

                    <DeleteLeadDialogue show={showDeleteModal} onHide={handleChangeShowDeleteModal} followLeadReRender={followLeadReRender} setFollowLeadReRender={setFollowLeadReRender} />

                    <div style={{ marginBottom: "30px" }}>
                        <LeadFIlters funnelStage={"FOLLOW UP"} />
                    </div>
                    <ReactBootstrapTable setShowDeleteModal={setShowDeleteModal} funnelStage={"FOLLOW UP"} followLeadReRender={followLeadReRender} setFollowLeadReRender={setFollowLeadReRender} />

                </div>
            </div>
        </div>
    )
}

export default FollowUpLeads