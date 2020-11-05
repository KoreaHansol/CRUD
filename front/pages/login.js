import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/router'
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../reducers/user';
const Login = () => {
    const [userid, setid] = useInput('');
    const [password, setpassword] = useInput('');
    const dispatch = useDispatch();
    const router = useRouter()
    const { user } = useSelector(state => state.user);
    useEffect(() => {
        if (user && user.data) {
          router.replace('/');
        }
      }, [user && user.data]);
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
        </Form>
    </AppLayout>
  );
};

export default Login;
