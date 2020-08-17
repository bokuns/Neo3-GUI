const GUI_URL_DEV = `http://localhost:10010`;
const GUI_URL_PROD = `http://localhost:10010`;
const GUI_URL = process.env.NODE_ENV === 'development' ? GUI_URL_DEV : GUI_URL_PROD;

const REQ_URL_DEV = `http://localhost:8081`;
const REQ_URL_PROD = `http://localhost:8081`;
const REQ_URL = process.env.NODE_ENV === 'development' ? REQ_URL_DEV : REQ_URL_PROD;

const GUI_CONFIG_DEFAULT = {
  Port: 8081,
  RPCURL: GUI_URL,
  Language: 'en',
  Network: 'testnet'
};

export default {
  BREAKPOINT_XS: 480,
  BREAKPOINT_MD: 768,
  DEFAULT_ERROR_CODE: 500,
  DEFAULT_ERROR_MSG: 'Something went wrong...',
  DEFAULT_HEADERS: { 'Content-Type': 'application/json' },
  GITHUB_URL: 'https://github.com/neo-ngd/Neo3-GUI/issues',
  GUI_CONFIG_DEFAULT: GUI_CONFIG_DEFAULT,
  GUI_URL: GUI_URL,
  JSON_ERROR_CODES: [20014],
  MODAL_WIDTH_LG: 650,
  MODAL_WIDTH_MD: 600,
  MODAL_WIDTH_SM: 400,
  NEO_URL: 'https://neo.org/',
  NEO3_ADDRESS_VERSION: '35',
  PAGE_LIMIT: 50,
  PREFIX_CHAR_COUNT: 8,
  REQ_URL: REQ_URL,
  SUFFIX_CHAR_COUNT: 8,
};
