import axios from 'axios';
import _ from 'lodash';
import constants from '../../configs/constants';
import generateError from './error';

const { REQ_URL, DEFAULT_HEADERS, PAGE_LIMIT } = constants;

export const getBlocks = ({ limit, height }) => {
  const url = `${REQ_URL}`;
  const params = {
    limit: isNaN(limit) ? PAGE_LIMIT : limit,
  };
  if (!isNaN(height) && height >= 0) {
    params.height = height;
  }

  const data = {
    id: new Date().getTime().toString(),
    method: 'GetLastBlocks',
    params: params
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

