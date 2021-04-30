import './App.css';
import 'antd/dist/antd.css'
import './test.css'
import { Layout, Menu, Breadcrumb } from 'antd';

import {
  RightOutlined,
  LeftOutlined,
  AppstoreAddOutlined,
  TableOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';
import React, {useState } from 'react';
import MenuItem from 'antd/lib/menu/MenuItem';
import {Route,  BrowserRouter as Router, Switch, Link, useRouteMatch, Redirect } from 'react-router-dom';

// const { Header, Sider, Content } = Layout;
const { Header, Content, Footer, Sider } = Layout;

function App() {

  
  return (
    <Router>
      <Layout>
        <Header className="header">
          <div className="logo" />
          
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item disabled key="0"> MaseDar </Menu.Item> 
          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/VK.com-logo.svg" style={{width:"24px", height: "24px"} } /> */}
          
            <Menu.Item key="1">
              <Link to="/optimizationmethods">Методы Оптимизации</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/сomputergraphics">Компьютерная Графика</Link>
            </Menu.Item>
          
          </Menu>
        </Header>
        
      <Switch>
        <Route path="/optimizationmethods">
          <MethodOptimize />
        </Route>
        <Route path="/сomputergraphics">
          <About />
        </Route>
        <Route>
          <Redirect to="/optimizationmethods" ></Redirect>
        </Route>
      
    </Switch>
        <Footer style={{ textAlign: 'center' }}>Created by Molotkov Vlad </Footer>
   </Layout>

  </Router>
        
  );
}

function About() {
  return <h2>About</h2>;
}

function MethodOptimize() {
  let match = useRouteMatch();
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);  

  return (
         <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Методы оптимизации</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider collapsed={collapsed} className="site-layout-background" width={300}>
              <Menu 
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%' }}
              >
                {collapsed ?  
                <Menu.Item className='trigger' onClick={toggle} icon={<RightOutlined/>} /> :
                <MenuItem className='trigger'onClick={toggle} icon={<LeftOutlined /> }/>
                }
              
                <Menu.Item key="1" icon={<AppstoreAddOutlined  />}>
                  <Link to={`${match.url}/artificial`}> Метод искусственного базиса</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<TableOutlined />}>
                <Link to={`${match.url}/simplex`}> Симплекс метод </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<AreaChartOutlined />}>
                <Link 
                  to={`${match.url}/visual`}> Графический метод </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: "75vh" }}>
            <Switch>
              <Route exact path={`${match.url}/artificial`}>
                <div>artificial</div>
              </Route>
              <Route exact path={`${match.url}/simplex`}>
                <div>Simplex</div>
              </Route>
              <Route exact path={`${match.url}/visual`}>
                <div> Visual </div>
              </Route>
            </Switch>
            </Content>
          </Layout>
        </Content> 
  );
}


export default App;
