import Modal from 'react-bootstrap/Modal'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react';

import './edit-user-modal.styles.scss'

import { useSelector } from 'react-redux'
import { usersSelector } from '../../../../store/users/users.selectors';
import { currentUserSelector } from '../../../../store/user/user.selectors';
import { BASE_API_URL } from "../../../../assets/config";
import ErrorHandling from '../../../../components/errorHandler';

import axios from 'axios';

import { useDispatch } from 'react-redux';

import { fetchUsersStart, fetchUsersSuccess, setUsersClickedRow, setUsersRawData } from '../../../../store/users/users.action'

import moment from 'moment';
import { Tooltip } from '@mui/material';

const defaultFormFields = {
    active: ''
}

function EditUserModal({ show, onHide, setShowEditModal }) {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const [showConfirmUpdateModal, setShowConfirmUpdateModal] = useState(false)

    const dispatch = useDispatch()
    const { usersClickedRow, usersPageNumber, usersOffset } = useSelector(usersSelector)
    const { accessToken } = useSelector(currentUserSelector)
    const { _id, active } = usersClickedRow

    const [updatedValues, setUpdatedValues] = useState('')

    useEffect(() => {
        console.log(usersClickedRow);
        setUpdatedValues(active)
    }, [active])

    const updateUser = () => {
        setIsLoading(true)
        axios.patch(`${BASE_API_URL}/api/user/update/${_id}`, { active: updatedValues }, {
            headers: {
                authorization: `${accessToken}`
            },
        }
        ).then((response) => {
            setIsLoading(false)
            setUpdatedValues('')
            ErrorHandling('SuccessUserUpdated')
            setShowConfirmUpdateModal(false)
            setShowEditModal(false)

            dispatch(fetchUsersStart())
            axios.post(`${BASE_API_URL}/api/user/get`, {
                pageNumber: usersPageNumber,
                offset: usersOffset,
                searchFilters: {}
            }, {
                headers: {
                    authorization: `${accessToken}`
                },
            }
            ).then((response) => {
                dispatch(setUsersRawData(response.data))
                dispatch(fetchUsersSuccess(response.data.users))
            })

        }).catch(error => {
            setIsLoading(false)
            ErrorHandling('ErrorFailedToUpdateUser')
            setShowConfirmUpdateModal(false)
            setShowEditModal(false)
        })
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    setUpdatedValues({})
                    dispatch(setUsersClickedRow({}))
                    onHide()
                }
                }
                // dialogClassName="modal-100w" 
                size='md'
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Edit User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridUserStatus">
                                <Form.Label>User Status</Form.Label>

                                <Form.Select size='sm' aria-label="Default select example"
                                    name='active'
                                    placeholder=""
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setUpdatedValues(value)
                                    }}
                                    value={updatedValues}
                                >
                                    <option value="">Select</option>
                                    <option value="true">Activate</option>
                                    <option value="false">Deactivate</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Button variant="danger" type="button" onClick={() => {
                            setShowConfirmUpdateModal(true)
                            setShowEditModal(false)
                        }}>
                            Update
                        </Button>

                        <Button variant="secondary" type="button" style={{ marginLeft: '10px' }} onClick={() => {
                            setShowEditModal(false)
                        }}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal
                show={showConfirmUpdateModal}
                onHide={() => {
                    setShowConfirmUpdateModal(false)
                    setShowEditModal(true)
                }}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        User Update
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!isLoading && (
                        <span>Are you sure to update this User?</span>
                    )}
                    {isLoading && <span>User is Updating...</span>}
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button
                            disabled={isLoading}
                            type="button"
                            onClick={() => {
                                setShowConfirmUpdateModal(false)
                                setShowEditModal(true)
                            }}
                            className="btn btn-light btn-elevate"
                        >
                            Cancel
                        </button>
                        <> </>
                        <button
                            style={{ minWidth: '70px' }}
                            type="button"
                            onClick={updateUser}
                            className="btn btn-danger btn-elevate"
                            disabled={isLoading}
                        >
                            {isLoading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="sr-only"></span>
                            </div> : 'Update'}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditUserModal