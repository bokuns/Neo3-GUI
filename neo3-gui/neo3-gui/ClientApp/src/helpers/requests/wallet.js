import axios from 'axios';
import _ from 'lodash';
import constants from '../../configs/constants';
import generateError from './error';

const { REQ_URL } = constants;

export const closeWallet = () => {
  const url = `${REQ_URL}`;
  const options = {
    id: new Date().getTime().toString(),
    method: 'CloseWallet',
  };
  return axios.post(url, options).then(() => {
    return;
  }).catch(err => {
    throw generateError(err);
  });
};


