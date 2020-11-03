import React, { useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import Link from 'next/link';
import { addPost } from '../../reducers/post';
const Notice = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addPost);
  }, []);
  const columns = [
    {
      title: '번호',
      width: 100,
      dataIndex: 'index',
      key: 'index',
    },
    { 
      title: '제목', 
      dataIndex: 'title', 
      key: '1' ,
      render: (text) => <Link href=""><a>{text}</a></Link>,
    },
    {
      title: '이름',
      width: 200,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '작성일',
      width: 200,
      dataIndex: 'update',
      key: 'update',
    },
    {
      title: '조회',
      width: 100,
      dataIndex: 'update',
      key: 'update',
    },
    {
      title: '추천',
      width: 100,
      dataIndex: 'update',
      key: 'update',
    },
  ];
  
  const dummydata = [
    {
      key: '1',
      name: 'John Brown',
      title: 32,
      address: 'New York Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      title: 40,
      address: 'London Park',
    },
    {
      key: '1',
      name: 'John Brown',
      title: 32,
      address: 'New York Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      title: 40,
      address: 'London Park',
    },
    {
      key: '1',
      name: 'John Brown',
      title: 32,
      address: 'New York Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      title: 40,
      address: 'London Park',
    },
    {
      key: '1',
      name: 'John Brown',
      title: 32,
      address: 'New York Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      title: 40,
      address: 'London Park',
    },
    {
      key: '1',
      name: 'John Brown',
      title: 32,
      address: 'New York Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      title: 40,
      address: 'London Park',
    },
    {
      key: '1',
      name: 'John Brown',
      title: 32,
      address: 'New York Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      title: 40,
      address: 'London Park',
    },
  ];
  return (
    <AppLayout>
        Hello Notice
        <Table columns={columns} dataSource={dummydata} scroll={{ x: 1300 }} />
    </AppLayout>
  );
};

export default Notice;
