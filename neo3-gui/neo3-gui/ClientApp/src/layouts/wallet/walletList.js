import React from 'react';
import { useObserver } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './walletList.css';

const WalletList = () => {
  const { t } = useTranslation();
  const location = useLocation();
  console.log(location);
  return useObserver(() => (
    <div id="WalletList">
      This is wallet list.
    </div>
  ));
};

WalletList.displayName = 'WalletList';
export default WalletList;
