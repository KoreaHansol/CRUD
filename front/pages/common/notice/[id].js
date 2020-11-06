import React, { useState, useCallback, useEffect } from 'react';
import AppLayout from '../../../components/AppLayout'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAction, loadsinglePostAction } from '../../../reducers/post';
import { Descriptions, Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd';

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit"  onClick={onSubmit} type="primary">
        댓글등록
      </Button>
    </Form.Item>
  </>
);
const noticeid = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [value,setValue] = useState('');
    const { id } = router.query;
    const { singlePost } = useSelector(state => state.post);
    const { user } = useSelector(state => state.user);
    useEffect(() => {
        if(id)
            dispatch(loadsinglePostAction(
              {
                id,
                category:'notice'
              }
            ));
    }, [id]);
    const submitting = () => {

    }
    const handleSubmit = () => {
      if(user && user.data) {
        dispatch(addCommentAction({
          id: singlePost.data.id,
          userid: user.data.id,
          content: value,
          category: 'notice'
        }));
        setValue('');
      } else {
        alert('로그인해주세요')
      }
      
    }
    const handleChange = (e) => {
      setValue(e.target.value)
    }
  return (
    <AppLayout>
        <Descriptions bordered style={{ background:'white' }}>
          <Descriptions.Item label="글쓴이">
            {singlePost && singlePost.data ? singlePost.data.nickname : null}
          </Descriptions.Item>
          <Descriptions.Item label="수정일" span={2}>
            {singlePost && singlePost.data ? singlePost.data.createdAt : null}
          </Descriptions.Item>
          <Descriptions.Item label="제목" span={3}>
            {singlePost && singlePost.data ? singlePost.data.title : null}
          </Descriptions.Item>
          <Descriptions.Item label="내용" style={{height:'10vh'}} span={3}>
            {singlePost && singlePost.data ? singlePost.data.content : null}
          </Descriptions.Item>
          
        </Descriptions>
       
        <Comment
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
        {singlePost && singlePost.data ? singlePost.data.Comments.map((v, i)=>{
          return (
            <Comment
              author={<a>{v.nickname}</a>}
              content={
                <p>
                  {v.content}
                </p>
              }
              // datetime={
              //   <Tooltip title='asd'>
              //     <span>sa</span>
              //   </Tooltip>
              // }
            />
          )
        }) : null}
    </AppLayout>
  );
};

export default noticeid;
