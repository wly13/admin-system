const path = require ('path');
const webpack = require ('webpack');
function resolve (dir) {
  return path.join (__dirname, dir);
}
const port = 8081;
module.exports = {
  publicPath: '/',
  // 输出目录
  outputDir: 'dist',
  //是否使用eslint检验
  lintOnSave: false,
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      '/api': {
        // target: "https://goods.footer.com/",
        target: 'http:localhost:8080',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/apis': '/api',
        // },
      },
    },
  },

  chainWebpack: config => {
    // alias 配置
    config.resolve.alias;
    config.resolve.alias.set ('@', resolve ('src')); //设置@为src路径
    //配置svg
    config.module.rules.delete ('svg');
    config.module.rule ('svg').exclude.add (resolve ('src/icons')).end ();
    config.module
      .rule ('svg-smart')
      .test (/\.svg$/)
      .include.add (resolve ('src/icons/svg'))
      .end ()
      .use ('svg-sprite-loader')
      .loader ('svg-sprite-loader')
      .options ({
        symbolId: '[name]',
      });
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin ({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      }),
    ],
  },
};
