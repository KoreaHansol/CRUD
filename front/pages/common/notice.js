import React, { useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'antd';
import Link from 'next/link';
import { addPost, loadPostAction } from '../../reducers/post';
const Notice = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  useEffect(() => {
    dispatch(loadPostAction({
      category: 'notice'
    }));
  }, []);
  const columns = [
    {
      title: '번호',
      width: 100,
      dataIndex: 'id',
      key: 'id',
      render: (text) => mainPosts.length - (text - 1),
    },
    { 
      title: '제목', 
      key: 'title' ,
      render: (text) => <Link href={`/common/notice/${text.id}`}><a>{text.title}</a></Link>,
    },
    {
      title: '이름',
      width: 200,
      dataIndex: 'UserId',
      key: 'UserId',
    },
    {
      title: '작성일',
      width: 200,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
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
  
  return (
    <AppLayout>
        <Table columns={columns} dataSource={mainPosts} scroll={{ x: 1300 }} />
        <Button><Link href="/common/notice/add"><a>글쓰기</a></Link></Button>
    </AppLayout>
  );
};



export default Notice;
