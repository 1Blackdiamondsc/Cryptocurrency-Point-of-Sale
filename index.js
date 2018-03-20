// Bob Smith
// 3/19/2018
// XRP live price: $0.722 (https://coinmarketcap.com/currencies/ripple/)


//run with
//./node_modules/.bin/babel-node index.js

'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;
const myAddress = '';
const transactionCount = 100;
const api = new RippleAPI({
  server: 'wss://s2.ripple.com' // Public ripple server
});

api.connect().then(() => {
  console.log("Server info: ",api.getServerInfo());
  console.log('getting account info for', myAddress);
  return api.getAccountInfo(myAddress);
}).then(info => {
  console.log(info);
  console.log("-----------------------------------------------------------------------------------------");
  return api.getTransactions(myAddress, {limit: transactionCount})
}).then(transactionHistory => {
  console.log("TRANSACTION HISTORY LAST ",transactionCount);
  for(var tx in transactionHistory){
    let currTx = transactionHistory[tx];
    if(currTx.outcome && currTx.outcome.result  && currTx.outcome.result === 'tesSUCCESS'){
      if(currTx.outcome.deliveredAmount && currTx.outcome.fee)
      {
        console.log("FROM:  ",currTx.specification.source.address);
        console.log("TO:    ",currTx.specification.destination.address);
        console.log("WHEN:  ",currTx.outcome.timestamp);         
        console.log("AMOUNT: Ʀ",currTx.outcome.deliveredAmount.value); 
        console.log("FEE:   ",currTx.outcome.fee)       
        console.log("-----------------------------------------------------------------------------------------");
      }
    }
  }
  return api.disconnect();
}).then(() => {
  console.log('done and disconnected.');
}).catch(console.error);

//hellooooo crypto