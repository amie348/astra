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
    useEffect(() => {
        let image = new Image();
        image.src = user.dp;
        // setFormValues({...formValues, dp:image.src})
        // console.log(image.src);
        // setProfileImage()
    }, [])
    const [isValidName, setIsValidName] = useState('')
    const [showNameSpinner, setShowNameSpinner] = useState(false)

    const [isValidEmail, setIsValidEmail] = useState('')
    const [showEmailSpinner, setShowEmailSpinner] = useState(false)

    const [isValidCompanyName, setIsValidCompanyName] = useState('')
    const [showCompanyNameSpinner, setShowCompanyNameSpinner] = useState(false)

    const { user } = useSelector(currentUserSelector)

    const [profileImage, setProfileImage] = useState('')
    const [formValues, setFormValues] = useState(user)

    const { name, email, phone, companyName, zapierWebhook } = formValues

    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    const { accessToken } = useSelector(currentUserSelector)

    const inputFile = useRef(null)

    const profilePictureOnChange = (e) => {
        const files = e.target.files
        const file = files[0]
        setProfileImage(file)
        getbase64(file)
    }

    const getbase64 = (file) => {
        if (file) {
            const size = file.size / 1024 / 1024;
            if (size > 2) {
                ErrorHandling('imgSizeExceded');
                setProfileImage('')
            } else {
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    console.log(reader.result);

                    setFormValues({ ...formValues, dp: reader.result })
                    console.log(formValues);
                }
            }
        }
    }

    const checkAvailability = (e) => {
        const { name, value } = e.target
        if (value != '') {
            if (name == 'name') {
                setIsValidName('')
                setShowNameSpinner(true)
            }
            else if (name == 'email') {
                setIsValidEmail('')
                setShowEmailSpinner(true)
            }
            else if (name == 'companyName') {
                setIsValidCompanyName('')
                setShowCompanyNameSpinner(true)
            }
            checkUniqueEntry(name, value)
        }
    }

    const checkUniqueEntry = (name, value) => {
        console.log(name, value);
        axios.post(`${BASE_API_URL}/api/get/unique/users`, { [name]: value }, {
            headers: {
                authorization: `${accessToken}`
            },
        }
        ).then((response) => {
            console.log(response.data.data.unique);
            if (name == 'name') {
                setIsValidName(response.data.data.unique)
                setShowNameSpinner(false)
            }
            if (name == 'email') {
                setIsValidEmail(response.data.data.unique)
                setShowEmailSpinner(false)
            }
            if (name == 'companyName') {
                setIsValidCompanyName(response.data.data.unique)
                setShowCompanyNameSpinner(false)
            }

        }).catch(error => {

        })
    }

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

                                    <Form style={{ width: '500px' }}>
                                        <Row className='mb-4' >
                                            {formValues.dp ?
                                                <img src={formValues.dp} alt="" style={{ width: '150px', height: '150px', border: '2px solid gray', borderRadius: '80px', objectFit: 'cover', padding: '2px', margin: 'auto' }} onClick={() => { inputFile.current.click() }} className='profilePicture' />
                                                :
                                                <img src={profileAvatar} style={{ width: '150px', height: '1   50px', border: 'none', borderRadius: '80px', objectFit: 'contain', padding: '0px', margin: 'auto' }} onClick={() => { inputFile.current.click() }} className='profilePicture' />}

                                            <input type='file' id='file' ref={inputFile} onChange={profilePictureOnChange} style={{ display: 'none' }} />

                                            <p style={{ textAlign: 'center', marginTop: '3px' }}>Upload Profile Picture</p>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} className='input-field-container' controlId="formGridName">
                                                <span className='cu-input-label' >Name</span>

                                                {showNameSpinner ? <div class="spinner-border spinner-border-sm text-danger" role="status">
                                                    <span class="sr-only"></span>
                                                </div> : ''
                                                }

                                                <Form.Control className='cu-input-field' size='md' name='name' type="text" placeholder="Name" onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setFormValues({ ...formValues, [name]: value })
                                                }} value={formValues.name} onBlur={(e) => { checkAvailability(e) }} />


                                            </Form.Group>
                                            <span className={`${isValidName ? 'field-subtext-success' : 'field-subtext-error'} ${showNameSpinner ? 'field-subtext-adjust' : ''} `}>
                                                {isValidName === '' ? '' : isValidName ? 'Name Available' : 'Name already selected'}
                                            </span>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} className='input-field-container' controlId="formGridEmail">
                                                <span className='cu-input-label'>Email</span>

                                                {showEmailSpinner ? <div class="spinner-border spinner-border-sm text-danger" role="status">
                                                    <span class="sr-only"></span>
                                                </div> : ''
                                                }

                                                <Form.Control className='cu-input-field' size='md' name='email' type="email" placeholder="Email" onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setFormValues({ ...formValues, [name]: value })
                                                }} value={formValues.email} onBlur={(e) => { checkAvailability(e) }} />


                                            </Form.Group>
                                            <span className={`${isValidEmail ? 'field-subtext-success' : 'field-subtext-error'} ${showEmailSpinner ? 'field-subtext-adjust' : ''} `}>
                                                {isValidEmail === '' ? '' : isValidEmail ? 'Email Available' : 'Email already selected'}
                                            </span>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} className='input-field-container' controlId="formGridPhone">
                                                <span>Phone</span>
                                                <Form.Control className='cu-input-field' size='md' name='phone' type="text" placeholder="Enter Phone No" onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setFormValues({ ...formValues, [name]: value })
                                                }} value={formValues.phone} />
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} className='input-field-container' controlId="formGridCompanyName">
                                                <span className='cu-input-label'>Company Name</span>

                                                {showCompanyNameSpinner ? <div class="spinner-border spinner-border-sm text-danger" role="status">
                                                    <span class="sr-only"></span>
                                                </div> : ''
                                                }

                                                <Form.Control className='cu-input-field' size='md' name='companyName' type="text" placeholder="Enter Company Name" onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setFormValues({ ...formValues, [name]: value })
                                                }} value={formValues.companyName} onBlur={(e) => { checkAvailability(e) }} />


                                            </Form.Group>
                                            <span className={`${isValidCompanyName ? 'field-subtext-success' : 'field-subtext-error'} ${showCompanyNameSpinner ? 'field-subtext-adjust' : ''} `}>
                                                {isValidCompanyName === '' ? '' : isValidCompanyName ? 'Company Name Available' : 'Company Name already selected'}
                                            </span>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} className='input-field-container' controlId="formGridNotionUrl">
                                                <span>Notion Url</span>
                                                <Form.Control className='cu-input-field' size='md'
                                                    name='notionUrl'
                                                    type="text"
                                                    placeholder="Enter Notion URL"
                                                    onChange={(e) => {
                                                        const { name, value } = e.target;
                                                        setFormValues({ ...formValues, [name]: value })
                                                    }}
                                                    value={formValues.notionUrl} />
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} className='input-field-container' controlId="formGridZapierWebHook">
                                                <span>Zapier Web Hook</span>
                                                <Form.Control className='cu-input-field' size='md'
                                                    name='zapierWebhook'
                                                    type="text"
                                                    placeholder="Enter Zapier Web Hook"
                                                    onChange={(e) => {
                                                        const { name, value } = e.target;
                                                        setFormValues({ ...formValues, [name]: value })
                                                    }}
                                                    value={formValues.zapierWebhook} />
                                            </Form.Group>
                                        </Row>

                                        {/* <Button variant="danger" type="button"
                                            disabled={!(name != '' && email != '' && phone != '' && companyName != '' && zapierWebhook != '')}
                                            style={{ minWidth: '70px' }}
                                            onClick={() => {
                                                createUser()
                                            }}>
                                            {false ? <div className="spinner-border spinner-border-sm text-light" role="status">
                                                <span className="sr-only"></span>
                                            </div> : 'Create User'}
                                        </Button> */}
                                    </Form>

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