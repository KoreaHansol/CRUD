import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { loadUserAction, logoutAction } from '../reducers/user';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const AppLayout = ( { children } ) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const router = useRouter()
    const onLogout = () => {
        dispatch(logoutAction());
    };
    useEffect(() => {
        dispatch(loadUserAction())
    },[])
    let menukey = 0, selectkey = 0;
    const splitPathname = () => {
        let split = router.pathname.split('/');
        console.log(router.pathname)
        for(let i = 0; i < split.length; i++) {
            switch (split[i]) {
                case 'common' : 
                    split[i] = '공지사항'
                break;
                case 'notice' : 
                    split[i] = '공지'
                break;
                case 'etc' : 
                    split[i] = '기타'
                break;
                case 'common' : 
                split[i] = '공지사항'
                break;
                case 'gallery' : 
                    split[i] = '갤러리'
                break;
                case 'leagueoflegend' : 
                    split[i] = '리그오브레전드'
                break;
                case 'programming' : 
                    split[i] = '프로그래밍'
                break;
                case 'javascript' : 
                    split[i] = '자바스크립트'
                break;
                case 'add' : 
                    split[i] = '글쓰기'
                break;
                case 'profile' : 
                    split[i] = '프로필'
                break;
                case 'signup' : 
                    split[i] = '회원가입'
                break;
                case 'login' : 
                    split[i] = '로그인'
                break;
                case '[id]' : 
                    split[i] = '게시글'
                break;
                case '' : 
                    split[0] = '홈'
                break;
            } 
        }
        console.log("split : ", split)
        return (
            <>
                {<Breadcrumb style={{ margin: '16px 0' }}>
                        {split.map((v, i) => {
                                return ( 
                                    <Breadcrumb.Item>{v}</Breadcrumb.Item> 
                                )
                        })}
                    </Breadcrumb>}
            </>
        )
        
        // <Breadcrumb.Item>홈</Breadcrumb.Item>
        // <Breadcrumb.Item>공지사항</Breadcrumb.Item>
        // <Breadcrumb.Item>공지</Breadcrumb.Item>
        
    }
    const sidebarSetting = () => {
        switch (router.pathname) {
            case '/common/notice':
                menukey = 'sub1',
                selectkey = '1'
                return;
            case '/common/notice/add':
                menukey = 'sub1',
                selectkey = '1'
                return;
            case '/common/notice/[id]':
                menukey = 'sub1',
                selectkey = '1'
                return;
            case '/common/etc':
                menukey = 'sub1',
                selectkey = '2' 
                return;
            case '/common/etc/add':
                menukey = 'sub1',
                selectkey = '2' 
                return;
            case '/common/etc/[id]':
                menukey = 'sub1',
                selectkey = '2'
                return;
            case '/gallery/leagueoflegend':
                menukey = 'sub2',
                selectkey = '3' 
                return;
            case '/gallery/leagueoflegend/add':
                menukey = 'sub2',
                selectkey = '3' 
                return;
            case '/gallery/leagueoflegend/[id]':
                menukey = 'sub2',
                selectkey = '3'
                return;
            case '/programming/javascript':
                menukey = 'sub3',
                selectkey = '4' 
                return;
            case '/programming/javascript/add':
                menukey = 'sub3',
                selectkey = '4' 
                return;
            case '/programming/javascript/[id]':
                menukey = 'sub3',
                selectkey = '4'
                return;
        }
    }
    return (
        <div>
            {sidebarSetting()}
            <Layout style={{ height: '100vh', borderRight: 0 }}>
                <Header className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal"  >
                        <Link href="/">
                            <a><img 
                                width='100px'
                                src="https://3.bp.blogspot.com/-z5VTy2Qxrkw/V_IKiYtuG7I/AAAAAAAAAMM/fsiIok7_4f4zcjL4g8Zw8zftx_Mi4FKkQCLcB/s1600/mongodb-crud-operations1.png"/></a>
                        </Link>
                        { user && user.data 
                        ? <>
                            <Menu.Item key="1" style = {{ float:'right' }} onClick={onLogout}>로그아웃</Menu.Item>
                            <Menu.Item key="2" style = {{ float:'right' }}><Link href="/profile"><a>{ user.data.nickname} 님의 프로필</a></Link></Menu.Item>
                        </>
                        : <>
                            <Menu.Item key="1" style = {{ float:'right' }}><Link href="/signup"><a>회원가입</a></Link></Menu.Item>
                            <Menu.Item key="2" style = {{ float:'right' }}><Link href="/login"><a>로그인</a></Link></Menu.Item>
                        </>
                        }
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            style={{ height: '100%', borderRight: 0 }}
                            defaultSelectedKeys={[selectkey]}
                            defaultOpenKeys={[menukey]}
                        >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="공지사항">
                            <Menu.Item key="1"><Link href="/common/notice"><a>공지</a></Link></Menu.Item>
                            <Menu.Item key="2"><Link href="/common/etc"><a>기타</a></Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<NotificationOutlined />} title="갤러리">
                            <Menu.Item key="3"><Link href="/gallery/leagueoflegend"><a>리그오브레전드</a></Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<LaptopOutlined />} title="프로그래밍">
                            <Menu.Item key="4"><Link href="/programming/javascript"><a>자바스크립트</a></Link></Menu.Item>
                        </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        {splitPathname()}
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                            >
                            <Row>
                                <Col span={21}>{children}</Col>
                                <Col span={3}></Col>
                            </Row>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;