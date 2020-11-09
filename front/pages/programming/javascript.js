import React, { useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Typography } from 'antd';
import Link from 'next/link';
import { addPost, loadPostAction } from '../../reducers/post';
import Head from 'next/head';
const javascript = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  const { user } = useSelector(state => state.user);
  useEffect(() => {
    dispatch(loadPostAction({
      category: 'javascript'
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
      render: (text) => <Link href={`/programming/javascript/${text.id}`}><a>{text.title}</a></Link>,
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
            <title>Board | 자바스크립트</title>
        </Head>
        <Typography.Title level={2}>자바스크립트</Typography.Title>
        <Table columns={columns} dataSource={mainPosts} scroll={{ x: 1300 }} />
        { user && user.data
          ? <Button><Link href="/programming/javascript/add"><a>글쓰기</a></Link></Button>
          : <Button><Link href="/login"><a>글쓰기</a></Link></Button>
        }
    </AppLayout>
  );
};



export default javascript;
