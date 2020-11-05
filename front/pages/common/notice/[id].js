import React, { useState, useCallback, useEffect } from 'react';
import AppLayout from '../../../components/AppLayout'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { loadsinglePostAction } from '../../../reducers/post';
const noticeid = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const { singlePost } = useSelector(state => state.post);
    useEffect(() => {
        if(id)
            dispatch(loadsinglePostAction(id));
    }, [id]);
  return (
    <AppLayout>
        제목 : {singlePost && singlePost.data.title}
        <br/>
        내용 : {singlePost && singlePost.data.content}
        <br/>
        수정일 : {singlePost && singlePost.data.createdAt}
        <br/>
        글쓴이 : {singlePost && singlePost.data.nickname}
        <br/>
    </AppLayout>
  );
};

export default noticeid;
