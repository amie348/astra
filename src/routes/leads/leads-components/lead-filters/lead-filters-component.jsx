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


export function LeadFIlters({funnelStage}) {

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
                                <Form.Control size='sm' name='firstName' type="text" placeholder="Enter First Name" onChange={(e) => {
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
                            <Form.Group as={Col} controlId="formGridService">
                                <Form.Label>Service</Form.Label>
                                <Form.Control size='sm' name='service' type="text" placeholder="Enter Service" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.service} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPlatform">
                                <Form.Label>Platform</Form.Label>
                                <Form.Control size='sm' name='platform' type="text" placeholder="Enter Platform" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.platform} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control size='sm' name='phone' type="phone" placeholder="Enter Phone" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.phone} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} controlId="formGridBestTimeToContact">
                                <Form.Label>Best Time To Contact</Form.Label>
                                <Form.Control size='sm'
                                    name='bestTimeToContact'
                                    type="text"
                                    placeholder="Enter Best Time To Contact"

                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={filtersValues.bestTimeToContact} />
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
                                {/* <Form.Control size='sm' name='contactType' type="text" placeholder="Contact Type" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.contactType} /> */}

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
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={(filtersValues.funnelStage == "NEW LEAD" || filtersValues.funnelStage == "FOLLOW UP") ? filtersValues.followUpDate : null}
                                    disable={(filtersValues.funnelStage == "NEW LEAD" || filtersValues.funnelStage == "FOLLOW UP") ? false : true}

                                />
                            </Form.Group>
                            {
                            
                            funnelStage ? null 
                            :
                            <Form.Group as={Col} controlId="formGridFunnelStage">
                                <Form.Label>Funnel Stage</Form.Label>
                                {/* <Form.Control size='sm' name='funnelStage' placeholder="" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.funnelStage} /> */}
                                <Form.Select size='sm' aria-label="Default select example"
                                    name='funnelStage'
                                    placeholder=""
                                    onChange={(e) => {
                                        const { name, value } = e.target;
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
                            

                            }

                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPurchasesPrice">
                                <Form.Label>Purchases Price</Form.Label>
                                <Form.Control size='sm' name='purchasesPrice' type="number" placeholder="Enter Purchases Price" onChange={(e) => {
                                    const { name, value } = e.target;
                                    setFiltersValues({ ...filtersValues, [name]: value })
                                }} value={filtersValues.purchasesPrice} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridConsultationDate">
                                <Form.Label>Last Contacted</Form.Label>
                                <Form.Control size='sm'
                                    name='consultationDate'
                                    type="date"
                                    placeholder="Enter Consultation Date"
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={filtersValues.consultationDate} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridConsultationTime">
                                <Form.Label>Consultation Time</Form.Label>
                                <Form.Control size='sm'
                                    name='consultationTime'
                                    type="time"
                                    placeholder="Enter Best Consultation Time"
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFiltersValues({ ...filtersValues, [name]: value })
                                    }}
                                    value={filtersValues.consultationTime} />
                            </Form.Group>
                        </Row>

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