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
import { Layout, Menu } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;

const MySider = () => {
  const { t } = useTranslation(['sideBar', 'home', 'advanced']);
  const location = useLocation();
  const history = useHistory();
  // const [ collapsed, setCollapsed ] = React.useState(false);

  const menuItemsList = [
    {
      title: t('sideBar:home'),
      key: '0',
      icon: <HomeOutlined />
    },
    {
      title: t('sideBar:blockchain'),
      key: '1',
      icon: <PartitionOutlined />,
      subMenus: [
        {
          title: t('sideBar:blocks'),
          key: '1_0'
        },
        {
          title: t('sideBar:transactions'),
          key: '1_1'
        },
        {
          title: t('sideBar:assets'),
          key: '1_2'
        }
      ]
    },
    {
      title: t('sideBar:wallet'),
      key: '2',
      icon: <WalletOutlined />,
      subMenus: [
        {
          title: t('sideBar:accounts'),
          key: '2_0'
        },
        {
          title: t('sideBar:transaction Records'),
          key: '2_1'
        },
        {
          title: t('sideBar:transfer'),
          key: '2_2'
        }
      ]
    },
    {
      title: t('sideBar:contract'),
      key: '3',
      icon: <FileSyncOutlined />,
      subMenus: [
        {
          title: t('sideBar:search contract'),
          key: '3_0'
        },
        {
          title: t('sideBar:deploy contract'),
          key: '3_1'
        },
        {
          title: t('sideBar:invoke contract'),
          key: '3_2'
        }
      ],
    },
    {
      title: t('home:advanced'),
      key: '4',
      icon: <DisconnectOutlined />,
      subMenus: [
        {
          title: t('advanced:tools'),
          key: '4_0'
        },
        {
          title: t('advanced:candidate'),
          key: '4_1'
        },
        {
          title: t('advanced:vote'),
          key: '4_2'
        },
        {
          title: t('advanced:signature'),
          key: '4_3'
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
  }

  const generateMenuItem = (menuItem) => {
    if (!menuItem) return;
    const { title, key, icon, subMenus } = menuItem;

    return (
      <SubMenu key={key} icon={icon} title={title}>
        { subMenus.map(item => (<Menu.Item key={item.key}>{ item.title }</Menu.Item>)) }
      </SubMenu>
    );
  };

  const handleHomeClick = () => {
    history.replace('/');
  }

  const generateMenu = () => {
    const listMenu = generateItemList();
    const otherItem = generateMenuItem(listMenu);
    const homeItem = menuItemsList[0];

    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={[listMenu.subMenus[0].key]}
        defaultOpenKeys={[listMenu.key]}
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
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      className="themeColor"
    >
      { generateMenu() }
    </Sider>
  );
};

MySider.displayName = 'Sider';
export default MySider;
