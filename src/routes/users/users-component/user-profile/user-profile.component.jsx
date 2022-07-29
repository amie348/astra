import { Button, Form, Col, Row } from 'react-bootstrap'
import { useState } from 'react'
import { useRef } from 'react';

import profileAvatar from '../../../../assets/images/profileAvatar.png'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import axios from 'axios';
import { BASE_API_URL } from '../../../../assets/config';

import ErrorHandling from '../../../../components/errorHandler';

import './user-profile.styles.scss'

import { currentUserSelector } from '../../../../store/user/user.selectors';

import { useSelector } from 'react-redux'
import { isSideNavBarOpenSelector } from '../../../../store/dashboard/dashboard.selector'
import { useEffect } from 'react';

const UserProfile = () => {
    const { user } = useSelector(currentUserSelector)

    const [formValues, setFormValues] = useState(user)

    const { name, email, phone, companyName, zapierWebhook } = formValues

    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    const { accessToken } = useSelector(currentUserSelector)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const pageDoneLoading = () => {
            setTimeout(() => { setIsLoading(false) }, 1000)
        }
        pageDoneLoading()
    }, [])

    return (
        <>
            <div className="layout-container">
                <div className={`${isSideNavBarOpen ? 'layout-body layout-body-compressed' : 'layout-body'}`}>
                    <div className="layout-content">

                        <Card sx={{ maxWidth: "100%" }} >
                            <CardHeader
                                title="User Profile"
                            >

                            </CardHeader>

                            <Collapse in={true} unmountOnExit>
                                <hr style={{ margin: '0px' }} />
                                <CardContent sx={{ display: 'flex', justifyContent: 'center' }} >
                                    {isLoading ?
                                        <div className="SpinnerOverlay">
                                            <div className="spinner-border text-danger mt-3" role="status">
                                                <span className="sr-only"></span>
                                            </div>
                                        </div> :
                                        <Form style={{ width: '500px' }}>
                                            <Row className='mb-4'>
                                                {formValues.dp ?
                                                    <img src={formValues.dp} alt="" style={{ width: '150px', height: '150px', border: '2px solid gray', borderRadius: '80px', objectFit: 'cover', padding: '2px', margin: 'auto' }} />
                                                    :
                                                    <img src={profileAvatar} style={{ width: '150px', height: '1   50px', border: 'none', borderRadius: '80px', objectFit: 'contain', padding: '0px', margin: 'auto' }} />}

                                                <p style={{ textAlign: 'center', marginTop: '3px' }}>Profile Picture</p>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} className='input-field-container' controlId="formGridName">
                                                    <span className='cu-input-label' >Name</span>

                                                    <Form.Control disabled={true} className='cu-input-field' size='md' name='name' type="text" placeholder="Name" value={formValues.name} />
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} className='input-field-container' controlId="formGridEmail">
                                                    <span className='cu-input-label'>Email</span>

                                                    <Form.Control disabled={true} className='cu-input-field' size='md' name='email' type="email" placeholder="Email" value={formValues.email} />
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} className='input-field-container' controlId="formGridPhone">
                                                    <span>Phone</span>
                                                    <Form.Control disabled={true} className='cu-input-field' size='md' name='phone' type="text" placeholder="Phone No" value={formValues.phone} />
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} className='input-field-container' controlId="formGridCompanyName">
                                                    <span className='cu-input-label'>Company Name</span>

                                                    <Form.Control disabled={true} className='cu-input-field' size='md' name='companyName' type="text" placeholder="Company Name" value={formValues.companyName} />
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} className='input-field-container' controlId="formGridNotionUrl">
                                                    <span>Notion Url</span>
                                                    <Form.Control disabled={true} className='cu-input-field' size='md'
                                                        name='notionUrl'
                                                        type="text"
                                                        placeholder="Notion URL"
                                                        value={formValues.notionUrl} />
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} className='input-field-container' controlId="formGridZapierWebHook">
                                                    <span>Zapier Web Hook</span>
                                                    <Form.Control disabled={true} className='cu-input-field' size='md'
                                                        name='zapierWebhook'
                                                        type="text"
                                                        placeholder="Zapier Web Hook"
                                                        value={formValues.zapierWebhook} />
                                                </Form.Group>
                                            </Row>
                                        </Form>

                                    }



                                </CardContent>

                            </Collapse>

                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile