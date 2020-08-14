import React, { useContext } from 'react';
import _ from 'lodash';
import { useObserver } from 'mobx-react';
import Wallet from '../components/Wallet/wallet';
import { storesContext } from '../store';

const Authenticated = (Component) => {
  // 组件有已登陆的模块 直接返回 (防止重新渲染)
  if (Component.AuthenticatedComponent) {
    return Component.AuthenticatedComponent
  }

  const AuthenticatedComponent = (props) => {
    const store = useContext(storesContext);
    return useObserver(() => (
      <div style={{ width: '100%', overflowY:'auto' }}>
          { _.get(store, 'wallet.isOpen') ? <Component { ...props } /> : <Wallet /> }
      </div>
    ));
  };

  Component.AuthenticatedComponent = AuthenticatedComponent
  return Component.AuthenticatedComponent;
}



const UnAuthenticated = (Component) => {
    // 组件有已登陆的模块 直接返回 (防止重新渲染)
  if (Component.AuthenticatedComponent) {
    return Component.AuthenticatedComponent
  }

  // 创建验证组件
  const AuthenticatedComponent = (props) => {
    const store = useContext(storesContext);
      return (
        <div style={{ width: '100%' }}>
          { _.get(store, 'wallet.isOpen') ? <Component { ...props } /> : <Wallet /> }
        </div>
      );
  };

  Component.AuthenticatedComponent = AuthenticatedComponent;
  return Component.AuthenticatedComponent;
}

export { Authenticated, UnAuthenticated };
