import React from 'react';
import { useTranslation } from 'react-i18next';
import { shell, remote } from "electron";
import { Radio } from 'antd';
import { storesContext } from '../../store';
import Config from '../../configs';
import constants from '../../configs/constants';

const { GITHUB_URL, NEO_URL } = constants;

const Setting = () => {
  const { t, i18n } = useTranslation();
  const store = React.useContext(storesContext);

  const switchLang = (lng) => {
    if (Config.Language === lng) return;
    i18n.changeLanguage(lng);
    Config.changeLang(lng);
  };

  const handleSwitchNetwork = (network) => {
    store.global.setNetwork(network);
  };

  const openUrl = (url) => {
    shell.openExternal(url);
  };

  return (
    <div>
      <h4>{t("settings.network")}</h4>

      <Radio.Group name="radiogroup" defaultValue={store.global.network} onChange={(e) => handleSwitchNetwork(e.target.value)}>
        <Radio value="mainnet" disabled>{t("settings.mainnet")}</Radio>
        <Radio value="testnet">{t("settings.testnet")}</Radio>
        <Radio value="private">{t("settings.privatenet")}</Radio>
      </Radio.Group>
      <p className="small mt5">{t("settings.network info")}</p>

      <h4 className="mt3">{t("settings.language")}</h4>
      <Radio.Group className="setting-ul" defaultValue={i18n.language}
        onChange={(e) => switchLang(e.target.value)}
      >
        <Radio value="zh">中文</Radio>
        <Radio value="en">English</Radio>
      </Radio.Group>

      <h4 className="mt3">{t("settings.about")}</h4>
      <p className="font-s">{t("settings.version")} {remote.app.getVersion()}</p>

      <div className="mt1 mb3 text-c small">
        <p className="mb5 t-light">NeoGUI @ 2020 Neo-Project {t("settings.copyright")}</p>
        <p>
          <a className="mr3 t-green" onClick={() => openUrl(GITHUB_URL)}>
            { t("settings.report issues") }
          </a>
          <a className="t-green" onClick={() => openUrl(NEO_URL)}>
            Neo{ t("settings.website") }
          </a>
        </p>
      </div>
    </div>
  );
};

Setting.displayName = 'Setting';
export default Setting;
