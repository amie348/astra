import { Button, Form, Col, Row } from 'react-bootstrap'
import { useState } from 'react'

import profileAvatar from '../../../../assets/images/profileAvatar.png'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

import { useSelector } from 'react-redux'
import { isSideNavBarOpenSelector } from '../../../../store/dashboard/dashboard.selector'

const CreateUsersForm = () => {
    const [base64code, setBase64Code] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        notionUrl: '',
        zapierWebhook: '',
    })

    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)

    const profilePictureOnChange = (e) => {
        const files = e.target.files
        const file = files[0]
        setProfileImage(file)
        // getbase64(file)
    }

    const getbase64 = (file) => {
        if (file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                setBase64Code(reader.result)
                console.log(base64code);
            }
        }
    }

    return (
        <>
            <div className="layout-container">
                <div className={`${isSideNavBarOpen ? 'layout-body layout-body-compressed' : 'layout-body'}`}>
                    <div className="layout-content">

                        <Card sx={{ maxWidth: "100%" }} >
                            <CardHeader
                                title="Create New User"
                            >

                            </CardHeader>

                            <Collapse in={true} unmountOnExit>

                                <CardContent >

                                    <Form>
                                        <Row className='mb-3'>
                                            {profileImage ? <img src={URL.createObjectURL(profileImage)} alt="" style={{ width: '150px', height: '150px', border: '2px solid gray', borderRadius: '80px', objectFit: 'cover', padding: '2px', margin: 'auto' }} /> : <img src={profileAvatar} style={{ width: '150px', height: '1   50px', border: 'none', borderRadius: '80px', objectFit: 'contain', padding: '0px', margin: 'auto' }} />}
                                        </Row>
                                        <Row className='mb-3'>
                                            <Form.Group controlId="formGridFile">
                                                <Form.Label>Upload Profile Picture</Form.Label>
                                                <Form.Control type="file" onChange={profilePictureOnChange} />
                                            </Form.Group>
                                        </Row>

                                        {/* <h2 style={{ marginBottom: '30px', fontWeight: '700' }}>Create New User</h2> */}
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control size='md' name='name' type="text" placeholder="Name" onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setFormValues({ ...formValues, [name]: value })
                                                }} value={formValues.name} />
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control size='md' name='email' type="email" placeholder="Email" onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setFormValues({ ...formValues, [name]: value })
                                                }} value={formValues.email} />
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridPhone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control size='md' name='phone' type="text" placeholder="Enter Phone No" onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setFormValues({ ...formValues, [name]: value })
                                                }} value={formValues.phone} />
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridCompanyName">
                                                <Form.Label>Company Name</Form.Label>
                                                <Form.Control size='md' name='companyName' type="text" placeholder="Enter Company Name" onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setFormValues({ ...formValues, [name]: value })
                                                }} value={formValues.companyName} />
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridNotionUrl">
                                                <Form.Label>Notion Url</Form.Label>
                                                <Form.Control size='md'
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
                                            <Form.Group as={Col} controlId="formGridZapierWebHook">
                                                <Form.Label>Zapier Web Hook</Form.Label>
                                                <Form.Control size='md'
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

                                        <Button variant="danger" type="button" disabled={false} style={{ minWidth: '70px' }} onClick={() => {
                                            // searchUsers()
                                        }}>
                                            {false ? <div className="spinner-border spinner-border-sm text-light" role="status">
                                                <span className="sr-only"></span>
                                            </div> : 'Create User'}
                                        </Button>
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

export default CreateUsersForm