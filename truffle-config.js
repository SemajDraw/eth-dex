module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: 5777,
    },
  },
  contracts_directory: './src/contracts/',
  test_file_extension_regexp: /.*\.test.ts$/,
  compilers: {
    solc: {
      version: '0.8.14',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
      evmVersion: 'petersburg',
    },
  },
};
