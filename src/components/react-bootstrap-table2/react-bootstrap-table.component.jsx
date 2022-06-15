import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import './react-bootstrap-table.styles.scss'

const products = [{ id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }, { id: 1, name: 'Laptop', price: 100 }];

const columns = [{
    dataField: 'id',
    text: 'Product ID'
}, {
    dataField: 'name',
    text: 'Product Name'
}, {
    dataField: 'price',
    text: 'Product Price'
}];

const ReactBootstrapTable = () => {
    return (
        <div className="table-container">
            <BootstrapTable
            wrapperClasses="table-responsive"
            bordered={true}
            classes="table table-head-custom table-vertical-center overflow-hidden"
            bootstrap4
            remote 
            keyField='id' 
            data={products} 
            columns={columns} 
            pagination={paginationFactory()} />
        </div>
    )
}

export default ReactBootstrapTable
