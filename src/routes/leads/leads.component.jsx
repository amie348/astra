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
import { fetchLeadsStart, fetchLeadsSuccess } from "../../store/leads/leads.action"
import  {DeleteLeadDialogue}  from "../../components/lead-delete-dialogue/lead-delete-component";


const Leads = () => {

    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    const { accessToken } = useSelector(currentUserSelector)
    
    const dispatch = useDispatch()
    
    const { isLoading, pageNumber, offset, clickedRow } = useSelector(leadsSelector)
    const [showDeleteModal, setShowDeleteModal] = useState(false);


 

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


    const handleChangeShowDeleteModal = () => {

        setShowDeleteModal(false);

    }

    useEffect(() => {

        // axios.delete(`https://astra-crm.herokuapp.com/api/lead/delete/${clickedRow._id}`, {
        //     headers: {
        //         authorization: `${accessToken}`
        //     },
        // }
        // ).then((response) => {
        //     console.log('delete:', response);
        //     // dispatch(fetchLeadsSuccess(response.data.leads))
        // })

        // setShowDeleteModal(!showDeleteModal);

        console.log(`showDeleteModal`, showDeleteModal)
        console.log(clickedRow);

    }, [clickedRow])

    return (
        <div className="leads-container">
            <SideNavBar />
            <div className={`${isSideNavBarOpen ? 'leads-body leads-body-compressed' : 'leads-body'}`}>
                <Header />
                <div className="leads-content">
                    
                    <DeleteLeadDialogue show={showDeleteModal} onHide={handleChangeShowDeleteModal}/>

                    <ReactBootstrapTable setShowDeleteModal={setShowDeleteModal}/>
                
                </div>
            </div>
        </div>
    )
}

export default Leads