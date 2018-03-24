// Bob Smith
// 3/19/2018
// XRP live price: $0.722 (https://coinmarketcap.com/currencies/ripple/)


//run with
//./node_modules/.bin/babel-node index.js

'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;
//Kraken exchange wallet, has many incoming transactions, good for demo
const myAddress = 'rLHzPsX6oXkzU2qL12kHCH8G8cnZv1rBJh';
const transactionCount = 3;
const api = new RippleAPI({
  server: 'wss://s2.ripple.com' // Public ripple server
});
var recievedTxns= [];
const startRunTimes=50;
var runTimes=startRunTimes;
var timer = setInterval(function(){
  if(runTimes>0){
    rippleUpdate()
  }
  else{
    clearInterval(timer);
  }}, 7000);


function rippleUpdate()
{
  if(runTimes===startRunTimes){
    console.log("TRANSACTION HISTORY LAST ",transactionCount);
  }
  
  api.connect().then(() => {
    if(runTimes===startRunTimes){  
      console.log("Server info: ",api.getServerInfo());
      console.log('getting account info for', myAddress);
    }
    return api.getAccountInfo(myAddress);
  }).then(info => {
    if(runTimes===startRunTimes){
      console.log(info);
      console.log("-----------------------------------------------------------------------------------------");
    }
    return api.getTransactions(myAddress, {limit: transactionCount})
  }).then(transactionHistory => {
    let newTxn = false;
    for(var tx in transactionHistory){
      let currTx = transactionHistory[tx];
      if(currTx.outcome && currTx.outcome.result  && currTx.outcome.result === 'tesSUCCESS'){
        //Only check for incoming transactions where XRP is incoming to myAddress
        if(currTx.outcome.deliveredAmount && currTx.outcome.fee && currTx.specification.destination.address === myAddress)
        {
          if(!recievedTxns.includes(currTx.outcome.timestamp+currTx.specification.source.address))
          {
            newTxn=true;
            recievedTxns.push(currTx.outcome.timestamp+currTx.specification.source.address);
            console.log("FROM:  ",currTx.specification.source.address);
            console.log("WHEN:  ",currTx.outcome.timestamp);         
            console.log("AMOUNT: Ʀ",currTx.outcome.deliveredAmount.value); 
            console.log("FEE:   ",currTx.outcome.fee)       
            console.log("-----------------------------------------------------------------------------------------");
          }          
        }
      }
    }
    runTimes = runTimes-1;
    if(!newTxn){
      console.log("NO NEW INCOMING TRANSACTIONS")
      console.log("-----------------------------------------------------------------------------------------");                
    }
    if(runTimes<=0){
      return api.disconnect();
    }
    else{
      return;
    }
  }).then(() => {
    if(runTimes<=0){
      console.log('done and disconnected.');
    }
    else{
      console.log("Still running: ",runTimes," refreshes left");
    }
  }).catch(console.error);
}
//hellooooo crypto