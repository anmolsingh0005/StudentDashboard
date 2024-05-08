/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {  BookOutlined,AppstoreOutlined } from '@ant-design/icons';
import {  Image, Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import { addheadername } from '../store/studentdata'
import image from '../assets/image-removebg-preview.png'

const { Header, Footer, Sider,Content } = Layout;

const Dashboard: React.FC = () => {
    const Navigate = useNavigate();
    const header = useSelector((state:any) => state.counter.headername);
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(addheadername("Home"));
    },[])
    const Handlemenuchange=(e:any)=>{
      if(e.key==="Home"){
        dispatch(addheadername("Home"));
        Navigate('/');
      }
      if(e.key==="Course"){
        dispatch(addheadername("Course"));
        Navigate('/course');
      }
    };

  return (
    <Layout style={{height:"100vh"}} >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="demo-logo-vertical" />
        <Image preview={false} onClick={()=>Navigate('/')} style={{padding:'2rem 1rem 2rem 1rem',cursor:'pointer'}} src={image} />
        <Menu onClick={Handlemenuchange} theme="dark" mode="inline" defaultSelectedKeys={[`${header}`]}>
            <Menu.Item key="Home" icon={<AppstoreOutlined />} >Dashboard</Menu.Item>
            <Menu.Item key="Course" icon={<BookOutlined />} >course</Menu.Item>
            </Menu>
      </Sider>
      <Layout  >
        <Header style={{ padding: 0, background: 'white'}} >
         
            <div style={{margin:'0 0 0 2rem'}} >

          {header}
           
           
          </div>
          </Header>
        <Content style={{height:"100vh",overflowY:'scroll'}} >
        <Outlet/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()} Created by Anmol Singh
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;