import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { message, Modal, Menu } from 'antd';
import { ReadOutlined, KeyOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import './index.css';
import { storesContext } from '../../store';
import neoNode from '../../neoNode';
import { getAddresses } from '../../helpers/requests/address';
import { closeWallet } from '../../helpers/requests/wallet';
// import { showErrorModal } from '../../components/Modals';
import Configs from '../../configs';
import AddressDetail from '../../components/AddressDetail';
import ChangePwd from './changePwd';
import Setting from './Setting';

const SettingEntry = () => {
  const { t } = useTranslation();
  const store = useContext(storesContext);
  const history = useHistory();

  const [title, setTitle] = useState(t('sideBar.settings'));
  const [children, setChildren] = useState(<div />);
  const [showModal, setShowModal] = useState(false);

  const setWallet = () => {
    getAddresses().then(data =>{
      store.wallet.setWalletState(true);
      store.wallet.setAccounts(_.get(data, 'result.accounts', []));
    }).catch((err) => {
      console.log(JSON.stringify(err));
      // showErrorModal({ error: err });
    });
  };

  const logout = () => {
    closeWallet().then(() => {
      message.success(t('wallet.close wallet'), 2);
      store.wallet.logout();
      history.replace('/');
    }).catch(err => {
      message.error('Failed to close wallet. Please try again.', 3);
      console.log(JSON.stringify(err));
    });
  };

  const handleSetShowModal = (value) => {
    setShowModal(value);
    if (!value) {
      closeWallet().then(() => {
        store.wallet.logout();
      }).catch(err => {
        message.error('Failed to close wallet. Please try again.', 3);
        console.log(err);
      }).finally(() => {
        store.blockSync.setHeight({ syncHeight: -1, headerHeight: -1 });
        history.replace('/');
      });
    }
  };

  const getInset = (elem) => {
    let title;
    let children;
    switch(elem) {
      case 0:
        title = t('sideBar.address book');
        children = (<AddressDetail />);
        break;
      case 1:
        title = t('sideBar.change pass');
        children = (<ChangePwd logout={() => logout()} />);
        break;
      case 2:
        title = t('sideBar.settings');
        children = (<Setting />);
        break;
    }
    setTitle(title);
    setChildren(children);
    setShowModal(true);
  };

  useEffect(() => {
    setWallet();
  });

  return (
    <div id="SettingEntry" className="menu-down">
      <Menu mode="inline" selectable={false}>
        { store.wallet.isOpen ? (
          <Menu.Item key="0" icon={<ReadOutlined />} onClick={() => getInset(0)}>
            <span>{t("sideBar.address book")}</span>
          </Menu.Item>
        ) : null }

        { store.wallet.isOpen ? (
          <Menu.Item key="1" icon={<KeyOutlined />} onClick={() => getInset(1)}>
            <span>{t("sideBar.change pass")}</span>
          </Menu.Item>
        ) : null }

        { store.wallet.isOpen ? (
          <Menu.Item key="-1" icon={<LogoutOutlined />} onClick={() => logout()}>
            <span>{t("sideBar.logout")}</span>
          </Menu.Item>
        ) : null }

        <Menu.Item key="2" icon={<SettingOutlined />} onClick={() => getInset(2)} >
          <span>{t("sideBar.settings")}</span>
        </Menu.Item>
      </Menu>

      <Modal
        className="set-modal"
        title={t(title)}
        visible={showModal}
        onCancel={() => handleSetShowModal(false)}
        footer={null}
      >
        {children}
      </Modal>
    </div>
  );
};

SettingEntry.displayName = 'SettingEntry';
export default SettingEntry;
