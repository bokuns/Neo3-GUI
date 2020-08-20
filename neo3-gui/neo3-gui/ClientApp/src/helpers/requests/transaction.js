import axios from 'axios';
import _ from 'lodash';
import constants from '../../configs/constants';
import generateError from './error';

const { REQ_URL, DEFAULT_HEADERS, TRANS_LiMIT } = constants;

export const getTransactions = (pageIndex, transLimit) => {
  pageIndex = (isNaN(pageIndex) || pageIndex < 1) ? 1 : pageIndex;
  transLimit = (isNaN(transLimit) || transLimit < 1) ? TRANS_LiMIT : transLimit;

  const data = {
    id: new Date().getTime().toString(),
    method: 'QueryTransactions',
    params: {
      pageIndex: pageIndex,
      limit: transLimit
    }
  };
  const options = {
    headers: DEFAULT_HEADERS
  };

  return axios.post(REQ_URL, data, options).then(res => {
    const data = _.get(res, 'data', null);
    if (!data) throw generateError();

    const { msgType } = data;
    if (msgType === -1) {
      throw generateError(data);
    }
    return _.get(data, 'result', null);
  });
};

export const getUntransactions = (pageIndex, transLimit) => {
  pageIndex = (isNaN(pageIndex) || pageIndex < 1) ? 1 : pageIndex;
  transLimit = (isNaN(transLimit) || transLimit < 1) ? TRANS_LiMIT : transLimit;

  const data = {
    id: new Date().getTime().toString(),
    method: 'GetUnconfirmTransactions',
    params: {
      pageIndex: pageIndex,
      limit: transLimit
    }
  };
  const options = {
    headers: DEFAULT_HEADERS
  };

  return axios.post(REQ_URL, data, options).then(res => {
    const data = _.get(res, 'data', null);
    if (!data) throw generateError();

    const { msgType } = data;
    if (msgType === -1) {
      throw generateError(data);
    }
    return _.get(data, 'result', null);
  });
};

export const getTransactionsByBlockHeight = (blockHeight, pageIndex, pageSize) => {
  if (isNaN(blockHeight) || blockHeight < 0) throw generateError();
  pageIndex = (isNaN(pageIndex) || pageIndex < 1) ? 1 : pageIndex;
  pageSize = (isNaN(pageSize) || pageSize < 0) ? TRANS_LiMIT : pageSize;

  const data = {
    id: new Date().getTime().toString(),
    method: 'QueryTransactions',
    params: {
      blockHeight: blockHeight,
      pageIndex: pageIndex,
      limit: pageSize
    }
  };
  const options = {
    headers: DEFAULT_HEADERS
  };

  return axios.post(REQ_URL, data, options).then(res => {
    const data = _.get(res, 'data', null);
    if (!data) throw generateError();

    const { msgType } = data;
    if (msgType === -1) {
      throw generateError(data);
    }

    return _.get(data, 'result', null);
  });
};
