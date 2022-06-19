import { useState } from 'react';

import { useSelector } from 'react-redux';
import { leadsSelector } from '../../store/leads/leads.selectors';

import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { Button, Form, Col, Row } from 'react-bootstrap'


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

    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleExpandClick = () => {

        setExpanded(!expanded)

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
                                <Form.Control 
                                    name='firstName' 
                                    type="text" 
                                    placeholder="First Name" 
                                    // onChange={} 
                                    // value={} 
                                    />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    name='lastName' 
                                    type="text" 
                                    placeholder="Last Name" 
                                    // onChange={} 
                                    // value={} 
                                    />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    name='email' 
                                    type="email" 
                                    placeholder="Email" 
                                    // onChange={} 
                                    // value={} 
                                    />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control 
                                    name='phone' 
                                    type="phone" 
                                    placeholder="Enter Phone" 
                                    // onChange={} 
                                    // value={} 
                                    />
                            </Form.Group>

                            
                        </Row>


                        <Button variant="danger" type="button" onClick={() => {
                            // dispatch(setShowConfirmUpdateModal(true))
                            // dispatch(setShowEditModal(false))
                        }}>
                            Search
                        </Button>

                        <Button variant="secondary" type="button" style={{ marginLeft: '10px' }} onClick={() => {
                            // dispatch(setShowEditModal(false))
                        }}>
                            Reset
                        </Button>
                    </Form>

                    </CardContent>

                </Collapse>

            </Card>

    )

}