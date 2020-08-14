
import React from 'react';
import _ from 'lodash';
import { useObserver } from "mobx-react";
import { useTranslation } from "react-i18next"
import { storesContext } from '../../store';
import { SyncOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Text } = Typography;

const Sync = () => {
  const { t } = useTranslation();
  const store = React.useContext(storesContext);
  return useObserver(() => (
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
  ));
};

Sync.displayName = 'Sync';
export default Sync;
