import React from 'react';
import _ from 'lodash';
import { useObserver } from 'mobx-react'
// import { storesContext } from './store';
import { Switch, Route, useLocation } from 'react-router-dom';
import routes from './router';
import Header from './components/Header';
import Sider from './components/Sider';
import Footer from './components/Footer';
import HomeLayout from './layouts/home';
import { Layout } from 'antd';
import './App.less';

const { Content } = Layout;

const App = () => {
  // const store = React.useContext(storesContext);
  const location = useLocation();

  return useObserver(() => _.get(location, 'pathname') === '/' ? (
    <div id="App">
      <Layout className="layout-container">
        <Header />
        <Content>
          <HomeLayout />
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
              >
                { route.layout }
              </Route>
            ))}
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </div>
  ) : (
    <div id="App">
      <Layout className="layout-container" hasSider>
        <Sider />
        <Layout className="layout-container">
          <Header />
          <Content>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                >
                  { route.layout }
                </Route>
              ))}
            </Switch>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  ));
}

export default App;
