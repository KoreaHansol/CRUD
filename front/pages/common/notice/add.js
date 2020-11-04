import React from 'react';
import AppLayout from '../../../components/AppLayout'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Form, Input, InputNumber, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addPostAction } from '../../../reducers/post';
const Add = () => {
    const { user } = useSelector(state => state.user);
    const layout = {
        labelCol: { span: 1 },
        wrapperCol: { span: 10 },
    };
        
    const validateMessages = {
        required: '${label}은 꼭 필요합니다',
        types: {
            email: '${label} is not validate email!',
            number: '${label} is not a validate number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    const dispatch = useDispatch();
    const onFinish = values => {
        console.log(values);
        dispatch(addPostAction({
            content: {
                title: values.content.title,
                text: values.content.text,
                category: 'notice',
            },
            userid: user.userid 
        }));
    };
  return (
    <AppLayout>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['content', 'title']} label="제목" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['content', 'text']} label="내용">
                <Input.TextArea autoSize={ {minRows: 10, maxRows: 20} }/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
                <Button type="primary" htmlType="submit">
                    취소
                </Button>
                <Button type="primary" htmlType="submit">
                    등록
                </Button>
            </Form.Item>
        </Form>
    </AppLayout>
  );
};

export default Add;
