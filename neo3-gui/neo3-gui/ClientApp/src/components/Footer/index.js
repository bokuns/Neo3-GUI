import React from 'react';
import './index.css';
import { Layout } from 'antd';
const { Footer } = Layout;

const MyFooter = () => {
  return (
    <div id="Footer">
      <Footer className="mt1">Copyright © Neo Team 2014-2020</Footer>
    </div>
  );
};

MyFooter.displayName = 'Footer';
export default MyFooter;
