import React, { useState, useCallback, useEffect } from 'react';
import AppLayout from '../../../components/AppLayout'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAction, deletePostAction, loadsinglePostAction, updatePostAction } from '../../../reducers/post';
import { Descriptions, Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const Editor = ({ onChange, onSubmit, submitting, value, single, user, onUpdate, onDelete, update, onUpdateSuccess }) => (
  <>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit"  onClick={onSubmit} type="primary">
        댓글등록
      </Button>
      { !update && single === user ? <Button style={{ float: 'right' }} onClick={onDelete}>삭제</Button> : null }
      { !update && single === user ? <Button style={{ float: 'right' }} onClick={onUpdate}>수정</Button> : null }
      { update ? <Button style={{ float: 'right' }} onClick={onUpdateSuccess}>완료</Button> : null }
    </Form.Item>
  </>
);
const leagueoflegendid = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query;
    const { singlePost, postdelete } = useSelector(state => state.post);
    const { user } = useSelector(state => state.user);
    const [value,setValue] = useState('');
    const [update,setUpdate] = useState(false);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    useEffect(() => {
        if(id)
            dispatch(loadsinglePostAction(
              {
                id,
                category:'leagueoflegend'
              }
            ));
    }, [id]);
    useEffect(() => {
      if(postdelete){
        alert("삭제완료")
        router.replace('/gallery/leagueoflegend')
      }
    }, [postdelete]);
    const submitting = () => {

    }
    const handleSubmit = () => {
      if(user && user.data) {
        dispatch(addCommentAction({
          id: singlePost.data.id,
          userid: user.data.id,
          content: value,
          category: 'leagueoflegend'
        }));
        setValue('');
      } else {
        alert('로그인해주세요')
      }
      
    }
    const onUpdate = () => {
      setUpdate(true);
      setTitle(singlePost.data.title);
      setContent(singlePost.data.content);
    }
    const onDelete = () => {
      let flag = confirm("정말 삭제하시겠습니까?");
      if(flag) {
        dispatch(deletePostAction({
          id: singlePost.data.id
        }))
      }
      
    }
    const handleChange = (e) => {
      setValue(e.target.value)
    }
    const onTitleChange = (e) => {
      setTitle(e.target.value)
    }
    const onUpdateSuccess = (e) => {
      if(title.length > 0 && content.length > 0) {
        dispatch(updatePostAction({
          id: singlePost.data.id,
          title: title,
          content: content,
        }))
        setUpdate(false)
      } else {
        alert('제목과 내용을 모두 작성해주세요')
      }
     
    }
    const onContentChange = (e) => {
      setContent(e.target.value)
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
            {!update && singlePost && singlePost.data ? singlePost.data.title : null}
            {update && singlePost && singlePost.data ? <Input defaultValue={singlePost.data.title} required onChange={onTitleChange}></Input> : null}
          </Descriptions.Item>
          <Descriptions.Item label="내용" style={{height:'10vh'}} span={3}>
            {!update && singlePost && singlePost.data ? singlePost.data.content : null}
            {update && singlePost && singlePost.data ? <TextArea defaultValue={singlePost.data.content} required onChange={onContentChange}></TextArea> : null}
          </Descriptions.Item>
          
        </Descriptions>
        <Comment
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
              single={ singlePost && singlePost.data ? singlePost.data.UserId : null }
              user={ user && user.data ? user.data.id : null }
              onUpdate={onUpdate}
              onDelete={onDelete}
              update={update}
              onUpdateSuccess={onUpdateSuccess}
            />
          }
        />
        {singlePost && singlePost.data ? singlePost.data.Comments.map((v, i)=>{
          return (
            <div style={{background:'white'}}>
            <Comment
              style={ {marginLeft:20} }
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
            </div>
          )
        }) : null}
    </AppLayout>
  );
};

export default leagueoflegendid;
