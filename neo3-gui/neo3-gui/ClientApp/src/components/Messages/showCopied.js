import _ from 'lodash';
import { message } from 'antd';
import i18n from '../../i18n';

const showCopiedMsg = (text, displayMsg) => {
  if (!_.get(navigator, 'clipboard.writeText')) {
    message.error('Failed to Copy.');
  } else {
    navigator.clipboard.writeText(text);
    message.success(displayMsg || i18n.t('common.copied'));
  }
};

export default showCopiedMsg;
