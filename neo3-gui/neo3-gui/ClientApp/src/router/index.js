import React from "react";
import Sider from '../components/Sider';
import Home from '../layouts/home';
import chainLayouts from '../layouts/chain';
import walletLayouts from '../layouts/wallet';
import contractLayouts from '../layouts/contract';
import advancedLayouts from '../layouts/advanced';

const { Blocks, Block } = chainLayouts;
const { WalletList } = walletLayouts;
const { Search } = contractLayouts;
const { Tools } = advancedLayouts;

const routes = [
  {
    path: '/',
    exact: true,
    layout: <Home />
  },
  {
    path: '/chain/blocks',
    exact: true,
    sider: <Sider />,
    layout: <Blocks />
  },
  {
    path: '/chain/blocks/:height',
    sider: <Sider />,
    layout: <Block />
  },
  {
    path: '/wallet/walletList',
    exact: true,
    sider: <Sider />,
    layout: <WalletList />
  },
  {
    path: '/contract/search',
    exact: true,
    sider: <Sider />,
    layout: <Search />
  },
  {
    path: '/advanced/tools',
    exact: true,
    sider: <Sider />,
    layout: <Tools />
  }
];

export default routes;
