import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { usersSelector } from '../../../../store/users/users.selectors';

import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { Button, Form, Col, Row } from 'react-bootstrap'
import { Tooltip } from '@mui/material';

import { setUsersSearchFilters, setUsersIsLoading } from '../../../../store/users/users.action';
import { currentUserSelector } from '../../../../store/user/user.selectors';

import axios from 'axios';
import { useDispatch } from 'react-redux';

const defaultFormFields = {
    name: '',
    email: '',
    companyName: '',
    notionUrl: '',
    zapierWebhook: '',
    active: null
}

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export function UsersFilters() {

    const { isUsersLoading } = useSelector(usersSelector)
    const { accessToken } = useSelector(currentUserSelector)
    const [expanded, setExpanded] = useState(false);
    const [filtersValues, setFiltersValues] = useState(defaultFormFields)

    const dispatch = useDispatch()

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const searchUsers = () => {
        dispatch(setUsersIsLoading(true))
        let valuesToBeFiltered = Object.fromEntries(Object.entries(filtersValues).filter(([_, v]) => v != null && v != ''));
        console.log(valuesToBeFiltered);
        dispatch(setUsersSearchFilters(valuesToBeFiltered))
    }


    return (

        <Card sx={{ maxWidth: "100%" }} >
            <CardHeader
                action={
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                }
                title="Search Filters"
            >

            </CardHeader>

            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <CardContent >

                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control size='sm' name='name' type="text" placeholder="Name" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.name} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control size='sm' name='email' type="email" placeholder="Email" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.email} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCompanyName">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control size='sm' name='companyName' type="text" placeholder="Enter Company Name" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.companyName} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridNotionUrl">
                                <Form.Label>Notion Url</Form.Label>
                                <Form.Control size='sm'
                                    name='notionUrl'
                                    type="text"
                                    placeholder="Enter Notion URL"
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={filtersValues.notionUrl} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZapierWebHook">
                                <Form.Label>Zapier Web Hook</Form.Label>
                                <Form.Control size='sm'
                                    name='zapierWebhook'
                                    type="text"
                                    placeholder="Enter Zapier Web Hook"
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={filtersValues.zapierWebhook} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Select size='sm' aria-label="Default select example"
                                    name='active'
                                    placeholder=""
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={filtersValues.active}
                                >
                                    <option value="">Select</option>
                                    <option value={true}>Active</option>
                                    <option value={false}>Deactive</option>
                                </Form.Select>

                            </Form.Group>
                        </Row>




                        <Button variant="danger" type="button" disabled={isUsersLoading} style={{ minWidth: '70px' }} onClick={() => {
                            searchUsers()
                        }}>
                            {isUsersLoading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="sr-only"></span>
                            </div> : 'Search'}
                        </Button>

                        <Button variant="secondary" type="button" style={{ marginLeft: '10px' }} disabled={isUsersLoading} onClick={() => {
                            setFiltersValues({
                                name: '',
                                email: '',
                                companyName: '',
                                notionUrl: '',
                                zapierWebhook: '',
                                active: ""
                            });

                            dispatch(setUsersSearchFilters({}))
                        }}>
                            Reset
                        </Button>
                    </Form>

                </CardContent>

            </Collapse>

        </Card>

    )

}