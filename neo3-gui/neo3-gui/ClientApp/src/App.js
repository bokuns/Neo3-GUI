import React, { useEffect, useContext } from 'react';
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
import neoNode from './neoNode';
import neoWebSocket from './neoWebSocket';
import { storesContext } from './store';

const { Content } = Layout;

const App = () => {
  const location = useLocation();
  const store = useContext(storesContext);

  const processGetSyncHeight = (msg) => {
    store.blockSync.setHeight(_.get(msg, 'result', -1));
  }

  const processGetWalletBalance = (msg) => {
    store.wallet.setAccounts(_.get(msg, 'result.accounts'));
    store.wallet.setUnclaimedGas(_.get(msg, 'result.unclaimedGas'));
  }

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      neoNode.switchNode();
    }

    neoWebSocket.initWebSocket();
    neoWebSocket.registMethod("getSyncHeight", processGetSyncHeight);
    neoWebSocket.registMethod("getWalletBalance", processGetWalletBalance);

    return () => {
      neoWebSocket.unregistMethod("getSyncHeight", processGetSyncHeight);
      neoWebSocket.unregistMethod("getWalletBalance", processGetWalletBalance);
    }
  })

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
