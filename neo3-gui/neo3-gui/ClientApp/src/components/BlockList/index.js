import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useViewPort } from '../../helpers/viewPort';
import { getBlocks } from '../../helpers/requests/block';
import { Shrinkable } from '../../helpers/shrinkText';
import { showErrorModal } from '../../components/Modals';
import constants from '../../configs/constants';
import { Spin, PageHeader, Button, Table, Tooltip } from 'antd';
import './index.css';

const { BREAKPOINT_LG, THEME_COLOR } = constants;

const BlockList = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ blocks, setBlocks ] = useState([]);
  const [ tableData, setTableData ] = useState([]);
  const [ lastBlock, setLastBlock ] = useState(-1);
  const [ searchVisible, setSearchVisible ] = useState(false);

  const { width } = useViewPort();
  const history = useHistory();
  const { t } = useTranslation();

  const generateTableData = (data) => {
    return data.map(item => {
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

  const getBlocksData = (lastBlock) => {
    setIsLoading(true);
    return getBlocks({ height: lastBlock }).then(data => {
      if (!Array.isArray(data) || data.length === 0) return;

      if (isNaN(lastBlock)) {
        if (blocks.length > 0) {
          const latest = blocks[0];
          const index = data.findIndex(item => item.blockHeight === latest.blockHeight);
          if (index > 0) {
            data = data.slice(0, index);
          }
        }
        setBlocks([
          ...data,
          ...blocks
        ]);
        setTableData([
          ...generateTableData(data),
          ...tableData
        ]);
      } else {
        setBlocks([
          ...blocks,
          ...data
        ]);
        setTableData([
          ...tableData,
          ...generateTableData(data)
        ]);
        setLastBlock(_.get(data[data.length - 1], 'blockHeight') - 1);
      }
    }).catch(err => {
      showErrorModal(err);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleLoadMore = () => {
    getBlocksData(lastBlock);
  };

  const LoadMore = blocks.length > 0 ? (
    <div className="text-c mb3" style={{ marginTop: '6px' }}>
      <Button type="primary" onClick={() => handleLoadMore()} disabled={isLoading}>{t("common.load more")}</Button>
    </div>
  ) : (
    <div className="text-c mb3" style={{ marginTop: '6px' }}>
      <Button type="primary" onClick={() => getBlocksData(lastBlock)} disabled={isLoading}>{t("button.reload")}</Button>
    </div>
  );

  const handleItemClick = (value) => {
    history.push(`/chain/blocks/${value.blockHeight}`);
  }

  useEffect(() => {
    getBlocksData(lastBlock);
  }, []);

  const columns = [
    {
      title: t('blockchain.block info'),
      dataIndex: 'blockInfo',
      fixed: 'left',
      align: 'left',
      // eslint-disable-next-line react/display-name
      render: (value, row, index) => (
        <div className="tableItem-wrapper" key={`${row}-${index}`}>
          <div className="ant-list-item-meta-title" style={{ cursor: 'pointer' }}
            onClick={() => handleItemClick(value)
          }>
            <h4 style={{ marginBottom: 6 }}>{ value.blockHeight }</h4>
          </div>
          <Tooltip placement="rightBottom" title={t('common.right click to copy hash')} color={THEME_COLOR} >
            <div className="ant-list-item-meta-description">
              <Shrinkable text={value.blockHash} shrinkPoint={BREAKPOINT_LG} />
            </div>
          </Tooltip>
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
  ]

  return(
    <div id="BlockList">
      <PageHeader title={t("blockchain.blocks")} className="bg-white pv4" extra={[
        <Button size="small" type="text" onClick={() => getBlocksData()} key="1" >{t('button.sync now')}</Button>
      ]} />
      <Spin spinning={isLoading}>
        <Table columns={columns}
          dataSource={tableData}
          scroll={{ x: 'max-content' }}
          size="default"
          pagination={false}
          footer={() => LoadMore}
        />
      </Spin>
    </div>
  );
};

BlockList.displayName = 'BlockList';
export default BlockList;
