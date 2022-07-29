import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import './leads-table.styles.scss'
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { leadsSelector } from '../../../../store/leads/leads.selectors';

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
import { Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";



import { useDispatch } from 'react-redux';
import { setLeadsPageNumber, setLeadsOffset, setClickedRow, setShowEditModal } from '../../../../store/leads/leads.action';

import Example from '../edit-lead-modal/edit-lead-modal.component';

// import Pagination from 'react-bootstrap/Pagination'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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


const useStyles = makeStyles({

    root: {
        backgroundColor: `#dc3545`,
        color: `#FFF`,
        fontSize: "25px",
        padding: `3px 3px`,
        borderRadius: `3px`,
        margin: `0px 15px`,
        '&:hover': {
            backgroundColor: "#FFF",
            color: `#dc3545`

        }
    }

})

const paginationTheme = createTheme({
    palette: {
        primary: {
            main: "#dc3545",
        },
    },
});

function ReactBootstrapTable({ setShowDeleteModal, funnelStage, reRender, setReRender, newLeadReRender, setNewLeadReRender, followLeadReRender, setFollowLeadReRender }) {
    const classes = useStyles()
    const { leadsData, isLoading, leadsRawData, pageNumber, offset } = useSelector(leadsSelector)
    const [expanded, setExpanded] = useState(true);

    // const [pageNumber, setPageNumber] = useState(1);

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
        disptch(setShowEditModal(true))
    }

    const handlePaginationChange = (event, value) => {
        disptch(setLeadsPageNumber(value))
    }

    const handlePaginationPageSizeChange = (e) => {
        disptch(setLeadsOffset(e.target.value))
    }

    const columns = [
        {
            dataField: 'firstName',
            text: 'Name',
            headerStyle: (colum, colIndex) => {
                return { width: '13%' };
            },
            formatter: (cell, row) => {
                return `${row.firstName} ${row.lastName}`
            }
        }, {
            dataField: 'service',
            text: 'Service',
            headerStyle: (colum, colIndex) => {
                return { width: '12%' };
            }
        }, {
            dataField: 'email',
            text: 'Email',
            style: {
                'overflow-x': 'scroll'
            },
            headerStyle: (colum, colIndex) => {
                return { width: '20%' };
            },
            classes: 'hide-scroll-bar'
        }, {
            dataField: 'phone',
            text: 'Phone',
            style: {
                'overflow-x': 'scroll'
            },
            classes: 'hide-scroll-bar',
            headerStyle: (colum, colIndex) => {
                return { width: '10%' };
            },
        }, {
            dataField: 'funnelStage',
            text: 'Funnel Stage',

            style: {
                'overflow-x': 'scroll'
            },
            classes: 'hide-scroll-bar',
            formatter: (cell) => (
                cell === "DEAD" ?

                    (<span style={{
                        textAlign: "center",
                        cursor: "pointer",
                        padding: "4px 8px",
                        color: "#fff",
                        backgroundColor: "#dc3545",
                        borderRadius: "6px",
                    }} >
                        {cell}
                    </span>
                    )
                    : cell === "PURCHASED" ?

                        (<span style={{
                            textAlign: "center",
                            cursor: "pointer",
                            padding: "4px 8px",
                            color: "#fff",
                            backgroundColor: "#0001E6",
                            borderRadius: "6px",
                        }} >
                            {cell}
                        </span>
                        )
                        : cell === "NEW LEAD" ?

                            (<span style={{
                                textAlign: "center",
                                cursor: "pointer",
                                padding: "4px 8px",
                                color: "#fff",
                                backgroundColor: "#D10E73",
                                borderRadius: "6px",
                            }} >
                                {cell}
                            </span>
                            )
                            : cell === "FOLLOW UP" ?

                                (<span style={{
                                    textAlign: "center",
                                    cursor: "pointer",
                                    padding: "4px 8px",
                                    color: "#fff",
                                    backgroundColor: "#F2C80C",
                                    borderRadius: "6px",
                                }} >
                                    {cell}
                                </span>
                                )
                                : cell === "CONSULTATION BOOKED" ?

                                    (<span style={{
                                        textAlign: "center",
                                        cursor: "pointer",
                                        padding: "4px 8px",
                                        color: "#fff",
                                        backgroundColor: "#0BDE89",
                                        borderRadius: "6px",
                                    }} >
                                        {cell}
                                    </span>
                                    )
                                    :
                                    cell === "CONSULTATION COMPLETE" ?

                                        (<span style={{
                                            textAlign: "center",
                                            cursor: "pointer",
                                            padding: "4px 8px",
                                            color: "#fff",
                                            backgroundColor: "#0ACF0E",
                                            borderRadius: "6px",
                                        }} >
                                            {cell}
                                        </span>
                                        )
                                        :
                                        cell === "OBJECTION" ?

                                            (<span style={{
                                                textAlign: "center",
                                                cursor: "pointer",
                                                padding: "4px 8px",
                                                color: "#fff",
                                                backgroundColor: "#B80BDE",
                                                borderRadius: "6px",
                                            }} >
                                                {cell}
                                            </span>
                                            )
                                            :
                                            cell === "WAITING FOR" ?

                                                (<span style={{
                                                    textAlign: "center",
                                                    cursor: "pointer",
                                                    padding: "4px 8px",
                                                    color: "#fff",
                                                    backgroundColor: "#777D60",
                                                    borderRadius: "6px",
                                                }} >
                                                    {cell}
                                                </span>
                                                )
                                                :
                                                (<span style={{
                                                    textAlign: "center",
                                                    cursor: "pointer",
                                                    padding: "4px 8px",
                                                    color: "#fff",
                                                    backgroundColor: "#dc3545",
                                                    borderRadius: "6px",
                                                }} >
                                                    {"-"}
                                                </span>
                                                )
            ),
            headerStyle: (colum, colIndex) => {
                return { width: '10%' };
            }
        }, {
            dataField: 'followUpDate',
            text: 'Follow Up Date',
            headerStyle: (colum, colIndex) => {
                return { width: '10%', textAlign: 'center' };
            },
            formatter: (cell) => (
                <span style={{
                    textAlign: "center",
                    cursor: "pointer",
                    padding: "4px 8px",
                    color: "#fff",
                    backgroundColor: "#dc3545",
                    borderRadius: "6px",
                }} >
                    {cell ?
                        <Tooltip title={moment(cell).format(`MMMM Do YYYY`)}>
                            <span>{" " + moment(cell).fromNow()}</span>
                        </Tooltip>
                        :
                        "-"
                    }

                </span>


            )
        }, {
            dataField: 'actions',
            text: 'Actions',
            headerStyle: (colum, colIndex) => {
                return { width: '10%', textAlign: 'center' };
            },
            formatter: (cell, row) => (
                cell ? cell :
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <Tooltip title="Delete Lead">
                            <span onClick={() => { deleteItem(row) }}>
                                <DeleteIcon fontSize='small' className={classes.root} />
                            </span>
                        </Tooltip>

                        <Tooltip title="Edit/View Lead">
                            <span onClick={() => { editItem(row) }} >
                                <EditIcon fontSize='small' className={classes.root} />
                            </span>
                        </Tooltip>

                    </div>
            )
        }
    ];



    return (
        <div className="table-container">
            <Example reRender={reRender} setReRender={setReRender} newLeadReRender={newLeadReRender} setNewLeadReRender={setNewLeadReRender} followLeadReRender={followLeadReRender} setFollowLeadReRender={setFollowLeadReRender} />
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
                    title={funnelStage ? funnelStage : "All Leads"}
                >

                </CardHeader>

                <Collapse in={expanded} timeout="auto" unmountOnExit>

                    <CardContent className={`${isLoading ? 'card-container-spinner' : 'card-container'}`}>

                        {isLoading ?
                            <div className="spinner-border text-danger mt-3 spinner" role="status" style={{}}>
                                <span className="sr-only"></span>
                            </div> : leadsData.length > 0 ?

                                <>
                                    <BootstrapTable
                                        wrapperClasses="table-responsive"
                                        bordered={true}
                                        classes="table table-head-custom table-vertical-center overflow-hidden"
                                        bootstrap4
                                        remote
                                        keyField='_id'
                                        data={leadsData}
                                        columns={columns} />

                                    <Stack spacing={2}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }} >


                                            {/* show pagination select field here */}

                                            <Box sx={{ minWidth: 30 }} >
                                                <FormControl fullWidth sx={{ color: 'red' }} color='error' size='small' >
                                                    <InputLabel id="size" sx={{ color: '#dc3545' }}>Size</InputLabel>
                                                    <Select
                                                        className='per-page-select'
                                                        labelId="size"
                                                        id="paginationSize"
                                                        value={offset}
                                                        label="Size"
                                                        onChange={handlePaginationPageSizeChange}
                                                    >
                                                        <MenuItem value={10}>10</MenuItem>
                                                        <MenuItem value={25}>25</MenuItem>
                                                        <MenuItem value={50}>50</MenuItem>
                                                        <MenuItem value={100}>100</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>


                                            <ThemeProvider theme={paginationTheme}>
                                                <Pagination
                                                    count={leadsRawData.totalPages}
                                                    shape="rounded"
                                                    color='primary'
                                                    size='small'
                                                    page={pageNumber}
                                                    onChange={handlePaginationChange}
                                                    boundaryCount={5}
                                                />
                                            </ThemeProvider>


                                        </div>
                                    </Stack>
                                </>
                                :
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <h6>
                                        <strong> No Records Found </strong>
                                    </h6>
                                </div>
                        }

                    </CardContent>

                </Collapse>

            </Card>
        </div>
    )
}

export default ReactBootstrapTable
