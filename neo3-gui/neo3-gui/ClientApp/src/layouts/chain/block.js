import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { getBlockByHeight } from '../../helpers/requests/block';
import { Spin, Row } from 'antd';
import BlockDetail from '../../components/BlockDetail';
import TransList from '../../components/TransList';
import { showErrorModal } from '../../components/Modals';
import { getTransactionsByBlockHeight } from '../../helpers/requests/transaction';


const Block = () => {
  const history = useHistory();
  let { height } = useParams();
  height = +height;

  const [ isLoading, setIsLoading ] = useState(false);
  const [ transList, setTransList ] = useState([]);
  const [ blockDetail, setBlockDetail ] = useState(null);
  const [ transPage, setTransPage ] = useState(1);

  const getTransData = ({ blockHeight, pageIndex, pageSize, shouldAppend }) => {
    if (!isLoading) setIsLoading(true);

    return getTransactionsByBlockHeight(blockHeight, pageIndex, pageSize).then(res => {
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
    });
  };

  const getBlockData = (blockHeight) => {
    setIsLoading(true);

    return getBlockByHeight(blockHeight).then(data => {
      setBlockDetail(JSON.parse(JSON.stringify(data)));
      return getTransData({ blockHeight: data.blockHeight });
    }).catch(err => {
      showErrorModal(err);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleLoadMore = () => {
    getTransData({
      blockHeight: _.get(blockDetail, 'blockHeight'),
      pageIndex: transPage,
      shouldAppend: true
    }).then(() => {
      setTransPage(transPage + 1);
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
    getBlockData(height);
  }, [height]);

  return(
    <div id="Block" className="content-container">
      <Spin spinning={isLoading}>
        <Row gutter={[30, 0]} type="flex" style={{ marginBottom: '12px' }}>
          <BlockDetail blockDetail={blockDetail} />
        </Row>
        <Row gutter={[30, 0]} type="flex">
          <TransList data={transList}
            handleLoadMore={handleLoadMore}
          />
        </Row>
      </Spin>
    </div>
  );
};

Block.displayName = 'Block';
export default Block;
