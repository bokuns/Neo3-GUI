import Config from '../configs';

const globalStore = {
  mainnet: Config.RPCURL,
  testnet: '',

  onHomePage: true,
  setOnHomePage: function(value) {
    this.onHomePage = value;
  },

  showErrorModal: false,
  setShowErrorModal: function(value) {
    this.showErrorModal = value;
  },

  errorModal: {
    title: '',
    content: ''
  },
  setErrorModal: function(data) {
    this.errorModal = {
      ...data
    }
  }
};

export default globalStore;
