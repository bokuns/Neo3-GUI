const blockSyncStore = {
  syncHeight: -1,
  headerHeight: -1,
  setHeight: function(data) {
    this.syncHeight = data.syncHeight;
    this.headerHeight = data.headerHeight;
  }
};

export default blockSyncStore;
