import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import './leads-table.styles.scss'
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { leadsSelector } from '../../store/leads/leads.selectors';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import ActionItem from '../action-item/action-item.component';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useDispatch } from 'react-redux';
import { setLeadsPageNumber, setLeadsOffset, setClickedRow, setShowModal } from '../../store/leads/leads.action';
import { render } from 'react-dom';
import Example from '../edit-lead-modal/edit-lead-modal.component';

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

function ReactBootstrapTable({setShowDeleteModal}) {

    const { leadsData, isLoading } = useSelector(leadsSelector)
    const [expanded, setExpanded] = useState(true);

    const disptch = useDispatch()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const deleteItem = (row) => {
        disptch(setClickedRow(row))
        setShowDeleteModal(true)
    }

    const editItem = (row) => {
        disptch(setClickedRow(row))
        disptch(setShowModal(true))
    }

    const columns = [
        {
            dataField: 'firstName',
            text: 'First Name',
            headerStyle: (colum, colIndex) => {
                return { width: '120px' };
            }
        }, {
            dataField: 'lastName',
            text: 'Last Name',
            headerStyle: (colum, colIndex) => {
                return { width: '120px' };
            }
        }, {
            dataField: 'email',
            text: 'Email',
            style: {
                'overflow-x': 'scroll'
            },
            headerStyle: (colum, colIndex) => {
                return { width: '250px' };
            },
            classes: 'hide-scroll-bar'
        }, {
            dataField: 'phone',
            text: 'Phone'
        }, {
            dataField: 'funnelStage',
            text: 'Funnel Stage',
            formatter: (cell) => (
                cell ? cell : "-"
            ),
            headerStyle: (colum, colIndex) => {
                return { width: '120px' };
            }
        }, {
            dataField: 'followUpDate',
            text: 'Follow Up Date',
            formatter: (cell) => (
                cell ? cell : "-"
            ),
            headerStyle: (colum, colIndex) => {
                return { width: '120px' };
            }
        }, {
            dataField: 'actions',
            text: 'Actions',
            headerStyle: (colum, colIndex) => {
                return { width: '120px', textAlign: 'center' };
            },
            formatter: (cell, row) => (
                cell ? cell : <>
                    <span onClick={() => { deleteItem(row) }}><DeleteIcon fontSize='small' className='deleteButton' /></span>
                    <span onClick={() => { editItem(row) }}><EditIcon fontSize='small' className='editButton' /></span>
                </>
            )
        }
    ];

    const options = {
        // pageButtonRenderer,
        // paginationSize: 5,
        // pageStartIndex: 1,
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        // showTotal: true,
        onSizePerPageChange: (sizePerPage, page) => {
            disptch(setLeadsOffset(sizePerPage))
            disptch(setLeadsPageNumber(page))
        },
        onPageChange: (page, sizePerPage) => {
            disptch(setLeadsOffset(sizePerPage), setLeadsPageNumber(page))
        }
    };



    return (
        <div className="table-container">
            <Example />
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
                    title="Leads"
                >

                </CardHeader>

                <Collapse in={expanded} timeout="auto" unmountOnExit>

                    <CardContent className={`${isLoading ? 'card-container-spinner' : 'card-container'}`}>

                        {isLoading ? <div className="spinner-border text-danger mt-3 spinner" role="status" style={{}}>
                            <span className="sr-only"></span>
                        </div> : <>
                            <BootstrapTable
                                wrapperClasses="table-responsive"
                                bordered={true}
                                classes="table table-head-custom table-vertical-center overflow-hidden"
                                bootstrap4
                                remote
                                keyField='_id'
                                data={leadsData}
                                columns={columns}
                                pagination={paginationFactory(options)} />
                        </>}

                    </CardContent>

                </Collapse>

            </Card>
        </div>
    )
}

export default ReactBootstrapTable
