import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Avatar } from 'antd';

const { Header, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: true,
      username: "Emperor"
    };
  }

  render() {
    let login = this.state.login;
    let username = this.state.username;
    let breadList = ["Home", "List", "App"]
    return (
      <div className="app">
        <Router>
          <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['home']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="home"><Link to='/'><Icon type="home" /><span className="nav-text">首页</span></Link></Menu.Item>
                <SubMenu
                  key="sub1"
                  title={<span><Icon type="solution" /><span>会议管理</span></span>}
                >
                  <Menu.Item key="create-meeting">创建会议</Menu.Item>
                  <Menu.Item key="check-meeting">查看会议</Menu.Item>
                  <Menu.Item key="join-meeting">加入会议</Menu.Item>
                </SubMenu>
                
                <SubMenu
                  key="sub2"
                  style={{float: 'right'}}
                  title={<span><Icon type="User" />
                  <Link to="/personal-info">
                    <Avatar size={45} src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1545737839078&amp;di=f0edf8eade5dade202c0dbdfc1e1f0cf&amp;imgtype=0&amp;src=http%3A%2F%2Fp1.img.cctvpic.com%2Fphotoworkspace%2F2016%2F03%2F29%2F2016032919225420641.jpg" />
                  </Link>
                  &nbsp;&nbsp;&nbsp;
                  <span>{username}</span></span>}
                >
                  <Menu.Item key="personal-info">个人信息</Menu.Item>
                  <Menu.Item key="joined-meeting">已加入会议</Menu.Item>
                  <Menu.Item key="logout">注销</Menu.Item>
                </SubMenu>

              </Menu>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              {
                breadList.map((str) => {
                  return <Breadcrumb.Item>{str}</Breadcrumb.Item>
                })
              }
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Reservation Web ©2019 Created by ist-fwwb
            </Footer>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
