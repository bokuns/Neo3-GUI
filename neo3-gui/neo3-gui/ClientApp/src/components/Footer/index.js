import React from 'react';
import './index.css';
import { Layout } from 'antd';
const { Footer } = Layout;

const MyFooter = () => {
  return (
    <div id="Footer">
      <Footer>
        This is Footer.
      </Footer>
    </div>
  );
};

MyFooter.displayName = 'Footer';
export default MyFooter;
