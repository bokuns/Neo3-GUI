import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Spin, Tabs } from 'antd';
import TransList from '../../components/TransList';
import { showErrorModal } from '../../components/Modals';
import { getTransactions, getUntransactions } from '../../helpers/requests/transaction';
const { TabPane } = Tabs;

const Transcations = () => {
  const { t } = useTranslation();

  const [ isLoading, setIsLoading ] = useState(false);
  const [ transList, setTransList ] = useState([]);
  const [ untransList, setUntransList ] = useState([]);
  const [ transPage, setTransPage ] = useState(1);
  const [ untransPage, setUntransPage ] = useState(1);

  const getTransData = ({ pageIndex, pageSize, shouldAppend }) => {
    if (!isLoading) setIsLoading(true);

    return getTransactions(pageIndex, pageSize).then(res => {
      const newList = _.get(res, 'list', []);
      if (shouldAppend) {
        setTransList([
          ...transList,
          ...newList
        ]);
      } else {
        setTransList([
          ...newList
        ]);
      }
    }).catch((error) => {
      showErrorModal(error);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const getUntransData = ({ pageIndex, pageSize, shouldAppend }) => {
    if (!isLoading) setIsLoading(true);

    return getUntransactions(pageIndex, pageSize).then(res => {
      const newList = _.get(res, 'list', []);
      if (shouldAppend) {
        setUntransList([
          ...untransList,
          ...newList
        ]);
      } else {
        setUntransList([
          ...newList
        ]);
      }
    }).catch((error) => {
      showErrorModal(error);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleLoadMore = (isUntrans) => {
    if (isUntrans) {
      getUntransData({ pageIndex: untransPage + 1, shouldAppend: true }).then(() => {
        setUntransPage(untransPage + 1);
      });
    } else {
      getTransData({ pageIndex: transPage + 1, shouldAppend: true }).then(() => {
        setTransPage(transPage + 1);
      });
    }
  };

  useEffect(() => {
    getTransData({ pageIndex: transPage });
    getUntransData({ pageIndex: untransPage });
  }, []);

  return(
    <div id="Transcations" className="content-container">
      <Spin spinning={isLoading}>
        <Tabs className="tran-title trans-list-title bg-white" defaultActiveKey="1">
          <TabPane tab={t("blockchain.transactions")} key="transTab">
            <TransList data={transList}
              handleLoadMore={handleLoadMore}
              isLoading={isLoading}
            />
          </TabPane>
          <TabPane tab={t("blockchain.transaction.pending")} key="untransTab">
            <TransList data={untransList}
              handleLoadMore={() => handleLoadMore(true)}
              isLoading={isLoading}
            />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
};

Transcations.displayName = 'Transcations';
export default Transcations;
