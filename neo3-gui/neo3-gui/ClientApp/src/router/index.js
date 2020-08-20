import React from "react";
import Sider from '../components/Sider';
import Home from '../layouts/home';
import chainLayouts from '../layouts/chain';
import walletLayouts from '../layouts/wallet';
import contractLayouts from '../layouts/contract';
import advancedLayouts from '../layouts/advanced';
import TransDetail from '../components/TransDetail';

const { Blocks, Block, ChainTransactions } = chainLayouts;
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
    path: '/chain/blocks/:height/:txId',
    sider: <Sider />,
    layout: <TransDetail />
  },
  {
    path: '/chain/blocks/:height',
    sider: <Sider />,
    layout: <Block />
  },
  {
    path: '/chain/blocks',
    exact: true,
    sider: <Sider />,
    layout: <Blocks />
  },
  {
    path: '/chain/transactions/:txId',
    sider: <Sider />,
    layout: <TransDetail />
  },
  {
    path: '/chain/transactions',
    exact: true,
    sider: <Sider />,
    layout: <ChainTransactions />
  },
  {
    path: '/chain/assets',
    exact: true,
    sider: <Sider />,
    layout: <></>
  },
  {
    path: '/wallet/accounts',
    exact: true,
    sider: <Sider />,
    layout: <WalletList />
  },
  {
    path: '/wallet/transactions',
    exact: true,
    sider: <Sider />,
    layout: <></>
  },
  {
    path: '/wallet/transfer',
    exact: true,
    sider: <Sider />,
    layout: <></>
  },
  {
    path: '/contract/search',
    exact: true,
    sider: <Sider />,
    layout: <Search />
  },
  {
    path: '/contract/deploy',
    exact: true,
    sider: <Sider />,
    layout: <></>
  },
  {
    path: '/contract/invoke',
    exact: true,
    sider: <Sider />,
    layout: <></>
  },
  {
    path: '/advanced/tools',
    exact: true,
    sider: <Sider />,
    layout: <Tools />
  },
  {
    path: '/advanced/candidate',
    exact: true,
    sider: <Sider />,
    layout: <></>
  },
  {
    path: '/advanced/vote',
    exact: true,
    sider: <Sider />,
    layout: <></>
  },
  {
    path: '/advanced/sign',
    exact: true,
    sider: <Sider />,
    layout: <></>
  }
];

export default routes;
