import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { Shrinkable } from '../../helpers/shrinkText';
import constants from '../../configs/constants';
import { Button, Table } from 'antd';
import './index.css';

const { BREAKPOINT_LG } = constants;

const TransList = ({ data, handleLoadMore, isLoading }) => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();

  const LoadMore = data.length > 0 ? (
    <div className="text-c mb3" style={{ marginTop: '6px' }}>
      <Button type="primary" onClick={() => handleLoadMore()} disabled={isLoading}>{t("common.load more")}</Button>
    </div>
  ) : (
    <div className="text-c mb3" style={{ marginTop: '6px' }}>
      <Button type="primary" onClick={() => handleLoadMore()} disabled={isLoading}>{t("button.reload")}</Button>
    </div>
  );

  const handleItemClick = (value) => {
    let currPath = _.get(location, 'pathname');
    if (_.endsWith(currPath, '/')) currPath = _.trimEnd(currPath, '/');
    history.push(`${currPath}/${value}`);
  };

  const columns = [
    {
      title: t('blockchain.transaction info'),
      dataIndex: 'txId',
      align: 'left',
      // eslint-disable-next-line react/display-name
      render: (value) => (
        <div className="ant-list-item-meta-description cursor-pointer" onClick={() => handleItemClick(value)} >
          <Shrinkable text={value} shrinkPoint={BREAKPOINT_LG} copyable pointer />
        </div>
      )
    },
    {
      title: t("blockchain.block time"),
      width: 120,
      dataIndex: 'blockTime',
      fixed: 'right',
      align: 'right'
    }
  ]

  return(
    <div id="TransList" className="translist-container bg-white">
      <Table columns={columns} rowKey="txId"
        dataSource={data}
        scroll={{ x: 'max-content' }}
        pagination={false}
        footer={() => LoadMore}
      />
    </div>
  );
};

TransList.displayName = 'TransList';
export default TransList;
