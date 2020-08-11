import React from 'react';
import { useObserver } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './tools.css';

const Tools = () => {
  const { t } = useTranslation();
  const location = useLocation();
  console.log(location);
  return useObserver(() => (
    <div id="Tools">
      This is advanced tools.
    </div>
  ));
};

Tools.displayName = 'Tools';
export default Tools;
