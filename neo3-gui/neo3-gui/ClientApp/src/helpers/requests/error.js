import _ from 'lodash';
import constants from '../../configs/constants';

const { DEFAULT_ERROR_CODE, DEFAULT_ERROR_MSG } = constants;

const generateError = (data) => {
  const error = new Error(_.get(data, 'error.message', DEFAULT_ERROR_MSG));
  error.code = _.get(data, 'error.code', DEFAULT_ERROR_CODE);
  return error;
};

export default generateError;
