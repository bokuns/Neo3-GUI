const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
      configure: {
          target: 'electron-renderer'
      }
  },
  plugins:[
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars:{
              '@primary-color': '#00AF92'
            },
            javascriptEnabled: true,
          }
        }
      }
    }
  ]
};
