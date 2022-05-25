import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

interface DataType {
  key: string;
  name: string;
  height: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    height: 32,
  },
  {
    key: '2',
    name: 'Jim Green',
    height: 42,
  },
  {
    key: '3',
    name: 'Joe Black',
    height: 32,
  },
];

const MainTable: React.FC = () => <Table columns={columns} dataSource={data} />;

export default MainTable;