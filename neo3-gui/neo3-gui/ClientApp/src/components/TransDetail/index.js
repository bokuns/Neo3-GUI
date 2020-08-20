import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Shrinkable } from '../../helpers/shrinkText';

const TransDetail = () => {
  const { txId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!txId) {
      history.goBack();
    }
  }, []);

  return (
    <div id="TransDetail">
      This is TransDetail: <Shrinkable text={txId} />
    </div>
  )
};

TransDetail.displayName = 'TransDetail';
export default TransDetail;
