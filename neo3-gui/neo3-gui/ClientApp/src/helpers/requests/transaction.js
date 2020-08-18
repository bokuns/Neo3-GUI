import axios from 'axios';
import _ from 'lodash';
import constants from '../../configs/constants';
import generateError from './error';

const { REQ_URL, DEFAULT_HEADERS, TRANS_LiMIT } = constants;

export const getTransactionsByBlockHeight = (blockHeight, transLimit) => {
  if (isNaN(blockHeight) || blockHeight < 0) throw generateError();
  transLimit = isNaN(transLimit) || transLimit < 1 ? TRANS_LiMIT : transLimit;

  const url = `${REQ_URL}`;
  const data = {
    id: new Date().getTime().toString(),
    method: 'QueryTransactions',
    params: {
      index: blockHeight,
      limit: transLimit
    }
  };
  const options = {
    headers: DEFAULT_HEADERS
  };

  return axios.post(url, data, options).then(res => {
    const data = _.get(res, 'data', null);
    if (!data) throw generateError();

    const { msgType } = data;
    if (msgType === -1) {
      throw generateError(data);
    }

    return _.get(data, 'result', null);
  });
};
