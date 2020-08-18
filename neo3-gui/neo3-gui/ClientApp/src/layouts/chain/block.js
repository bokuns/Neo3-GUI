import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useViewPort } from '../../helpers/viewPort';
import { getBlockByHeight } from '../../helpers/requests/block';
import constants from '../../configs/constants';
import { Spin, Typography, Row, Col, List, PageHeader, Button, Table, Tooltip } from 'antd';
import { SwapRightOutlined } from '@ant-design/icons';
import BlockDetail from '../../components/BlockDetail';
import { showErrorModal } from '../../components/Modals';

const { BREAKPOINT_LG, THEME_COLOR } = constants;

const Block = () => {
  let { height } = useParams();
  height = +height;

  const [ isLoading, setIsLoading ] = useState(false);
  const [ transList, setTransList ] = useState([]);
  const [ transListTable, setTransListTable ] = useState([]);
  const [ blockDetail, setBlockDetail ] = useState(null);
  const [ nonce, setNonce ] = useState(0);
  const [ witness, setWitness ] = useState('');
  const [ selectedHeight, setSelectedHeight ] = useState(-1);

  const { width } = useViewPort();
  const history = useHistory();
  const { t } = useTranslation();

  const getBlockData = (blockHeight, shouldUpdateTransList) => {
    return getBlockByHeight(blockHeight).then(data => {
      setSelectedHeight(height);
      setBlockDetail(JSON.parse(JSON.stringify(data)));

      if (shouldUpdateTransList === true) {
        setTransList([
          ..._.get(data, 'result.list', [])
        ]);
      }
    }).catch(err => {
      showErrorModal(err);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isNaN(height)) {
      return history.goBack();
    }
    getBlockData(height, true);
  }, []);

  return(
    <div id="Block" className="content-container">
      <Row gutter={[30, 0]} type="flex">
        <BlockDetail blockDetail={blockDetail} changeHeight={getBlockData} />
      </Row>

      <Row gutter={[30, 0]} className="mt2 mb2" type="flex" style={{ 'minHeight': '120px' }}>
        <Col span={24} className="bg-white pv4">
          <PageHeader title={t("blockchain.transactions")}></PageHeader>
          <List
            header={<div><span className="succes-light">{t("blockchain.transaction.status")}</span><span>{t("blockchain.transaction info")}</span><span className="float-r">{t("common.time")}</span></div>}
            footer={<span></span>}
            itemLayout="horizontal"
            dataSource={transList}
            className="font-s"
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                title={<span className="succes-light">{t('blockchain.transaction.confirmed')}</span>}
                />
                <div className="trans-detail">
                    <p>
                      <Link className="w500 ellipsis hash" to={{ pathname: "/chain/transaction:" + item.txId, title: t("show detail"), state: { from: this.props.location.pathname } }}>{item.txId}</Link>
                      <span className="float-r">{item.blockTime}</span>
                    </p>
                    {item.transfers[0]?
                    <div >
                      <span className="w200 ellipsis">{item.transfers[0].fromAddress ? item.transfers[0].fromAddress : "--"}</span>
                      <SwapRightOutlined />
                      <span className="w200 ellipsis" >{item.transfers[0].toAddress ? item.transfers[0].toAddress : "--"}</span>
                      <span className="float-r"><span className="trans-amount">{item.transfers[0].amount}</span>{item.transfers[0].symbol}</span>
                    </div>
                    :null}
                </div>
              </List.Item>
            )}
          />
        </Col>
        <div className="pv1"></div>
      </Row>
    </div>
  );
};

Block.displayName = 'Block';
export default Block;
