import React from 'react';
import AppLayout from '../../../components/AppLayout'
import { useRouter } from 'next/router';
import Head from 'next/head';
const Home = () => {
    const router = useRouter();
    const { id } = router.query;
  return (
    <AppLayout>
     {id}
    </AppLayout>
  );
};

export default Home;
