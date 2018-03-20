// Bob Smith
// 3/19/2018
// XRP live price: $0.722 (https://coinmarketcap.com/currencies/ripple/)


//run with
//./node_modules/.bin/babel-node index.js

'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'wss://s1.ripple.com' // Public ripple server
});
api.connect().then(() => {
  console.log("connected to a ripple server");
  console.log("Server info: ",api.getServerInfo());
  const myAddress = '';
  console.log('getting account info for', myAddress);
  return api.getAccountInfo(myAddress);

}).then(info => {
  console.log(info);
  console.log('getAccountInfo finished');
}).then(() => {
  return api.disconnect();
}).then(() => {
  console.log('done and disconnected.');
}).catch(console.error);

//hellooooo crypto