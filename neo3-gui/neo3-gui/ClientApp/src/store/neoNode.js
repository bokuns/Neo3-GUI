import { observable, action } from 'mobx';
import neoNode from './neoNode';

const neoNodeStore = {
  nodeManager: observable.box(neoNode),
  start: action(function(network, port) {
    this.nodeManager.start(network, port);
  }),

  kill: action(function() {
    if (!this.nodeManager) return;
    this.nodeManager.kill();
  })
};

export default neoNodeStore;
