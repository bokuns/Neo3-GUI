/* eslint-disable */ 
import React from 'react';
import 'antd/dist/antd.css';
import '../../static/css/menu.css'
import '../../static/css/wallet.css'
import {Link} from 'react-router-dom';
import {  Layout,Row, Col ,message, Button,Tabs,Divider } from 'antd';
import axios from 'axios';
import Walletopen from './open'
import Walletcreate from './create'
import Walletprivate from './private'
import Sync from '../sync';

import {
  ArrowLeftOutlined,
  CloseOutlined
} from '@ant-design/icons';


const { TabPane } = Tabs;
const { Footer } = Layout;


class Wallet extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        size: 'default',
        iconLoading:false,
        path:'',
        login:false
    };
  }
  changeTab(e){
    this.setState(prevState => ({
      showElem: !prevState.showElem
    }));
  }
  render = () =>{
    const { size } = this.state;
    const props = this.props;

    return (
      <Layout className="wa-container">
        <Sync />
        <div className="wa-content mt1">
          <div className="wa-link">
            {/* 设置一个显示值及返回路径 */}
            <a className="back" href="/home"><ArrowLeftOutlined /></a>
            <a className="close" href="/home"><CloseOutlined /></a>
          </div>
          <div className="logo mt5"></div>
          <div className="wa-open mt1">
            <Button type="primary">打开钱包文件</Button>
            <Button className="mt3 mb2" type="primary">创建钱包文件</Button>
            
            <Divider className="t-light">导入钱包</Divider>
            <Row justify="space-between">
              <Col span={6}><Button  size="small">私钥</Button></Col>
              <Col span={6} offset={3}><Button size="small" disabled>加密私钥</Button></Col>
              <Col span={6} offset={3}><Button size="small" disabled>助记词</Button></Col>
            </Row>
          </div>
        </div>
        <Footer className="mt1">Copyright © Neo Team 2014-2019</Footer>
          
        <Link to='/wallet/walletlist'>去钱包打开页面</Link><br />

        <div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="打开钱包" key="1">
              <Walletopen />
            </TabPane>
            <TabPane tab="创建钱包" key="2">
              <Walletcreate />
            </TabPane>
            <TabPane tab="私钥导入" key="3">
              <Walletprivate />
            </TabPane>
            <TabPane tab="加密私钥导入" disabled key="4">
              <Walletcreate />
            </TabPane>
            <TabPane tab="助记词导入" disabled key="5">
              <Walletcreate />
            </TabPane>
          </Tabs>

          <div>
            {this.state.showElem?(
              <div>显示</div>
            ):null}
            {!this.state.showElem?(
              <div>隐藏</div>
            ):null}
          </div>
        </div>

      </Layout>
    );
  }
} 

export default Wallet;