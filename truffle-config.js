module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 5000,
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8.13",
    },
  },
};
