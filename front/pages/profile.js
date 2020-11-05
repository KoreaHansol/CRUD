import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Descriptions, Badge, Button, Typography, Input } from 'antd';
import { nicknameChangeAction } from '../reducers/user';
const Profile = () => {
  const { user } = useSelector(state => state.user);
  const [nickchange, setnickchange] = useState(false);
  const [nickname, setnickname] = useState('');
  const [err,seterr] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!user) {
  //     Router.replace('/');
  //   }
  // }, [user])
  const changeNickname = (e) => {
    if(!err)
      setnickchange(!nickchange);
    if(nickchange && !err) {
      dispatch(nicknameChangeAction({nickname, user}))
    }
  }
  const nickvaluechange = (e) => {
    setnickname(e.target.value);
    if(e.target.value.length < 5) {
      seterr(true)
    } else {
      seterr(false)
    }
  }
  const cancle = () => {
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
        {!nickchange && user ? <span>{user&&user.data ? user.data.nickname : '로그인하세요'}</span> : <Input value={nickname} onChange={nickvaluechange}/>}
        {nickchange && <Button style={{float:"right"}} onClick={cancle}>취소</Button>}
        {user&&user.data && <Button style={{float:"right"}} onClick={changeNickname}>{!nickchange ? '수정하기' : '완료'}</Button>}
        {err && <div style={{ color : 'red' }}>닉네임을 5글자 이상으로 설정해주세요</div>}
      </Descriptions.Item>
        <Descriptions.Item label="나의 게시글" span={3}>
          {user&&user.data && user.data.Posts.map((v, i)=> {
            return (
              <div>{(i+1)+'번째 게시글 : ' + v.title}</div>
            )
          })}
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
