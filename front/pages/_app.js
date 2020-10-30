import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';


const Board = ({ Component }) => {
  return (
    <>
      <Head>
        <title>Board</title>
      </Head>
      <Component />
    </>
  );
};

Board.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Board);