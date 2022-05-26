import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { ITableItem, setItems,selectItems } from '../../state/reducers/tableReducer';
import { store } from '../../state/store';
import { getUploadedFiles } from '../../services/api';
import { useSelector } from 'react-redux';

async function setItemsIntoStore(): Promise<void> {
  const items = await getUploadedFiles()
  store.dispatch(setItems(items))
}


setInterval(async () => {
  await setItemsIntoStore()
}, 10000)

setItemsIntoStore()


const columns: ColumnsType<ITableItem> = [
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
  {
    title: 'File',
    dataIndex: 'file',
    key: 'file',
  },
];

const MainTable: React.FC = () => {
  let data = useSelector(selectItems)

  // Add a uniquie key for table
  data = data.map((item, i) => ({...item, key: i }))

  return <Table columns={columns} dataSource={data} />;
}

export default MainTable;