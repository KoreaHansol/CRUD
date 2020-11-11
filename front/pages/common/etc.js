import React, { useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Typography } from 'antd';
import Link from 'next/link';
import Head from 'next/head';
import { addPost, loadPostAction } from '../../reducers/post';
const etc = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  const { user } = useSelector(state => state.user);
  useEffect(() => {
    dispatch(loadPostAction({
      category: 'etc'
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
      render: (text) => <Link href={`/common/etc/${text.id}`}><a>{text.title}</a></Link>,
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
      title: '조회수',
      width: 80,
      dataIndex: 'view',
      key: 'view',
    },
  ];
  
  return (
    <AppLayout>
       <Head>
            <title>Board | 기타</title>
        </Head>
        <Typography.Title level={2}>기타</Typography.Title>
        <Table columns={columns} dataSource={mainPosts} scroll={{ x: 1300 }} />
        { user && user.data
          ? <Button><Link href="/common/etc/add"><a>글쓰기</a></Link></Button>
          : <Button><Link href="/login"><a>글쓰기</a></Link></Button>
        }
    </AppLayout>
  );
};



export default etc;
