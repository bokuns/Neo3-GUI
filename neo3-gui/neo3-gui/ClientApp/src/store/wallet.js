const walletStore = {
  isOpen: false,
  accountList: [],
  unclaimedGas: '',
  logout: function() {
    this.isOpen = false;
    this.accountList = [];
  },
  setWalletState: function(value) {
    this.isOpen = value;
  },
  setAccounts: function(accounts) {
    this.accountList = [
      ...accounts
    ];
  },
  addAccounts: function(accounts) {
    if (!Array.isArray(accounts)) accounts = [accounts];
    this.accountList = [
      ...this.accountList,
      ...accounts
    ];
  },
  setUnclaimedGas: function(gas) {
    this.unclaimedGas = gas;
  }
};

export default walletStore;
