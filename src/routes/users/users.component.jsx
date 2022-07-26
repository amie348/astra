import './users.styles.scss'

import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import axios from 'axios'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { isSideNavBarOpenSelector } from '../../store/dashboard/dashboard.selector'
import { currentUserSelector } from '../../store/user/user.selectors'
import { usersSelector } from '../../store/users/users.selectors'

import EditUserModal from './users-component/edit-user-modal/edit-user-modal.component'
import { DeleteUserDialogue } from './users-component/user-delete-dialogue/user-delete-component'
import UsersTable from './users-component/users-table/users-table.component'

import ErrorHandling from '../../components/errorHandler'

import { BASE_API_URL } from "../../assets/config"
import { fetchUsersFailed, fetchUsersStart, fetchUsersSuccess, setUsersRawData } from '../../store/users/users.action'
import { UsersFilters } from './users-component/users-filters/users-filters.component'
import { Button } from 'react-bootstrap'

const Users = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const [reRender, setReRender] = useState(false)

    const dispatch = useDispatch()

    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    const { accessToken } = useSelector(currentUserSelector)
    const { usersPageNumber, usersOffset, usersSearchFilters, usersData } = useSelector(usersSelector)

    useEffect(() => {

        dispatch(fetchUsersStart())
        axios.post(`${BASE_API_URL}/api/user/get`, {
            pageNumber: usersPageNumber,
            offset: usersOffset,
            searchFilters: usersSearchFilters
        }, {
            headers: {
                authorization: `${accessToken}`
            }
        },
        ).then((response) => {
            // console.log(response);
            dispatch(setUsersRawData(response.data))
            dispatch(fetchUsersSuccess(response.data.users))
        }).catch(error => {
            dispatch(fetchUsersFailed(error))
            ErrorHandling(error)
        })


    }, [usersPageNumber, usersOffset, usersSearchFilters, reRender])

    const handleChangeShowDeleteModal = () => {
        setShowDeleteModal(false)
    }

    const handleChangeShowEditModal = () => {
        setShowEditModal(false)
    }

    return (
        <div className="layout-container">
            <div className={`${isSideNavBarOpen ? 'layout-body-compressed' : 'layout-body'}`}>
                <div className="layout-content">

                    <DeleteUserDialogue show={showDeleteModal} onHide={handleChangeShowDeleteModal} setReRender={setReRender} reRender={reRender} />
                    <EditUserModal setShowEditModal={setShowEditModal} show={showEditModal} onHide={handleChangeShowEditModal} />

                    <div style={{ marginBottom: "30px" }}>
                        <UsersFilters />
                    </div>

                    <UsersTable setShowEditModal={setShowEditModal} setShowDeleteModal={setShowDeleteModal} />
                </div>
            </div>
        </div>
    )
}

export default Users