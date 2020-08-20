import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import './index.css';
import {
  HomeOutlined,
  PartitionOutlined,
  WalletOutlined,
  FileSyncOutlined,
  DisconnectOutlined
} from '@ant-design/icons';
import SettingEntry from '../Setting';
import { Layout, Menu } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;

const MySider = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  // const [ collapsed, setCollapsed ] = React.useState(false);

  const menuItemsList = [
    {
      title: t('sideBar.home'),
      key: '0',
      path: '/',
      icon: <HomeOutlined />
    },
    {
      title: t('sideBar.blockchain'),
      key: '1',
      icon: <PartitionOutlined />,
      subMenus: [
        {
          title: t('sideBar.blocks'),
          key: '1_0',
          path: '/chain/blocks'
        },
        {
          title: t('sideBar.transactions'),
          key: '1_1',
          path: '/chain/transactions'
        },
        {
          title: t('sideBar.assets'),
          key: '1_2',
          path: '/chain/assets'
        }
      ]
    },
    {
      title: t('sideBar.wallet'),
      key: '2',
      icon: <WalletOutlined />,
      subMenus: [
        {
          title: t('sideBar.accounts'),
          key: '2_0',
          path: '/wallet/accounts'
        },
        {
          title: t('sideBar.transaction Records'),
          key: '2_1',
          path: '/wallet/transactions'
        },
        {
          title: t('sideBar.transfer'),
          key: '2_2',
          path: '/wallet/transfer'
        }
      ]
    },
    {
      title: t('sideBar.contract'),
      key: '3',
      icon: <FileSyncOutlined />,
      subMenus: [
        {
          title: t('sideBar.search contract'),
          key: '3_0',
          path: '/contract/search'
        },
        {
          title: t('sideBar.deploy contract'),
          key: '3_1',
          path: '/contract/deploy'
        },
        {
          title: t('sideBar.invoke contract'),
          key: '3_2',
          path: '/contract/invoke'
        }
      ],
    },
    {
      title: t('home.advanced'),
      key: '4',
      icon: <DisconnectOutlined />,
      subMenus: [
        {
          title: t('advanced.tools'),
          key: '4_0',
          path: '/advanced/tools'
        },
        {
          title: t('advanced.candidate'),
          key: '4_1',
          path: '/advanced/candidate'
        },
        {
          title: t('advanced.vote'),
          key: '4_2',
          path: '/advanced/vote'
        },
        {
          title: t('advanced.signature'),
          key: '4_3',
          path: '/advanced/sign'
        }
      ]
    }
  ];

  const generateItemList = () => {
    if (location.pathname.includes('/chain')) {
      return menuItemsList[1];
    } else if (location.pathname.includes('/wallet')) {
      return menuItemsList[2];
    } else if (location.pathname.includes('/contract')) {
      return menuItemsList[3];
    } else if (location.pathname.includes('/advanced')) {
      return menuItemsList[4];
    }
    return;
  };

  const handleHomeClick = () => {
    history.replace('/');
  };

  const handleSubMenuClick = (path) => {
    history.push(path);
  };

  const generateMenuItem = (menuItem) => {
    if (!menuItem) return (<div />);
    const { title, key, icon, subMenus } = menuItem;

    return (
      <SubMenu key={key} icon={icon} title={title}>
        { subMenus.map(item =>
          (<Menu.Item key={item.key} onClick={() => handleSubMenuClick(item.path)}>{ item.title }</Menu.Item>))
        }
      </SubMenu>
    );
  };

  const generateMenu = () => {
    const listMenu = generateItemList();
    const otherItem = generateMenuItem(listMenu);
    const homeItem = menuItemsList[0];

    return (
      <Menu
        mode="inline"
        className="menu-scroll"
        theme="light"
        defaultSelectedKeys={[listMenu.subMenus[0].key]}
        openKeys={[listMenu.key]}
        style={{ height: '100%' }}
      >
        <Menu.Item key={homeItem.key} icon={homeItem.icon} onClick={() => handleHomeClick()}>
          {homeItem.title}
        </Menu.Item>
        { otherItem }
      </Menu>
    );
  };

  return (
    <div id="Sider" style={{ height: '100%' }}>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        style={{ height: '100%' }}
        className="sider-wrapper"
      >
        <div>
          <div className="menu-logo" />
          { generateMenu() }
        </div>
        <SettingEntry />
      </Sider>
    </div>
  );
};

MySider.displayName = 'Sider';
export default MySider;
