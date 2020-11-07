import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useRouter } from 'next/router'
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../reducers/user';
const Login = () => {
    const [userid, setid] = useInput('');
    const [password, setpassword] = useInput('');
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, loginError } = useSelector(state => state.user);
    useEffect(() => {
        if (user && user.data) {
          router.replace('/');
        }
      }, [user && user.data]);
    useEffect(() => {
      if (loginError) {
          alert(loginError);
      }
      }, [loginError]);
    const onSubmit = useCallback(() => {
        dispatch(loginAction({
          userid,
          password,
        }));
    }, [userid, password])
    
  return (
    <AppLayout>
         <Head>
            <title>Board | 로그인</title>
        </Head>
        <Form onFinish={onSubmit} style={{ width: '30vw' }}>
            <Typography.Title level={2}>로그인</Typography.Title>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={userid} required onChange={setid} />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name="user-password" type="password" value={password} required onChange={setpassword} />
            </div>
            
            <div style={{ marginTop: 10 }}>
                <Button type="primary" htmlType="submit">로그인</Button>
            </div>
            <div>
                <Typography.Title level={4} style={{ marginTop: 10 }}>회원이 아니라면</Typography.Title>
                <Button><Link href="/login"><a>회원가입</a></Link></Button>
            </div>
        </Form>
    </AppLayout>
  );
};

export default Login;
