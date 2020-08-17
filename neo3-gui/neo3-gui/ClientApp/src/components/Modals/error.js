import React from 'react';
import _ from 'lodash';
import { Modal, Button } from 'antd';
import showCopiedMsg from '../../components/Messages/showCopied';
import './error.css';
import constants from '../../configs/constants';
import { Trans } from 'react-i18next';
import i18n from '../../i18n';

const { JSON_ERROR_CODES, MODAL_WIDTH_LG, MODAL_WIDTH_MD } = constants;

const showErrorModal = ({ error, title }) => {
  const statusCode = _.get(error, 'code');
  if (JSON_ERROR_CODES.includes(statusCode)) {
    title = i18n.t('wallet.transfer send error json');
    const content = (
      <div className="show-pri">
        <pre className="modal-pre">
          <code>{ JSON.stringify(JSON.parse(error.message), null, 2) }</code>
        </pre>
        <p>
          <Button type="link" style={{ margin: 0, color: '#00B594' }}
            onClick={() => showCopiedMsg(error.message)}><Trans>button.copy to clipboard</Trans></Button>
        </p>
    </div>
    );
    Modal.warning({
      title: title,
      width: MODAL_WIDTH_LG,
      centered: true,
      content: content,
      okText: i18n.t('button.confirm')
    });
  } else {
    const content = !statusCode || statusCode < 600 ? (
      <div className="show-pri">
        <p>{ i18n.t('error msg') }</p>
        <p>{statusCode ? `${ statusCode }: ` : ''}{ error.message }</p>
      </div>
    ) : (
      <div className="show-pri">
        <p>{ i18n.t('error code') }: { statusCode }</p>
        <p>{ i18n.t('error msg') }: { error.message }</p>
      </div>
    );
    Modal.error({
      title: title,
      width: MODAL_WIDTH_MD,
      centered: true,
      content: content,
      okText: i18n.t('button.confirm')
    });
  }
};

export default showErrorModal;
