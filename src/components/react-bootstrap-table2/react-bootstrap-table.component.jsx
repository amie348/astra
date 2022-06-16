import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import './react-bootstrap-table.styles.scss'

import { useSelector } from 'react-redux';
import { leadsSelector } from '../../store/leads/leads.selectors';

// const products = [{ id: 1, name: 'Laptop', price: 100 }, { id: 2, name: 'Laptop', price: 100 }];

const columns = [{
    dataField: '_id',
    text: 'Product ID',
    style: {
        'overflow-x': 'scroll'
    },
    classes: 'hide-scroll-bar'
}, {
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

const ReactBootstrapTable = () => {
    const leadsData = useSelector(leadsSelector)

    const options = {
        paginationSize: 2,
        pageStartIndex: 1,
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        showTotal: true,
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: 'All', value: leadsData.length
        }] // A numeric array is also available. the purpose of above example is custom the text
    };

    return (
        <div className="table-container">
            <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={true}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField='id'
                data={leadsData}
                columns={columns}
                pagination={paginationFactory(options)} />
        </div>
    )
}

export default ReactBootstrapTable
