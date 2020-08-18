import React from 'react';
import { useObserver } from 'mobx-react';
import BlockList from '../../components/BlockList';

const Blocks = () => {
  return useObserver(() => (
    <div id="Blocks" className="content-container">
      <BlockList />
    </div>
  ));
};

Blocks.displayName = 'Blocks';
export default Blocks;
