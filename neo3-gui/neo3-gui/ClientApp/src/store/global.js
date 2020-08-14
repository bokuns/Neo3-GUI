import Config from '../configs';
import neoNode from '../neoNode';

const globalStore = {
  mainnet: Config.RPCURL,
  testnet: '',

  onHomePage: true,
  setOnHomePage: function(value) {
    this.onHomePage = value;
  },

  network: Config.Network,
  setNetwork: function(value) {
    Config.changeNetwork(value);
    console.log('switchNode:', value);
    neoNode.switchNode(value);
    this.network = value;
  }
};

export default globalStore;
