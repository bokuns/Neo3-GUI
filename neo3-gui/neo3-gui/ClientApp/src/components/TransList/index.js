import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useViewPort } from '../../helpers/viewPort';
import { getTransactions } from '../../helpers/requests/transaction';
import { Shrinkable } from '../../helpers/shrinkText';
import { showErrorModal } from '../../components/Modals';
import constants from '../../configs/constants';
import { Spin, PageHeader, Button, Table, Tooltip } from 'antd';
import './index.css';

const { BREAKPOINT_LG, THEME_COLOR } = constants;

const TransList = ({ transList }) => {
  console.log('transList:', transList);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ cumTransList, setCumTransList ] = useState([]);
  const [ tableData, setTableData ] = useState([]);
  const [ lastTrans, setLastTrans ] = useState(-1);

  const { width } = useViewPort();
  const history = useHistory();
  const { t } = useTranslation();

  const getTransData = (page) => {
    if (isNaN(page) || page < 1) page = 1;
    return getTransactions(page).then(data => {
      setCumTransList([
        ...cumTransList,
        ...data
      ]);
    });
  };

  const handleLoadMore = () => {

  };

  const LoadMore = transList.length > 0 ? (
    <div className="text-c mb3" style={{ marginTop: '6px' }}>
      <Button type="primary" onClick={() => handleLoadMore()} disabled={isLoading}>{t("common.load more")}</Button>
    </div>
  ) : (
    <div className="text-c mb3" style={{ marginTop: '6px' }}>
      <Button type="primary" onClick={() => getTransData(lastTrans)} disabled={isLoading}>{t("button.reload")}</Button>
    </div>
  );

  const handleItemClick = (value) => {
    console.log(value);
  };

  useEffect(() => {
    setCumTransList(transList);
  }, []);

  const columns = [
    {
      title: t('blockchain.transaction.status'),
      dataIndex: 'status',
      fixed: 'left',
      align: 'left',
      width: 100,
    },
    {
      title: t('blockchain.transaction info'),
      dataIndex: 'txId',
      align: 'left'
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
    <div id="TransList" className="translist-container">
      <PageHeader title={t("blockchain.transaction info")} className="bg-white pv4" />
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

TransList.displayName = 'TransList';
export default TransList;
