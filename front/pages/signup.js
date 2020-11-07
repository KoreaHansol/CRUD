import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router'
import { signUpAction } from '../reducers/user';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
const SignUp = () => {
    const [nickname, setnickname] = useInput('');
    const [userid, setid] = useInput('');
    const [password, setpassword] = useInput('');
    const dispatch = useDispatch();
    const { user, signupError, signupSuccess } = useSelector(state => state.user);
    useEffect(() => {
        if (user && user.userid) {
            Router.replace('/');
            alert('회원가입 되셨습니다.');
        }
      }, [user && user.userid]);
    useEffect(() => {
    if (signupError) {
        alert(signupError);
    }
    }, [signupError]);
    const onSubmit = useCallback(() => {
        if(validate()){
            dispatch(signUpAction({
                userid: userid,
                password,
                nickname,
              }));
        }
    }, [userid, password, nickname]);
    const validate = () => {
        let nicknameCheck = false,
        passwordCheck = false, 
        idCheck = false;
        if(nickname.length < 5 || nickname.length > 10) {
            alert("닉네임은 5글자 이상, 10글자 이하로 작성해주세요");
        } else {
            nicknameCheck = true;
        }
        if(userid.length < 5 || userid.length > 10) {
            alert("아이디는 5글자 이상, 10글자 이하로 작성해주세요");
        } else {
            idCheck = true;
        }
        if(password.length < 5 || password.length > 10) {
            alert("비밀번호는 5글자 이상, 10글자 이하로 작성해주세요");
        } else {
            passwordCheck = true;
        }

        if(nicknameCheck && passwordCheck && idCheck)
            return true;
    }
  return (
    <AppLayout>
        <Head>
            <title>Board | 회원가입</title>
        </Head>
        <Form onFinish={onSubmit} style={{ width: '30vw' }}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={userid} required onChange={setid} />
            </div>
            <div>
                <label htmlFor="user-nick">닉네임</label>
                <br />
                <Input name="user-nick" value={nickname} required onChange={setnickname} />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name="user-password" type="password" value={password} required onChange={setpassword} />
            </div>
            
            <div style={{ marginTop: 10 }}>
                <Button type="primary" htmlType="submit">가입하기</Button>
            </div>
        </Form>
    </AppLayout>
  );
};

export default SignUp;
