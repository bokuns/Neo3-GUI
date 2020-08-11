import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import './index.css';
import img from '../../assets/images/logo.svg';
import blockimg from '../../assets/images/1.svg';
import aniblockimg from '../../assets/images/1-ani.svg';
import walletimg from '../../assets/images/2.svg';
import aniwalletimg from '../../assets/images/2-ani.svg';
import contractimg from '../../assets/images/3.svg';
import anicontractimg from '../../assets/images/3-ani.svg';
import adavancedimg from '../../assets/images/4.svg';
import aniadavancedimg from '../../assets/images/4-ani.svg';

const Home = () => {
  const { t } = useTranslation(['home']);

  return (
    <div id="Home" className="home-content">
      <div className="pv1 text-c">
        <img src={img} className="app-logo" alt="img" />
      </div>
      <div className="home-icon">
        <Row gutter={60}>
        <Col span={6}>
          <Link to='/chain/blocks'>
            <div className="home-link">
              <img className="show-img" src={blockimg} alt="img" />
              <img className="hidden-img" src={aniblockimg} alt="img" />
              <span>{t('home:blockchain')}</span>
            </div>
          </Link>
        </Col>
        <Col span={6}>
          <Link to='/wallet/walletlist'>
            <div className="home-link">
              <img className="show-img" src={walletimg} alt="img" />
              <img className="hidden-img" src={aniwalletimg} alt="img" />
              <span>{t("home:wallet")}</span>
            </div>
          </Link>
        </Col>
        <Col span={6}>
          <Link to='/contract'>
            <div className="home-link">
              <img className="show-img" src={contractimg} alt="img" />
              <img className="hidden-img" src={anicontractimg} alt="img" />
              <span>{t("home:contract")}</span>
            </div>
          </Link>
        </Col>
        <Col span={6}>
          <Link to='/advanced'>
            <div className="home-link">
              <img className="show-img" src={adavancedimg} alt="img" />
              <img className="hidden-img" src={aniadavancedimg} alt="img" />
              <span>{t("home:advanced")}</span>
            </div>
          </Link>
        </Col>
      </Row>
      </div>
    </div>
  );
};

Home.displayName = 'Home';
export default Home;
