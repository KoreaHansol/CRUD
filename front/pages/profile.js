import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Profile = () => {
  const { isLoggedIn } = useSelector(state => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      Router.replace('/');
    }
  }, [isLoggedIn])

  return (
    <AppLayout>
      <Head>
        <title>Board | 내 프로필</title>
      </Head>
      프로필
    </AppLayout>
  );
};

export default Profile;
