import fs from "fs";
import path from 'path';
import { remote } from 'electron';
import constants from './constants';
const { GUI_CONFIG_DEFAULT } = constants;
const appPath = remote.app.getAppPath().replace('app.asar', '');
const CONFIG_FILE_NAME = path.join(appPath, 'gui-config.json');

const Config = {
  Port: GUI_CONFIG_DEFAULT.Port,
  RPCURL: GUI_CONFIG_DEFAULT.RPCURL,
  Language: GUI_CONFIG_DEFAULT.Language,
  Network: GUI_CONFIG_DEFAULT.Network,

  /**
   * init config object from json data
   */
  initConfig: function() {
    let config = {};
    try {
      const file = fs.readFileSync(CONFIG_FILE_NAME, 'utf8');
      config = JSON.parse(file);
    } catch (e) {
      console.log('Failed to load config file from disk. Use default config.');
    }
    this.Port = config.Port || GUI_CONFIG_DEFAULT.Port;
    this.RPCURL = config.RPCURL || GUI_CONFIG_DEFAULT.RPCURL;
    this.Language = config.Language || GUI_CONFIG_DEFAULT.Language;
    this.Network = config.Network || GUI_CONFIG_DEFAULT.Network;
    return this;
  },

  /**
   * save config file
   */
  saveConfig: function() {
    const json = JSON.stringify(this, null, 2);
    fs.writeFile(CONFIG_FILE_NAME, json, err => {
      if (err) {
        console.error(err);
      }
    });
  },


  /**
   * change current using language and save config
   */
  changeLang: function(lng) {
    this.Language = lng;
    this.saveConfig();
  },

  /**
   * change current using network and save config
   */
  changeNetwork: function(network) {
    this.Network = network;
    this.saveConfig();
  }
};

export default Config.initConfig();
