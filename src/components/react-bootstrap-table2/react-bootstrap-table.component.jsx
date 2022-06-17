import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import './react-bootstrap-table.styles.scss'
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




function ReactBootstrapTable() {

    const { leadsData } = useSelector(leadsSelector)
    const [expanded, setExpanded] = useState(true);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const pageButtonRenderer = ({
        page,
        active,
        disable,
        title,
        onPageChange
    }) => {
        const handleClick = (e) => {
            e.preventDefault();
            onPageChange(page);
        };
        const activeStyle = {};
        if (active) {
            activeStyle.backgroundColor = '#dc3545';
            activeStyle.boxShadow = 'none';
            activeStyle.color = 'white';
        } else {
            activeStyle.boxShadow = 'none';
            activeStyle.backgroundColor = 'gray';
            activeStyle.color = 'white';
        }
        if (typeof page === 'string') {
            activeStyle.boxShadow = 'none';
            activeStyle.backgroundColor = '#dc3545';
            activeStyle.color = 'white';
        }
        return (
            <li className="page-item" title={page}>
                <a href="#" className='page-link' onClick={handleClick} style={activeStyle}>{page}</a>
            </li>
        );
    };

    const sizePerPageRenderer = ({
        options,
        currSizePerPage,
        onSizePerPageChange
    }) => (
        <div className="btn-group" role="group">
            {
                options.map((option) => {
                    const isSelect = currSizePerPage === `${option.page}`;
                    return (
                        <button
                            key={option.text}
                            type="button"
                            onClick={() => onSizePerPageChange(option.page)}
                            className={`btn ${isSelect ? 'btn-danger' : 'btn-secondary'}`}
                            style={{ boxShadow: 'none' }}
                        >
                            {option.text}
                        </button>
                    );
                })
            }
        </div>
    );

    const columns = [
        {
            dataField: 'firstName',
            text: 'First Name'
        }, {
            dataField: 'lastName',
            text: 'Last Name'
        }, {
            dataField: 'email',
            text: 'Email',
            style: {
                'overflow-x': 'scroll'
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
            )
        }, {
            dataField: 'followUpDate',
            text: 'Follow Up Date',
            formatter: (cell) => (
                cell ? cell : "-"
            )
        },
    ];

    const options = {
        sizePerPageRenderer,
        pageButtonRenderer,
        // paginationSize: 2,
        pageStartIndex: 1,
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        showTotal: true,
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '8', value: 8
        }
        ],// A numeric array is also available. the purpose of above example is custom the text

    };



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
                    title="Leads"
                >

                </CardHeader>

                <Collapse in={expanded} timeout="auto" unmountOnExit>

                    <CardContent>

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

                    </CardContent>

                </Collapse>

            </Card>

        </div>
    )
}

export default ReactBootstrapTable
