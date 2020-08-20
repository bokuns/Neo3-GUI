import React from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shrinkable } from '../../helpers/shrinkText';
import constants from '../../configs/constants';
import { Button, Table, Tooltip } from 'antd';
import './index.css';

const { BREAKPOINT_LG, THEME_COLOR } = constants;

const BlockList = ({ data, handleLoadMore, isLoading }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const generateTableData = (list) => {
    return list.map(item => {
      return {
        blockInfo: {
          blockHeight: item.blockHeight,
          blockHash: item.blockHash
        },
        blockTime: item.blockTime,
        transactionCount: item.transactionCount,
        key: item.blockHeight
      }
    });
  };

  const handleItemClick = (value) => {
    history.push(`/chain/blocks/${value.blockHeight}`);
  }

  const LoadMore = data.length > 0 ? (
    <div className="text-c mb3" style={{ marginTop: '6px' }}>
      <Button type="primary" onClick={() => handleLoadMore(lastHeight)} disabled={isLoading}>{t("common.load more")}</Button>
    </div>
  ) : (
    <div className="text-c mb3" style={{ marginTop: '6px' }}>
      <Button type="primary" onClick={() => handleLoadMore()} disabled={isLoading}>{t("button.reload")}</Button>
    </div>
  );

  const columns = [
    {
      title: t('blockchain.block info'),
      dataIndex: 'blockInfo',
      fixed: 'left',
      align: 'left',
      // eslint-disable-next-line react/display-name
      render: (value) => (
        <div className="tableItem-wrapper">
          <div className="ant-list-item-meta-title" style={{ cursor: 'pointer' }}
            onClick={() => handleItemClick(value)
          }>
            <h4 style={{ marginBottom: 6 }}>{ value.blockHeight }</h4>
          </div>
          <div className="ant-list-item-meta-description">
            <Shrinkable text={value.blockHash} shrinkPoint={BREAKPOINT_LG} />
          </div>
        </div>
      )
    },
    {
      title: t("blockchain.transaction count"),
      dataIndex: 'transactionCount',
      align: 'center',
      width: 100
    },
    {
      title: t("blockchain.block time"),
      width: 120,
      dataIndex: 'blockTime',
      fixed: 'right',
      align: 'right'
    }
  ];

  const tableData = generateTableData(data);
  let lastHeight = -1;
  if (data.length > 0) {
    lastHeight = (_.get(data[data.length - 1], 'blockHeight') - 1);
  }

  return(
    <div id="BlockList">
      <Table columns={columns}
        dataSource={tableData}
        scroll={{ x: 'max-content' }}
        pagination={false}
        footer={() => LoadMore}
      />
    </div>
  );
};

BlockList.displayName = 'BlockList';
export default BlockList;
