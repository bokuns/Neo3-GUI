
import React from 'react';
import _ from 'lodash';
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next"
import { storesContext } from '../../store';
import { useViewPort } from '../../helpers/viewPort';
import { SyncOutlined } from '@ant-design/icons';
import { Typography, Drawer } from 'antd';
import constants from '../../configs/constants';

const { BREAKPOINT_XS } = constants;
const { Text } = Typography;

const Sync = () => {
  const { t } = useTranslation();
  const store = React.useContext(storesContext);
  const { width } = useViewPort();
  const [ drawerVisible, setDrawerVisible ] = React.useState(false);

  return useObserver(() => width > BREAKPOINT_XS ? (
    <div id="Sync" className="ml3 mb0">
      {
        (_.get(store, 'blockSync.headerHeight', -1) < 0) ?
          <Text className="t-normal bold"> - / - {t("common.connecting")}</Text> :
          <Text className="t-normal bold">
            {_.get(store, 'blockSync.syncHeight')} / {_.get(store, 'blockSync.headerHeight')} {t("common.syncing")}
          </Text>
      }
      <SyncOutlined className="ml3" type="sync" spin />
    </div>
  ) : (
    <div>
      <SyncOutlined className="ml3" type="sync" spin onClick={() => setDrawerVisible(true)} />
      <Drawer
        placement="top"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        getContainer={false}
        height={40}
        style={{ position: 'absolute' }}
        bodyStyle={{
          height: '40px',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {
          (_.get(store, 'blockSync.headerHeight', -1) < 0) ?
            <Text className="t-normal bold"> - / - {t("common.connecting")}</Text> :
            <Text className="t-normal bold">
              {_.get(store, 'blockSync.syncHeight')} / {_.get(store, 'blockSync.headerHeight')} {t("common.syncing")}
            </Text>
        }
      </Drawer>
    </div>
  ));
};

Sync.displayName = 'Sync';
export default Sync;
