import React from 'react';
import { useObserver } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './search.css';

const ContractSearch = () => {
  const { t } = useTranslation();
  const location = useLocation();
  console.log(location);
  return useObserver(() => (
    <div id="ContractSearch">
      This is contract search.
    </div>
  ));
};

ContractSearch.displayName = 'ContractSearch';
export default ContractSearch;
