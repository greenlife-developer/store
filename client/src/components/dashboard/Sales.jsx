import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'name'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: 'Price',
    dataIndex: 'price'
  },
  // {
  //   title: 'Total price',
  //   dataIndex: 'total'
  // },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    quantity: 32,
    price: 9000,
  },
  {
    key: '2',
    name: 'Jim Green',
    quantity: 42,
    price: 10000,
  },
  {
    key: '3',
    name: 'Joe Black',
    quantity: 32,
    price: 3000,
  },
  {
    key: '4',
    name: 'Jim Red',
    quantity: 32,
    price: 12000,
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const Sales = () => <Table columns={columns} dataSource={data} onChange={onChange} />;

export default Sales; 

// filters: [
    //   {
    //     text: 'Joe',
    //     value: 'Joe',
    //   },
    //   {
    //     text: 'Jim',
    //     value: 'Jim',
    //   },
    // ],
    // onFilter: (value, record) => record.name.indexOf(value) === 0,
    // sorter: (a, b) => a.name.length - b.name.length,
    // sortDirections: ['descend'],