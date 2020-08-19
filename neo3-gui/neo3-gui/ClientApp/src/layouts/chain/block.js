import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { getBlockByHeight } from '../../helpers/requests/block';
import { Spin, Row } from 'antd';
import BlockDetail from '../../components/BlockDetail';
import TransList from '../../components/TransList';
import { showErrorModal } from '../../components/Modals';


const Block = () => {
  let { height } = useParams();
  height = +height;

  const [ isLoading, setIsLoading ] = useState(false);
  const [ transList, setTransList ] = useState([]);
  const [ blockDetail, setBlockDetail ] = useState(null);

  const history = useHistory();
  const { t } = useTranslation();

  const getBlockData = (blockHeight, shouldUpdateTransList) => {
    setIsLoading(true);

    return getBlockByHeight(blockHeight).then(data => {
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
  }, [height]);

  return(
    <div id="Block" className="content-container">
      <Spin spinning={isLoading}>
        <Row gutter={[30, 0]} type="flex" style={{ marginBottom: '12px' }}>
          <BlockDetail blockDetail={blockDetail} />
        </Row>
        <Row gutter={[30, 0]} type="flex">
          <TransList transList={transList} />
        </Row>
      </Spin>
    </div>
  );
};

Block.displayName = 'Block';
export default Block;
