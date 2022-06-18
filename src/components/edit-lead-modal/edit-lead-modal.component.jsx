import Modal from 'react-bootstrap/Modal'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux'
import { leadsSelector } from '../../store/leads/leads.selectors';
import { currentUserSelector } from '../../store/user/user.selectors';

import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setShowEditModal, setShowConfirmUpdateModal } from '../../store/leads/leads.action';

import moment from 'moment';

const defaultFormFields = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    lastContacted: '',
    contactType: '',
    noOfTimesContacted: '',
    response: '',
    followUpDate: '',
    funnelStage: '',
    purchasesPrice: 10,
    finance: false,
    paidInFull: false,
    futureRevenue: 10
}

function Example() {
    const [updatedAtDate, setUpdatedAtDate] = useState()
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()
    const { showEditModal, clickedRow, showConfirmUpdateModal } = useSelector(leadsSelector)
    const { accessToken } = useSelector(currentUserSelector)
    const { _id, createdAt, email, firstName, lastName, phone, updatedAt, lastContacted, contactType, response, followUpDate, noOfTimesContacted, funnelStage } = clickedRow

    const [updatedValues, setUpdatedValues] = useState(defaultFormFields)
    // console.log('default:', defaultFormFields, "up values:", updatedValues);

    useEffect(() => {

        setUpdatedValues({
            ...updatedValues,
            lastContacted: moment(lastContacted).format(moment.HTML5_FMT.DATE),
            followUpDate: followUpDate ? moment(followUpDate).format(moment.HTML5_FMT.DATE) : moment("2022-07-18").format(moment.HTML5_FMT.DATE),
            firstName,
            lastName,
            email,
            phone,
            contactType,
            noOfTimesContacted,
            response,
            funnelStage,
        })
        // setFollowUp(moment(followUpDate).format(moment.HTML5_FMT.DATE))
        setUpdatedAtDate(moment(updatedAt).format(moment.HTML5_FMT.DATE))

        // console.log(lastContactedDate);

    }, [])

    const updateLead = () => {
        console.log('new values to be updated: ', updatedValues);
        setIsLoading(true)
        // console.log('updatedValues: ', updatedValues)
        axios.patch(`https://astra-crm.herokuapp.com/api/lead/update/${_id}`, updatedValues, {
            headers: {
                authorization: `${accessToken}`
            },
        }
        ).then((response) => {
            setIsLoading(false)
            dispatch(setShowConfirmUpdateModal(false))
            dispatch(setShowEditModal(false))
            console.log('update:', response);
            // onHide();
        })
    }

    return (
        <>
            <Modal
                show={showEditModal}
                onHide={() => dispatch(setShowEditModal(false))}
                // dialogClassName="modal-100w" 
                size='xl'
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Edit Lead
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name='firstName' type="text" placeholder="Enter First Name" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.firstName} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name='lastName' type="text" placeholder="Enter Last Name" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.lastName} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name='email' type="email" placeholder="Email" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.email} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control name='phone' type="phone" placeholder="Enter Phone" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.phone} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastContacted">
                                <Form.Label>Last Contacted</Form.Label>
                                <Form.Control name='lastContacted' type="date" placeholder="Enter Last Contacted" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.lastContacted} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridContactType">
                                <Form.Label>Contact Type</Form.Label>
                                <Form.Control name='contactType' type="text" placeholder="Contact Type" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.contactType} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridNoOfTimesContacted">
                                <Form.Label>No. of times contacted</Form.Label>
                                <Form.Control name='noOfTimesContacted' type="number" placeholder="" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.noOfTimesContacted} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridFollowUpDate">
                                <Form.Label>Follow Up Date</Form.Label>
                                <Form.Control name='followUpDate' type="date" placeholder="" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.followUpDate} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridFunnelStage">
                                <Form.Label>Funnel Stage</Form.Label>
                                <Form.Control name='funnelStage' placeholder="" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.funnelStage} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridResponse">
                            <Form.Label>Response</Form.Label>
                            <Form.Control name='response' type="text" placeholder="Enter Rsponse" onChange={(e) => {
                                const { name, value } = e.target;
                                setUpdatedValues({ ...updatedValues, [name]: value })
                            }} value={updatedValues.response} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridCreatedAt">
                            <Form.Label>Created At:</Form.Label>
                            <span>{" " + createdAt}</span>
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="formGridUpdatedAt">
                            <Form.Label>Updated At:</Form.Label>
                            <span>{" " + updatedAtDate}</span>
                        </Form.Group> */}

                        <Button variant="danger" type="button" onClick={() => {
                            dispatch(setShowConfirmUpdateModal(true))
                            dispatch(setShowEditModal(false))
                        }}>
                            Update
                        </Button>

                        <Button variant="secondary" type="button" style={{ marginLeft: '10px' }} onClick={() => {
                            dispatch(setShowEditModal(false))
                        }}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal
                show={showConfirmUpdateModal}
                onHide={() => {
                    dispatch(setShowConfirmUpdateModal(false))
                    dispatch(setShowEditModal(true))
                }}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Lead Update
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!isLoading && (
                        <span>Are you sure to update this Lead?</span>
                    )}
                    {isLoading && <span>Lead is Updating...</span>}
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                dispatch(setShowConfirmUpdateModal(false))
                                dispatch(setShowEditModal(true))
                            }}
                            className="btn btn-light btn-elevate"
                        >
                            Cancel
                        </button>
                        <> </>
                        <button
                            type="button"
                            onClick={updateLead}
                            className="btn btn-danger btn-elevate"
                        >
                            Update
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example