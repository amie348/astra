import Modal from 'react-bootstrap/Modal'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react';

import './edit-lead-modal.styles.scss'

import { useSelector } from 'react-redux'
import { leadsSelector } from '../../../../store/leads/leads.selectors';
import { currentUserSelector } from '../../../../store/user/user.selectors';
import { BASE_API_URL } from "../../../../assets/config";
import ErrorHandling from '../../../../components/errorHandler';

import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setShowEditModal, setShowConfirmUpdateModal, fetchLeadsStart, fetchLeadsSuccess, setLeadsRawData, setClickedRow } from '../../../../store/leads/leads.action';

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
    purchasesPrice: 0,
    service: '',
    platform: '',
    bestTimeToContact: '',
    consultationDate: '',
    consultationTime: '',
}

function Example({ reRender, setReRender, newLeadReRender, setNewLeadReRender, followLeadReRender, setFollowLeadReRender }) {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchAgain, setFetchAgain] = useState(false);

    const dispatch = useDispatch()

    const { showEditModal, clickedRow, showConfirmUpdateModal, pageNumber, offset } = useSelector(leadsSelector)
    const { accessToken } = useSelector(currentUserSelector)

    const [updatedValues, setUpdatedValues] = useState(defaultFormFields)
    const [createdUpdatedAt, setCreatedUpdatedAt] = useState({})

    useEffect(() => {
        // console.log(clickedRow);

        if (clickedRow._id) {
            axios.get(`${BASE_API_URL}/api/lead/get/${clickedRow._id}`,
                {
                    headers: {
                        authorization: `${accessToken}`
                    },
                }
            ).then((res) => {
                // console.log(res.data.data);
                const result = res.data.data

                setUpdatedValues({
                    ...updatedValues,
                    lastContacted: result.lastContacted ? moment(result.lastContacted).format(moment.HTML5_FMT.DATE) : '',
                    followUpDate: result.followUpDate ? moment(result.followUpDate).format(moment.HTML5_FMT.DATE) : '',
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    phone: result.phone,
                    contactType: result.contactType,
                    noOfTimesContacted: result.noOfTimesContacted,
                    response: result.response,
                    funnelStage: result.funnelStage,
                    purchasesPrice: result.purchasesPrice,
                    service: result.service,
                    platform: result.platform,
                    bestTimeToContact: result.bestTimeToContact,
                    consultationDate: result.consultationBooked ? moment(result.consultationBooked).format(moment.HTML5_FMT.DATE) : '',
                    consultationTime: result.consultationBooked ? moment(result.consultationBooked).format(moment.HTML5_FMT.TIME) : '',
                })

                setCreatedUpdatedAt({
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt
                })

            }).catch(error => {
                ErrorHandling(error)
            })
        }

    }, [clickedRow, fetchAgain])

    const updateLead = () => {
        setIsLoading(true)
        axios.patch(`${BASE_API_URL}/api/lead/update/${clickedRow._id}`, updatedValues, {
            headers: {
                authorization: `${accessToken}`
            },
        }
        ).then((response) => {
            setIsLoading(false)
            ErrorHandling('SuccessLeadUpdated')
            dispatch(setShowConfirmUpdateModal(false))
            dispatch(setShowEditModal(false))
            if (reRender !== undefined) {
                console.log('rerender');
                setReRender(!reRender)
            } else if (newLeadReRender !== undefined) {
                console.log('newleadrerender');
                setNewLeadReRender(!newLeadReRender)
            } else if (followLeadReRender !== undefined) {
                console.log('followleadrerender');
                setFollowLeadReRender(!followLeadReRender)
            }

        }).catch(error => {
            setIsLoading(false)
            ErrorHandling('ErrorFailedToUpdateLead')
            dispatch(setShowConfirmUpdateModal(false))
            dispatch(setShowEditModal(false))
        })
    }

    return (
        <>
            <Modal
                show={showEditModal}
                onHide={() => {
                    setUpdatedValues({})
                    dispatch(setClickedRow({}))
                    dispatch(setShowEditModal(false))
                }
                }
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
                                <Form.Control size='sm' name='firstName' type="text" placeholder="Enter First Name" disabled={true} onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.firstName} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control size='sm' name='lastName' type="text" placeholder="Enter Last Name" disabled={true} onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.lastName} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control size='sm' name='email' type="email" placeholder="Email" disabled={true} onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.email} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridService">
                                <Form.Label>Service</Form.Label>
                                <Form.Control size='sm' name='service' type="text" placeholder="Enter Service" disabled={true} onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.service} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPlatform">
                                <Form.Label>Platform</Form.Label>
                                <Form.Control size='sm' name='platform' type="text" placeholder="Enter Platform" disabled={true} onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.platform} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control size='sm' name='phone' type="phone" placeholder="Enter Phone" disabled={true} onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.phone} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} controlId="formGridBestTimeToContact">
                                <Form.Label>Best Time To Contact</Form.Label>
                                <Form.Control size='sm'
                                    name='bestTimeToContact'
                                    type="text"
                                    placeholder="Enter Best Time To Contact"
                                    disabled={true}
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setUpdatedValues({ ...updatedValues, [name]: value })
                                    }}
                                    value={updatedValues.bestTimeToContact} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastContacted">
                                <Form.Label>Last Contacted</Form.Label>
                                <Form.Control size='sm'
                                    name='lastContacted'
                                    type="date"
                                    placeholder="Enter Last Contacted"
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setUpdatedValues({ ...updatedValues, [name]: value })
                                    }}
                                    value={updatedValues.lastContacted} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridContactType">
                                <Form.Label>Contact Type</Form.Label>
                                {/* <Form.Control size='sm' name='contactType' type="text" placeholder="Contact Type" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.contactType} /> */}

                                <Form.Select size='sm' aria-label="Default select example"
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
                                <Form.Control size='sm' name='noOfTimesContacted' type="number" placeholder="" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.noOfTimesContacted} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridFollowUpDate">
                                <Form.Label>Follow Up Date</Form.Label>
                                <Form.Control size='sm'
                                    name='followUpDate'
                                    type="date"
                                    placeholder=""
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
                                {/* <Form.Control size='sm' name='funnelStage' placeholder="" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.funnelStage} /> */}
                                <Form.Select size='sm' aria-label="Default select example"
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

                        <Row>
                            <Form.Group as={Col} controlId="formGridPurchasesPrice">
                                <Form.Label>Purchases Price</Form.Label>
                                <Form.Control size='sm' name='purchasesPrice' type="number" placeholder="Enter Purchases Price" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setUpdatedValues({ ...updatedValues, [name]: value })
                                }} value={updatedValues.purchasesPrice} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridConsultationDate">
                                <Form.Label>Consultation Date</Form.Label>
                                <Form.Control size='sm'
                                    name='consultationDate'
                                    type="date"
                                    placeholder="Enter Consultation Date"
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setUpdatedValues({ ...updatedValues, [name]: value })
                                    }}
                                    value={updatedValues.consultationDate} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridConsultationTime">
                                <Form.Label>Consultation Time</Form.Label>
                                <Form.Control size='sm'
                                    name='consultationTime'
                                    type="time"
                                    placeholder="Enter Best Consultation Time"
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setUpdatedValues({ ...updatedValues, [name]: value })
                                    }}
                                    value={updatedValues.consultationTime} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridResponse">
                            <Form.Label>Response</Form.Label>
                            <Form.Control as="textarea" rows={3} size='sm' name='response' onChange={(e) => {
                                const { name, value } = e.target;
                                setUpdatedValues({ ...updatedValues, [name]: value })
                            }} value={updatedValues.response} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridCreatedAt">
                            <Form.Label>Created:</Form.Label>
                            <span style={{ cursor: "pointer" }} >
                                <Tooltip title={moment(createdUpdatedAt.createdAt).format(`MMMM Do YYYY, h:mm:ss a`)}>
                                    <span>{" " + moment(createdUpdatedAt.createdAt).fromNow()}</span>
                                </Tooltip>
                            </span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridUpdatedAt">
                            <Form.Label>Updated:</Form.Label>
                            <span style={{ cursor: "pointer" }} >
                                <Tooltip title={moment(createdUpdatedAt.updatedAt).format(`MMMM Do YYYY, h:mm:ss a`)}>
                                    <span>{" " + moment(createdUpdatedAt.updatedAt).fromNow()}</span>
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

            <Modal show={showConfirmUpdateModal}
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
                            disabled={isLoading}
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
                            style={{ minWidth: '70px' }}
                            type="button"
                            onClick={updateLead}
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

export default Example