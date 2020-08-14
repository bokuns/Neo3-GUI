import React from 'react';
import { useObserver } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './blocks.css';

const Blocks = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return useObserver(() => (
    <div id="Blocks">
      This is blocks.
    </div>
  ));
};

Blocks.displayName = 'Blocks';
export default Blocks;
