import Modal from 'react-bootstrap/Modal'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react';

import './edit-lead-modal.styles.scss'

import { useSelector } from 'react-redux'
import { leadsSelector } from '../../store/leads/leads.selectors';
import { currentUserSelector } from '../../store/user/user.selectors';
import {BASE_API_URL} from "../../config";


import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// import DatePicker from 'react-date-picker';

import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setShowEditModal, setShowConfirmUpdateModal, fetchLeadsStart, fetchLeadsSuccess, setLeadsRawData, setLeadsUpdateError, setLeadsDeleteError, setLeadsSuccessFullyUpdated, setLeadsSuccessFullyDeleted } from '../../store/leads/leads.action';

import moment from 'moment';
import { Tooltip } from '@mui/material';

const defaultFormFields = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    lastContacted: '',
    contactType: '',
    noOfTimesContacted: 0,
    response: '',
    followUpDate: '',
    funnelStage: '',
    purchasesPrice: "",
    finance: "",
    paidInFull: "",
    futureRevenue: ""
}

function Example() {
    const [updatedAtDate, setUpdatedAtDate] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);
    const dispatch = useDispatch()
    const { showEditModal, clickedRow, showConfirmUpdateModal, pageNumber, offset, deleteError, updateError, successfullyDeleted, successfullyUpdated } = useSelector(leadsSelector)
    const { accessToken } = useSelector(currentUserSelector)
    const { _id, createdAt, email, firstName, lastName, phone, updatedAt, lastContacted, contactType, response, followUpDate, noOfTimesContacted, funnelStage } = clickedRow

    const [updatedValues, setUpdatedValues] = useState(defaultFormFields)
    // console.log('default:', defaultFormFields, "up values:", updatedValues);

    useEffect(() => {

        setUpdatedValues({
            ...updatedValues,
            lastContacted: lastContacted ? moment(lastContacted).format(moment.HTML5_FMT.DATE) : null,
            followUpDate: followUpDate ? moment(followUpDate).format(moment.HTML5_FMT.DATE) : null,
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

    }, [lastContacted, followUpDate, updatedAt, fetchAgain])

    const updateLead = () => {
        setIsLoading(true)
        axios.patch(`${BASE_API_URL}/api/lead/update/${_id}`, updatedValues, {
            headers: {
                authorization: `${accessToken}`
            },
        }
        ).then((response) => {
            setIsLoading(false)
            dispatch(setLeadsSuccessFullyUpdated(true))
            dispatch(setShowConfirmUpdateModal(false))
            dispatch(setShowEditModal(false))

            dispatch(fetchLeadsStart())
            axios.post(`${BASE_API_URL}/api/lead/get`, {
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
                dispatch(setLeadsRawData(response.data))
                dispatch(fetchLeadsSuccess(response.data.leads))
            })

        }).catch(error => {
            setIsLoading(false)
            // setIsError(true)
            dispatch(setLeadsUpdateError(true))
            dispatch(setShowConfirmUpdateModal(false))
            dispatch(setShowEditModal(false))
        })
    }

    return (
        <>
            {successfullyUpdated ? <Alert onClose={() => { dispatch(setLeadsSuccessFullyUpdated(false)) }} sx={{ marginBottom: '10px' }} variant="filled" severity="success" >
                Success - Lead Updated SuccessFully!
            </Alert > : <></>}

            {successfullyDeleted ? <Alert onClose={() => { dispatch(setLeadsSuccessFullyDeleted(false)) }} sx={{ marginBottom: '10px' }} variant="filled" severity="success" >
                Success - Lead Deleted SuccessFully!
            </Alert > : <></>}

            {deleteError ? <Alert onClose={() => { dispatch(setLeadsDeleteError(false)) }} sx={{ marginBottom: '10px' }} variant="filled" severity="error" >
                Error - Couldn't Delete the lead try again!
            </Alert > : <></>
            }

            {updateError ? <Alert onClose={() => { dispatch(setLeadsUpdateError(false)) }} sx={{ marginBottom: '10px' }} variant="filled" severity="error">
                Error - Couldn't Update the lead try again!
            </Alert> : <></>}
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
                                {/*                                 
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Last Contacted"
                                    inputFormat="MM/dd/yyyy"
                                    value={lastContacted}
                                    onChange={(value) => {
                                        // const { name, value } = e.target;
                                        setUpdatedValues({ ...updatedValues, lastContacted: value })
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    />
                            </LocalizationProvider> */}

                                <Form.Label>Last Contacted</Form.Label>
                                <Form.Control
                                    name='lastContacted'
                                    type="date"
                                    defaultValue="dd/mm/yyyy"
                                    placeholder="Enter Last Contacted"
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setUpdatedValues({ ...updatedValues, [name]: value })
                                    }}
                                    value={updatedValues.lastContacted} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridContactType">
                                <Form.Label>Contact Type</Form.Label>
                                {/* <Form.Control name='contactType' type="text" placeholder="Contact Type" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.contactType} /> */}

                                <Form.Select aria-label="Default select example"
                                    name='contactType'
                                    placeholder=""
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setUpdatedValues({ ...updatedValues, [name]: value })
                                    }}
                                    value={updatedValues.contactType}
                                >
                                    <option value="">Select</option>
                                    <option value="PHONE">PHONE</option>
                                    <option value="EMAIL">EMAIL</option>
                                    <option value="PHONE AND EMAIL">PHONE AND EMAIL</option>

                                </Form.Select>

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
                                <Form.Control
                                    name='followUpDate'
                                    type="date"
                                    placeholder=""
                                    defaultValue="dd/mm/yyyy"
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setUpdatedValues({ ...updatedValues, [name]: value })
                                    }}
                                    value={(updatedValues.funnelStage == "NEW LEAD" || updatedValues.funnelStage == "FOLLOW UP") ? updatedValues.followUpDate : null}
                                    disable={(updatedValues.funnelStage == "NEW LEAD" || updatedValues.funnelStage == "FOLLOW UP") ? false : true}

                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridFunnelStage">
                                <Form.Label>Funnel Stage</Form.Label>
                                {/* <Form.Control name='funnelStage' placeholder="" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.funnelStage} /> */}
                                <Form.Select aria-label="Default select example"
                                    name='funnelStage'
                                    placeholder=""
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setUpdatedValues({ ...updatedValues, [name]: value })
                                    }}
                                    value={updatedValues.funnelStage}
                                >
                                    <option value="">Select</option>
                                    <option value="NEW LEAD">NEW LEAD</option>
                                    <option value="CONSULTATION BOOKED">CONSULTATION BOOKED</option>
                                    <option value="CONSULTATION COMPLETE">CONSULTATION COMPLETE</option>
                                    <option value="FOLLOW UP">FOLLOW UP</option>
                                    <option value="OBJECTION">OBJECTION</option>
                                    <option value="WAITING FOR">WAITING FOR</option>
                                    <option value="DEAD">DEAD</option>
                                    <option value="PURCHASED">PURCHASED</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPurchasesPrice">
                                <Form.Label>Purchases Price</Form.Label>
                                <Form.Control name='purchasesPrice' type="number" placeholder="Enter Purchases Price" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.purchasesPrice} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridFinance">
                                <Form.Label>Finance</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    name='finance'
                                    placeholder=""
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setUpdatedValues({ ...updatedValues, [name]: value })
                                    }}
                                    value={updatedValues.finance}
                                >
                                    <option value="">Select</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPaidInFull">
                                <Form.Label>Paid In Full</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    name='paidInFull'
                                    placeholder=""
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setUpdatedValues({ ...updatedValues, [name]: value })
                                    }}
                                    value={updatedValues.paidInFull}
                                >
                                    <option value="">Select</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Form.Select>

                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridFutureRevenue">
                                <Form.Label>Future Revenue</Form.Label>
                                <Form.Control name='futureRevenue' type="number" placeholder="Enter Future Revenue" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.futureRevenue} />
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
                            <Form.Label>Created:</Form.Label>
                            <span style={{ cursor: "pointer" }} >
                                <Tooltip title={moment(createdAt).format(`MMMM Do YYYY, h:mm:ss a`)}>
                                    <span>{" " + moment(createdAt).fromNow()}</span>
                                </Tooltip>
                            </span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridUpdatedAt">
                            <Form.Label>Updated:</Form.Label>
                            <span style={{ cursor: "pointer" }} >
                                <Tooltip title={moment(updatedAt).format(`MMMM Do YYYY, h:mm:ss a`)}>
                                    <span>{" " + moment(updatedAt).fromNow()}</span>
                                </Tooltip>
                            </span>
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