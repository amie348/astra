import BootstrapTable from 'react-bootstrap-table-next';

import './users-table.styles.scss'
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { usersSelector } from '../../../../store/users/users.selectors';

import { styled } from '@mui/material/styles';

import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'

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
import { setUsersPageNumber, setUsersOffset, setUsersClickedRow } from '../../../../store/users/users.action';

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

function UsersTable({ setShowEditModal, setShowDeleteModal }) {

    const navigate = useNavigate()
    const classes = useStyles()
    const { usersData, isUsersLoading, usersRawData, usersPageNumber, usersOffset } = useSelector(usersSelector)
    const [expanded, setExpanded] = useState(true);

    const disptch = useDispatch()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const deleteItem = (row) => {
        disptch(setUsersClickedRow(row))
        setShowDeleteModal(true)
    }

    const editItem = (row) => {
        disptch(setUsersClickedRow(row))
        setShowEditModal(true)
    }

    const handlePaginationChange = (event, value) => {
        disptch(setUsersPageNumber(value))
    }

    const handlePaginationPageSizeChange = (e) => {
        disptch(setUsersOffset(e.target.value))
    }

    const columns = [
        {
            dataField: 'name',
            text: 'Name',
            headerStyle: (colum, colIndex) => {
                return { width: '10%' };
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
            }
        }, {
            dataField: 'companyName',
            text: 'Company Name',
            style: {
                'overflow-x': 'scroll'
            },
            classes: 'hide-scroll-bar',
            headerStyle: (colum, colIndex) => {
                return { width: '10%' };
            },
        }, {
            dataField: 'active',
            text: 'Active Status',
            style: {
                'overflow-x': 'scroll',
                'textAlign': 'center'
            },
            classes: 'hide-scroll-bar',
            headerStyle: (colum, colIndex) => {
                return { width: '10%', textAlign: 'center' };
            },
            formatter: (cell) => (
                cell === true ? (<span style={{
                    textAlign: "center",
                    cursor: "pointer",
                    padding: "4px 8px",
                    color: "#fff",
                    backgroundColor: "#dc3545",
                    borderRadius: "6px",
                }} >
                    {'ACTIVE'}
                </span>)
                    : cell === false ?

                        (<span style={{
                            textAlign: "center",
                            cursor: "pointer",
                            padding: "4px 8px",
                            color: "#fff",
                            backgroundColor: "#dc3545",
                            borderRadius: "6px",
                        }} >
                            {'DEACTIVE'}
                        </span>
                        ) : (<span style={{
                            textAlign: "center",
                            cursor: "pointer",
                            padding: "4px 8px",
                            color: "#fff",
                            backgroundColor: "#dc3545",
                            borderRadius: "6px",
                        }} >
                            {"-"}
                        </span>
                        ))
        }, {
            dataField: 'actions',
            text: 'Actions',
            headerStyle: (colum, colIndex) => {
                return { width: '15%', textAlign: 'center' };
            },
            formatter: (cell, row) => (
                cell ? cell :
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <Tooltip title="Delete User">
                            <span onClick={() => { deleteItem(row) }}>
                                <DeleteIcon fontSize='small' className={classes.root} />
                            </span>
                        </Tooltip>

                        <Tooltip title="Edit/View User">
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
                    title="Users"
                >

                </CardHeader>

                <Collapse in={expanded} timeout="auto" unmountOnExit>

                    <CardContent className={`${isUsersLoading ? 'card-container-spinner' : 'card-container'}`}>

                        {isUsersLoading ?
                            <div className="spinner-border text-danger mt-3 spinner" role="status" style={{}}>
                                <span className="sr-only"></span>
                            </div> : usersData.length > 0 ?

                                <>
                                    <Button variant="danger" type="button" style={{ minWidth: '70px', marginBottom: '30px' }} onClick={() => {
                                        navigate('/create-user')
                                    }}>Create New User</Button>

                                    <BootstrapTable
                                        wrapperClasses="table-responsive"
                                        bordered={true}
                                        classes="table table-head-custom table-vertical-center overflow-hidden"
                                        bootstrap4
                                        remote
                                        keyField='_id'
                                        data={usersData}
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
                                                        value={usersOffset}
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
                                                    count={usersRawData.totalPages}
                                                    shape="rounded"
                                                    color='primary'
                                                    size='small'
                                                    page={usersPageNumber}
                                                    onChange={handlePaginationChange}
                                                    boundaryCount={5}
                                                />
                                            </ThemeProvider>


                                        </div>

                                    </Stack>
                                </>
                                :
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Button variant="danger" type="button" style={{ minWidth: '70px', marginBottom: '30px' }} onClick={() => {
                                        navigate('/create-user')
                                    }}>Create New User</Button>

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

export default UsersTable
