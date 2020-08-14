import _ from 'lodash';

class NeoWebSocket {
  constructor() {
    this.processMethods = {}
    this.lock = false
    this.ws = null;
  }

  log() {
    console.log("NeoWebSocket=>", ...arguments)
  }

  /**
   * Only need call once over the entire app life
   */
  initWebSocket = function() {
    this.ws = this.createWebSocket();
  };

  createWebSocket() {
    this.log("creating new webscoket");
    this.ws = new WebSocket('ws://127.0.0.1:8081');
    const _this = this;

    this.ws.onopen = () => {
      _this.log('[opened]');
    };

    this.ws.onclose = (e) => {
      _this.log("[closed]", e);
      _this.reconnectWebSocket();
    }

    this.ws.onerror = (e) => {
      _this.log("[error]", e);
    }

    this.ws.onmessage = this.processMessage;
    return this.ws;
  }

  reconnectWebSocket() {
    if (this.lock) {
      return;
    }
    const _this = this;
    _this.lock = true;
    setTimeout(() => {
      _this.initWebSocket();
      _this.lock = false;
    }, 5000);
  }

  /**
   * distribute websocket message to regitered process methods
   */
  processMessage = (message) => {
    if (!message) return;

    const msg = JSON.parse(_.get(message, 'data'));
    const methods = this.processMethods[_.get(msg, 'method')];
    if (!Array.isArray(methods)) return;

    methods.forEach(method => {
      try {
        method(msg);
      } catch (error) {
        this.log(error);
      }
    });
  }

  /**
   * regiter new process method
   * @param {*} method message method name
   * @param {*} func process method
   */
  registMethod(method, func) {
    let methods = this.processMethods[method];
    if (!(methods && methods.length)) {
      methods = [];
    }
    methods.push(func);
    this.processMethods[method] = methods;
  }


  /**
   * unregiter process method
   * @param {*} method
   * @param {*} func
   */
  unregistMethod(method, func) {
    let methods = this.processMethods[method];
    if (methods && methods.length) {
      let i = 0;
      while (i < methods.length) {
        if (methods[i] === func) {
          methods.splice(i, 1);
        } else {
          ++i;
        }
      }
      this.processMethods[method] = methods;
    }
  }
}

const instance = new NeoWebSocket();
export default instance;
