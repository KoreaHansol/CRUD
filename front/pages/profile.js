import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Descriptions, Badge, Button, Typography, Input } from 'antd';
import useInput from '../hooks/useInput';
const Profile = () => {
  const { user } = useSelector(state => state.user);
  const [nickchange, setnickchange] = useState(false);
  // useEffect(() => {
  //   if (!user) {
  //     Router.replace('/');
  //   }
  // }, [user])
  const changeNickname = (e) => {
    setnickchange(!nickchange);
  }
  return (
    <AppLayout>
      <Head>
        <title>Board | 내 프로필</title>
      </Head>
      <Typography.Title level={2}>내 프로필</Typography.Title>
      <Descriptions bordered style={{ background:'white' }}>
      <Descriptions.Item label="닉네임" span={3}>
        {!nickchange ? <span>{user && user.data.nickname}</span> : <Input/>}
        <Button style={{float:"right"}} onClick={changeNickname}>{!nickchange ? '수정하기' : '완료'}</Button>
      </Descriptions.Item>
        <Descriptions.Item label="나의 게시글" span={3}>
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1<br />
        </Descriptions.Item>
        <Descriptions.Item label="나의 댓글" span={3}>
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1<br />
        </Descriptions.Item>
      </Descriptions>
    </AppLayout>
  );
};

export default Profile;
