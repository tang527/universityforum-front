module.exports = {
  publicPath: "/",
  devServer: {
    proxy: {
      "/api": {
        // target: "http://localhost:9090",
        target: "http://1.15.243.160:9090",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};

// module.exports = {
//     publicPath: "/",
//     assetsDir: ''
//   };
