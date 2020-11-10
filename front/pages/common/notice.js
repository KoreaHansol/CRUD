import React, { useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Typography } from 'antd';
import Link from 'next/link';
import { addPost, loadPostAction } from '../../reducers/post';
import Head from 'next/head';
const Notice = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  const { user } = useSelector(state => state.user);
  useEffect(() => {
    dispatch(loadPostAction({
      category: 'notice'
    }));
  }, []);
  const columns = [
    {
      title: '번호',
      width: 100,
      dataIndex: 'ROWNUM',
      key: 'ROWNUM',
      render: (text) =>  text,
    },
    { 
      title: '제목', 
      key: 'title' ,
      render: (text) => <Link href={`/common/notice/${text.id}`}><a>{text.title}</a></Link>,
    },
    {
      title: '이름',
      width: 200,
      dataIndex: 'nickname',
      key: 'nickname',
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
      <Head>
            <title>Board | 공지</title>
        </Head>
        <Typography.Title level={2}>공지</Typography.Title>
        <Table columns={columns} dataSource={mainPosts} scroll={{ x: 1300 }} />
        { user && user.data && user.data.nickname === 'admin'
          && <Button><Link href="/common/notice/add"><a>글쓰기</a></Link></Button>
        }
    </AppLayout>
  );
};



export default Notice;
