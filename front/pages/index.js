import React from 'react';
import { Typography } from 'antd';
import AppLayout from '../components/AppLayout'
const Home = () => {
  return (
    <AppLayout>
       <Typography.Title level={2}>간단한 CRUD 게시판 입니다.</Typography.Title>
    </AppLayout>
  );
};

export default Home;
