import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './index.css';
import Sync from '../Sync';
import { Layout, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Header } = Layout;

const MyHeader = () => {
  const location = useLocation();
  const history = useHistory();
  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <Header id="Header">
      <div className="header-container">
        <Sync />
        <Button type="link" className="backBT"
          style={{ visibility: location.pathname === '/' ? 'hidden' : 'visible' }}
          icon={<ArrowLeftOutlined />} onClick={() => handleBackClick()}
        >Back</Button>
      </div>
    </Header>

  );
};

MyHeader.displayName = 'Header';
export default MyHeader;
