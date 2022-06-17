import Modal from 'react-bootstrap/Modal'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useState } from 'react';

import { useSelector } from 'react-redux'
import { leadsSelector } from '../../store/leads/leads.selectors';

import { useDispatch } from 'react-redux';
import { setShowModal } from '../../store/leads/leads.action';

function Example() {
    const dispatch = useDispatch()
    const { showModal, clickedRow } = useSelector(leadsSelector)
    const { createdAt, email, firstName, lastName, phone, updatedAt, lastContacted, contactType, response } = clickedRow

    return (
        <>

            <Modal
                show={showModal}
                onHide={() => dispatch(setShowModal(false))}
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
                                <Form.Control type="text" placeholder="Enter First Name" value={firstName} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" value={lastName} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={email} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="Enter Phone" value={phone} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastContacted">
                                <Form.Label>Last Contacted</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Contacted" value={lastContacted} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridContactType">
                                <Form.Label>Contact Type</Form.Label>
                                <Form.Control type="text" placeholder="Contact Type" value={contactType} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridNoOfTimesContacted">
                                <Form.Label>No. of times contacted</Form.Label>
                                <Form.Control type="number" placeholder="" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridFollowUpDate">
                                <Form.Label>Follow Up Date</Form.Label>
                                <Form.Control type="text" placeholder="" value={updatedAt} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridFunnelStage">
                                <Form.Label>Funnel Stage</Form.Label>
                                <Form.Control placeholder="" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridResponse">
                            <Form.Label>Response</Form.Label>
                            <Form.Control type="text" placeholder="Enter Rsponse" value={response} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridCreatedAt">
                            <Form.Label>Created At:</Form.Label>
                            <span>{" " + createdAt}</span>
                            {/* <Form.Control type='text' placeholder="" value={createdAt} /> */}
                        </Form.Group>

                        <Button variant="danger" type="button">
                            Update
                        </Button>

                        <Button variant="secondary" type="button" style={{ marginLeft: '10px' }} onClick={() => dispatch(setShowModal(false))}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Example