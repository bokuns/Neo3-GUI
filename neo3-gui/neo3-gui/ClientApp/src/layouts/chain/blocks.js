import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getBlocks } from '../../helpers/requests/block';
import { showErrorModal } from '../../components/Modals';
import BlockList from '../../components/BlockList';
import { PageHeader, Button, Spin } from 'antd';

const Blocks = () => {
  const { t } = useTranslation();

  const [ isLoading, setIsLoading ] = useState(false);
  const [ blocks, setBlocks ] = useState([]);
  const [ searchVisible, setSearchVisible ] = useState(false);

  const getBlocksData = (lastHeight) => {
    setIsLoading(true);
    return getBlocks({ height: lastHeight }).then(data => {
      if (!Array.isArray(data) || data.length === 0) return;

      if (isNaN(lastHeight)) { // get latest blocks
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
      } else { // get earlier blocks
        setBlocks([
          ...blocks,
          ...data
        ]);
      }
    }).catch(err => {
      showErrorModal(err);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleLoadMore = (lastBlock) => {
    getBlocksData(lastBlock);
  };

  useEffect(() => {
    getBlocksData();
  }, []);

  return (
    <div id="Blocks" className="content-container">
      <PageHeader title={t("blockchain.blocks")} className="bg-white pv4" extra={[
        <Button size="small" type="text" onClick={() => handleLoadMore()} key="1" >{t('button.sync now')}</Button>
      ]} />
      <Spin spinning={isLoading}>
        <BlockList data={blocks} isLoading={isLoading} handleLoadMore={handleLoadMore} />
      </Spin>
    </div>
  );
};

Blocks.displayName = 'Blocks';
export default Blocks;
