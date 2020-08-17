import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useViewPort } from '../../helpers/viewPort';
import showCopiedMsg from '../../components/Messages/showCopied';
import { getBlocks } from '../../helpers/requests/block';
import shrinkText from '../../helpers/shrinkText';
import { showErrorModal } from '../../components/Modals';
import constants from '../../configs/constants';
import { Spin, Typography, Row, Col, List, PageHeader, Button } from 'antd';
import './index.css';

const { BREAKPOINT_MD } = constants;

const BlockList = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ blocks, setBlocks ] = useState([]);
  const [ lastBlock, setLastBlock ] = useState(-1);
  const [ searchVisible, setSearchVisible ] = useState(false);

  const { width } = useViewPort();
  const { history } = useHistory();
  const { t } = useTranslation();

  const getBlocksData = (lastBlock) => {
    setIsLoading(true);
    return getBlocks({ height: lastBlock }).then(data => {
      if (!Array.isArray(data) || data.length === 0) return;
      if (!isNaN(lastBlock)) {
        setBlocks([
          ...blocks,
          ...data
        ]);
      } else {
        setBlocks([
          ...data,
          ...blocks
        ]);
      }
      setLastBlock(_.get(data[data.length - 1], 'blockHeight') - 1);
    }).catch(err => {
      showErrorModal(err);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleLoadMore = () => {
    getBlocksData(lastBlock);
  };

  const loadMore = blocks.length > 0 ? (
    <div className="text-c mb3">
      <Button type="primary" onClick={() => handleLoadMore()} disabled={isLoading}>{t("common.load more")}</Button>
    </div>
  ) : (
    <div className="text-c mb3">
      <Button type="primary" onClick={() => getBlocksData(lastBlock)} disabled={isLoading}>{t("button.reload")}</Button>
    </div>
  );

  const handleItemClick = (value) => {
    console.log(value);
  }

  useEffect(() => {
    getBlocksData(lastBlock);
  }, []);

  return(
    <div id="BlockList">
      <Spin spinning={isLoading}>
        <Row gutter={[30, 0]} style={{ 'minHeight': 'calc( 100vh - 120px )' }}>
          <Col span={24} className="bg-white pv4">
            <PageHeader title={t("blockchain.blocks")} extra={[
              <Button size="small" type="text" onClick={() => getBlocksData()} key="1" >{t('button.sync now')}</Button>
            ]} />
            <List
              header={
                <div>
                  <span style={{ textAlign: 'left' }}>{t("blockchain.block info")}</span>
                  <span className="float-r ml4"><span className="trans-amount-title">{t("blockchain.transaction count")}</span></span>
                  <span className="float-r">{t("blockchain.block time")}</span>
                </div>
              }
              footer={<span></span>}
              itemLayout="horizontal"
              loading={isLoading}
              loadMore={loadMore}
              dataSource={blocks}
              className="font-s"
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <div onClick={() => handleItemClick(item)}
                        style={{ textAlign: 'left', cursor: 'pointer' }}
                      >
                        {item.blockHeight}
                      </div>
                    }
                    description={
                      <div className="font-s" style={{ textAlign: 'left' }}
                        onContextMenu={() => showCopiedMsg(item.blockHash)}
                      >
                        { width > BREAKPOINT_MD ? item.blockHash : shrinkText(item.blockHash) }
                      </div>
                    }
                  />
                  <Typography>{item.blockTime}</Typography>
                  <Typography className="upcase ml4"><span className="wa-amount">{item.transactionCount}</span></Typography>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

BlockList.displayName = 'BlockList';
export default BlockList;
