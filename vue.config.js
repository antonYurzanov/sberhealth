module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/test.php': {
          target: 'http://vizanikurtki.ru',
          secure: false,
          changeOrigin: true
        }
      }
    }
  }
};
