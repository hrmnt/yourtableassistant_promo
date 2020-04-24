module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          storybook: './storybook',
          test: './test',
          shared: '../shared/src',
        },
      },
    ],
  ],
};
