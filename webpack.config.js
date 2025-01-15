module.exports = {
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader', // Use the node-loader for .node files
      });
  
      return config;
    },
  };
  