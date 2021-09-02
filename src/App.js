import "antd/dist/antd.css";
import "./help.css";
import { Layout, Menu, Breadcrumb } from "antd";

import {
  QuestionOutlined,
  RightOutlined,
  LeftOutlined,
  AppstoreAddOutlined,
  TableOutlined,
  AreaChartOutlined,
  DotChartOutlined,
  FireOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import MenuItem from "antd/lib/menu/MenuItem";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import Simplex from "./components/methods/simplex/Simplex";
import ArtificialBasis from "./components/methods/simplex/ArtificialBasis";
import Dev from "./components/Dev";
import Page from "./components/computerGraphics/Course/Page";
import UlamSpiral from "./components/volch/UlamSpiral";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header className="header">
          <div className="logo" />
          {/* TODO: пофиксить баг с ключами (при обновалении страницы не всегда та вкладка) */}
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item
              disabled
              key="0"
              title="Молотков Влад"
              icon={<FireOutlined />}
            />
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/VK.com-logo.svg" style={{width:"24px", height: "24px"} } /> */}

            <Menu.Item key="1" title="Методы Оптимизации">
              <Link to="/optimizationmethods">Методы Оптимизации</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/computergraphics" title="Компьютерная Графика">
                Компьютерная Графика
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/mpea" title="МПЭА">
                МПЭА
              </Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Switch>
          <Route path="/optimizationmethods">
            <MethodOptimize />
          </Route>
          <Route path="/computergraphics">
            <ComputerGraphics />
          </Route>
          <Route path="/mpea">
            <UlamSpiral />
          </Route>
          <Route>
            <Redirect to="/optimizationmethods"></Redirect>
          </Route>
        </Switch>
        <Footer style={{ textAlign: "center" }}>
          Created by Molotkov Vlad{" "}
        </Footer>
      </Layout>
    </Router>
  );
}

function ComputerGraphics() {
  let match = useRouteMatch();
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  return (
    <Content style={{ padding: "0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Компьютерная Графика</Breadcrumb.Item>
        <Breadcrumb.Item>Алгоритмы</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
        <Sider
          collapsed={collapsed}
          className="site-layout-background"
          width={265}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["0"]}
            style={{ height: "100%" }}
          >
            {collapsed ? (
              <Menu.Item
                className="trigger"
                onClick={toggle}
                icon={<RightOutlined />}
              />
            ) : (
              <MenuItem
                className="trigger"
                onClick={toggle}
                icon={<LeftOutlined />}
              />
            )}
            <Menu.Item key="1" icon={<DotChartOutlined />}>
              <Link to={`${match.url}/dashboard`}>Доска</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<QuestionOutlined />}>
              <Link to={`${match.url}/help`}>Справка</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: "0 24px", minHeight: "75vh" }}>
          <Switch>
            <Route exact path={`${match.url}/dashboard`}>
              {/* <CGPage /> */}
              <Page />
            </Route>
            <Route exact path={`${match.url}/help`}>
              <Dev />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Content>
  );
}

function MethodOptimize() {
  let match = useRouteMatch();
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(!collapsed);

  return (
    <Content style={{ padding: "0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Методы оптимизации</Breadcrumb.Item>
        <Breadcrumb.Item>Simplex</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
        <Sider
          collapsed={collapsed}
          className="site-layout-background"
          width={265}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["0"]}
            style={{ height: "100%" }}
          >
            {collapsed ? (
              <Menu.Item
                className="trigger"
                onClick={toggle}
                icon={<RightOutlined />}
              />
            ) : (
              <MenuItem
                className="trigger"
                onClick={toggle}
                icon={<LeftOutlined />}
              />
            )}
            <Menu.Item key="1" icon={<AppstoreAddOutlined />}>
              <Link to={`${match.url}/artificial`}>
                {" "}
                Метод искусственного базиса
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<TableOutlined />}>
              <Link to={`${match.url}/simplex`}> Симплекс метод </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<AreaChartOutlined />}>
              <Link to={`${match.url}/visual`}> Графический метод </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: "0 24px", minHeight: "75vh" }}>
          <Switch>
            <Route exact path={`${match.url}/artificial`}>
              <ArtificialBasis />
            </Route>
            <Route exact path={`${match.url}/simplex`}>
              <Simplex />
            </Route>
            <Route exact path={`${match.url}/visual`}>
              <Dev />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Content>
  );
}

export default App;
