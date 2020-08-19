import React, { useContext, useEffect } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useHistory, } from 'react-router-dom';
import { storesContext } from '../../store';
import { Shrinkable } from '../../helpers/shrinkText';
import constants from '../../configs/constants';
import { Row, Col, PageHeader, Space } from 'antd';
import './index.css';

const { BREAKPOINT_LG } = constants;

const BlockDetail = ({ blockDetail }) => {
  const store = useContext(storesContext);
  const history = useHistory();
  const { t } = useTranslation();

  const alignCol = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
  }

  useEffect(() => {

  }, []);

  return _.isEmpty(blockDetail) ? null : (
    <div id="BlockDetail" className="blockdetail-container bg-white">
      <PageHeader title={t("blockchain.block info")}  className="pv4" />
      <div className="info-detail pv3 blockdetail-wrapper">
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="hash-title mt5 mb4">
              <Space align="baseline" size="middle">
                <span>Hash: </span>
                <Shrinkable text={blockDetail.blockHash} shrinkPoint={BREAKPOINT_LG} prefixCount={12} suffixCount={12} />
              </Space>
            </div>
          </Col>
        </Row>
        <Row align="middle">
          <Col xs={alignCol.xs} sm={alignCol.sm} md={alignCol.md} lg={alignCol.lg} xl={alignCol.xl}>
            <Space align="baseline" size="small">
              <span className="hint">{t("blockchain.height")}:</span>
              <span>{blockDetail.blockHeight}</span>
            </Space>
          </Col>
          <Col xs={alignCol.xs} sm={alignCol.sm} md={alignCol.md} lg={alignCol.lg} xl={alignCol.xl}>
            <Space align="baseline" size="small">
              <span className="hint">{t("common.size")}：</span>
              <span>{blockDetail.size} {t("common.bytes")}</span>
            </Space>
          </Col>
        </Row>
        <Row align="middle">
          <Col xs={alignCol.xs} sm={alignCol.sm} md={alignCol.md} lg={alignCol.lg} xl={alignCol.xl}>
            <Space align="baseline" size="small">
              <span className="hint">{t("blockchain.timestamp")}：</span>
              <span>{blockDetail.blockTime}</span>
            </Space>
          </Col>
          <Col xs={alignCol.xs} sm={alignCol.sm} md={alignCol.md} lg={alignCol.lg} xl={alignCol.xl}>
            <Space align="baseline" size="small">
              <span className="hint">{t("blockchain.nounce")}：</span>
              <span>{_.get(blockDetail, 'consensusData.nonce')}</span>
            </Space>
          </Col>
        </Row>
        <Row align="middle">
          <Col xs={alignCol.xs} sm={alignCol.sm} md={alignCol.md} lg={alignCol.lg} xl={alignCol.xl}>
            <Space align="baseline" size="small">
              <span className="hint">{t("blockchain.network fee")}：</span>
              <span>{blockDetail.networkFee ? blockDetail.networkFee : '--'}</span>
            </Space>
          </Col>
          <Col xs={alignCol.xs} sm={alignCol.sm} md={alignCol.md} lg={alignCol.lg} xl={alignCol.xl}>
            <Space align="baseline" size="small">
              <span className="hint">{t("blockchain.system fee")}：</span>
              <span>{blockDetail.systemFee ? blockDetail.systemFee : '--'}</span>
            </Space>
          </Col>
        </Row>
        <Row align="middle">
          <Col xs={alignCol.xs} sm={alignCol.sm} md={alignCol.md} lg={alignCol.lg} xl={alignCol.xl}>
            <Space align="baseline" size="small">
              <span className="hint">{t("blockchain.confirmations")}：</span>
              <span>{blockDetail.confirmations}</span>
            </Space>
          </Col>
          <Col xs={alignCol.xs} sm={alignCol.sm} md={alignCol.md} lg={alignCol.lg} xl={alignCol.xl}>
            <Space align="baseline" size="small">
              <span className="hint">{t("blockchain.witness")}：</span>
              <Shrinkable text={blockDetail.nextConsensus} shrinkPoint={BREAKPOINT_LG} />
            </Space>
          </Col>
        </Row>
        <Row align="middle">
          <Col xs={alignCol.xs} sm={alignCol.sm} md={alignCol.md} lg={alignCol.lg} xl={alignCol.xl}>
            <Space align="baseline" size="small">
              <span className="hint">{t("blockchain.prev block")}：</span>
              { blockDetail.blockHeight !== 0 ? (
                <div className="cursor-pointer"
                  onClick={() => history.replace(`/chain/blocks/${blockDetail.blockHeight - 1}`)}
                >
                  {blockDetail.blockHeight - 1}
                </div>
                ) : (
                  <div> -- </div>
                )
              }
            </Space>
          </Col>
          <Col xs={alignCol.xs} sm={alignCol.sm} md={alignCol.md} lg={alignCol.lg} xl={alignCol.xl}>
            <Space align="baseline" size="small">
              <span className="hint">{t("blockchain.next block")}：</span>
              { _.get(store, 'blockSync.syncHeight', -1) > blockDetail.blockHeight ? (
                <div className="cursor-pointer"
                  onClick={() => history.replace(`/chain/blocks/${blockDetail.blockHeight + 1}`)}
                >
                  {blockDetail.blockHeight + 1}
                </div>
              ) : (
                <div> -- </div>
              )}
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

BlockDetail.displayName = 'BlockDetail';
export default BlockDetail;
