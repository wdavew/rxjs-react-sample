module.exports = {
  entry: './src/main.js',
  output: { path: __dirname + '/build', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['react-hot', 'babel-loader?presets[]=es2015,presets[]=react'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  devServer: {
    proxy: {
       "/ListOfNumbers" : "http://localhost:3000",
       "/ListOfLetters" : "http://localhost:3000" 
    }
  }
};
