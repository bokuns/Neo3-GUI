import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useViewPort } from '../../helpers/viewPort';
import showCopiedMsg from '../../components/Messages/showCopied';
import shrinkText from '../../helpers/shrinkText';
import { showErrorModal } from '../../components/Modals';
import constants from '../../configs/constants';
import { Row, Col, PageHeader, Tooltip, Content, Space } from 'antd';
import './index.css';

const { BREAKPOINT_LG, THEME_COLOR } = constants;

const BlockDetail = (props) => {
  const { width } = useViewPort();
  const history = useHistory();
  const { t } = useTranslation();
  const { blockDetail, changeHeight } = props;
  console.log(props, blockDetail);

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
                <span>Hash: </span><span>{ width > BREAKPOINT_LG ? blockDetail.blockHash : shrinkText(blockDetail.blockHash, 12, 12) }</span>
              </Space>
            </div>
          </Col>
          <Col xs={20} sm={16} md={12} lg={8} xl={4}>
            Col
          </Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            Col
          </Col>
        </Row>
      </div>
    </div>
  );
};

BlockDetail.displayName = 'BlockDetail';
export default BlockDetail;
