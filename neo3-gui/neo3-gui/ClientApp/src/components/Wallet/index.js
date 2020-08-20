/* eslint-disable */
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import '../../static/css/menu.css';
import '../../static/css/wallet.css';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Button, Divider } from 'antd';
import { Walletopen, Walletcreate, Walletprivate, Walletencrypted } from './walletaction';
import Sync from '../sync';
import { withTranslation } from "react-i18next";
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const Wallet = (pros) => {
  const { t } = useTranslation(['wallet']);
  const [ size, setSize ] = useState('default');
  const [ iconLoading, setIconLoading ] = useState(false);
  const [ showElem, setShowElem ] = useState(true);
  const [ children, setChildren ] = useState('');
  const [ path, setPath ] = useState('');
  const [ login, setLogin ] = useState(false);

  const changeTab = () => {
    setShowElem(!showElem);
  }
  getInset = (elem) => {
    return () =>{
      this.setState({showElem: false})
      switch(ele){
        case 0: this.setState({children: <Walletopen />});break;
        case 1: this.setState({children: <Walletcreate />});break;
        case 2: this.setState({children: <Walletprivate />});break;
        case 3: this.setState({children: <Walletencrypted />});break;
        case 4: this.setState({children: <Walletopen />});break;
        default: this.setState({showElem: true});break;
      }
    }
  }

  return (
    <div className="wa-content mt2">
      <div className="wa-link">
        {/* 设置一个显示值及返回路径 */}
        {!showElem?(
          <a className="back" onClick={() => getInset(-1)} key="1"><ArrowLeftOutlined /></a>
        ) : null}
        <Link className="close" to="/"><CloseOutlined /></Link>
      </div>
      <div className="logo mt2 mb1"></div>
      <div className="wa-open">
        {showElem ? (
          <div>
            <Button type="primary" onClick={() => getInset(0)}>{t("wallet.open wallet file")}</Button>
            <Button className="mt3 mb2" type="primary" onClick={() => getInset(1)}>{t("wallet.create wallet file")}</Button>

            <Divider className="t-light">{t("wallet.import wallet")}</Divider>
            <Row justify="space-between">
              <Col span={6}><Button  size="small" onClick={() => getInset(2)}>{t("wallet.private key")}</Button></Col>
              <Col span={6} offset={3}><Button size="small" onClick={() => getInset(3)}>{t("wallet.Nep2 key")}</Button></Col>
              <Col span={6} offset={3}><Button size="small" disabled>{t("wallet.mnemonic")}</Button></Col>
            </Row>
          </div>
        ):null}
        {!showElem?(
          <div>{children}</div>
        ):null}
      </div>
    </div>
  );
}

export default Wallet;
