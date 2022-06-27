import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { leadsSelector } from '../../../../store/leads/leads.selectors';

import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { Button, Form, Col, Row } from 'react-bootstrap'
import { Tooltip } from '@mui/material';

import { setSearchFilters, setIsLoading } from '../../../../store/leads/leads.action';
import { currentUserSelector } from '../../../../store/user/user.selectors';

import axios from 'axios';
import { useDispatch } from 'react-redux';

const defaultFormFields = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    lastContacted: '',
    contactType: '',
    noOfTimesContacted: '',
    followUpDate: '',
    funnelStage: '',
    purchasesPrice: null,
    finance: null,
    paidInFull: null,
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


export function LeadFIlters() {

    const { isLoading } = useSelector(leadsSelector)
    const { accessToken } = useSelector(currentUserSelector)
    const [expanded, setExpanded] = useState(false);
    // const [isLoading, setIsLoading] = useState(false)
    const [filtersValues, setFiltersValues] = useState(defaultFormFields)

    const dispatch = useDispatch()

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const searchLead = () => {
        dispatch(setIsLoading(true))
        let valuesToBeFiltered = Object.fromEntries(Object.entries(filtersValues).filter(([_, v]) => v != null && v != ''));
        console.log(valuesToBeFiltered);
        dispatch(setSearchFilters(valuesToBeFiltered))
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
                            <Form.Group as={Col} controlId="formGridFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control size='sm' name='firstName' type="text" placeholder="First Name" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.firstName} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control size='sm' name='lastName' type="text" placeholder="Enter Last Name" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.lastName} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control size='sm' name='email' type="email" placeholder="Email" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.email} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control size='sm' name='phone' type="phone" placeholder="Enter Phone" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.phone} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastContacted">
                                <Form.Label>Last Contacted</Form.Label>
                                <Form.Control size='sm'
                                    name='lastContacted'
                                    type="date"
                                    defaultValue="dd/mm/yyyy"
                                    placeholder="Enter Last Contacted"
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={filtersValues.lastContacted} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridContactType">
                                <Form.Label>Contact Type</Form.Label>
                                <Form.Select size='sm' aria-label="Default select example"
                                    name='contactType'
                                    placeholder=""
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={filtersValues.contactType}
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
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.noOfTimesContacted} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridFollowUpDate">
                                <Form.Label>Follow Up Date</Form.Label>
                                <Form.Control size='sm'
                                    name='followUpDate'
                                    type="date"
                                    placeholder=""
                                    defaultValue="dd/mm/yyyy"
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={(filtersValues.funnelStage == "NEW LEAD" || filtersValues.funnelStage == "FOLLOW UP") ? filtersValues.followUpDate : null}
                                    disable={(filtersValues.funnelStage == "NEW LEAD" || filtersValues.funnelStage == "FOLLOW UP") ? false : true}

                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridFunnelStage">
                                <Form.Label>Funnel Stage</Form.Label>
                                <Form.Select size='sm' aria-label="Default select example"
                                    name='funnelStage'
                                    placeholder=""
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        console.log(`value`, value)
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={filtersValues.funnelStage}
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
                            {/* <Form.Group as={Col} controlId="formGridPurchasesPrice">
                                <Form.Label>Purchases Price</Form.Label>
                                <Form.Control size='sm' name='purchasesPrice' type="number" placeholder="Enter Purchases Price" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.purchasesPrice} />
                            </Form.Group> */}

                            <Form.Group as={Col} controlId="formGridFinance">
                                <Form.Label>Finance</Form.Label>
                                <Form.Select size='sm' aria-label="Default select example"
                                    name='finance'
                                    placeholder=""
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={filtersValues.finance}
                                >
                                    <option value="">Select</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPaidInFull">
                                <Form.Label>Paid In Full</Form.Label>
                                <Form.Select size='sm' aria-label="Default select example"
                                    name='paidInFull'
                                    placeholder=""
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={filtersValues.paidInFull}
                                >
                                    <option value="">Select</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </Form.Select>

                            </Form.Group>

                            {/* <Form.Group as={Col} controlId="formGridFutureRevenue">
                                <Form.Label>Future Revenue</Form.Label>
                                <Form.Control size='sm' name='futureRevenue' type="number" placeholder="Enter Future Revenue" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.futureRevenue} />
                            </Form.Group> */}
                        </Row>

                        {/* <Form.Group className="mb-3" controlId="formGridResponse">
                            <Form.Label>Response</Form.Label>
                            <Form.Control size='sm' name='response' type="text" placeholder="Enter Rsponse" onChange={(e) => {
                                const { name, value } = e.target;
                                setFiltersValues({ ...filtersValues, [name]: value })
                            }} value={filtersValues.response} />
                        </Form.Group> */}

                        <Button variant="danger" type="button" disabled={isLoading} style={{ minWidth: '70px' }} onClick={() => {
                            searchLead()
                        }}>
                            {isLoading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="sr-only"></span>
                            </div> : 'Search'}
                        </Button>

                        <Button variant="secondary" type="button" style={{ marginLeft: '10px' }} disabled={isLoading} onClick={() => {
                            setFiltersValues({
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
                                purchasesPrice: null,
                                finance: '',
                                paidInFull: '',
                                futureRevenue: null
                            });

                            dispatch(setSearchFilters({}))
                        }}>
                            Reset
                        </Button>
                    </Form>

                </CardContent>

            </Collapse>

        </Card>

    )

}