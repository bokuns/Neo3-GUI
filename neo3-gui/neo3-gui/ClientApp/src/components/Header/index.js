import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useViewPort } from '../../helpers/viewPort';
import constants from '../../configs/constants';
import './index.css';
import Sync from '../Sync';
import { Layout, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { BREAKPOINT_MD } = constants;

const MyHeader = () => {
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const { width } = useViewPort();
  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <Header id="Header">
      <div className="header-container">
        <Sync />
        <Button type="link" className="backBT"
          style={{
            visibility: location.pathname === '/' ? 'hidden' : 'visible',
            left: width <= BREAKPOINT_MD ? '24px' : '-6px'
          }}
          icon={<ArrowLeftOutlined />} onClick={() => handleBackClick()}
        >{ t('common.back') }</Button>
      </div>
    </Header>
  );
};

MyHeader.displayName = 'Header';
export default MyHeader;
