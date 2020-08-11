import React from 'react';
import { useObserver } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './blocks.css';

const Blocks = () => {
  const { t } = useTranslation();
  const location = useLocation();
  console.log(location);
  return useObserver(() => (
    <div id="Blocks">
      This is blocks.
    </div>
  ));
};

Blocks.displayName = 'Blocks';
export default Blocks;
