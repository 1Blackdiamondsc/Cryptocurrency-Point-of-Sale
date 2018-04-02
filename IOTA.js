'use strict';
const IOTA = require('iota.lib.js');

var iota = new IOTA({
    'provider': 'http://iotanode.host:14265'
});

//sample address: TAQWMPGBTRMSMX9BBKITOWNXFTFPTPVXYBYDVLUSCRMRWJPJLOOFXUDQVMUGJYMTRTCY9TKLXKBMBOXG9DYMQADCU9

var myAddress = 'TAQWMPGBTRMSMX9BBKITOWNXFTFPTPVXYBYDVLUSCRMRWJPJLOOFXUDQVMUGJYMTRTCY9TKLXKBMBOXG9DYMQADCU9'
var searchValues = {
    'addresses' : [myAddress]
}

iota.api.findTransactionObjects(searchValues, function(a,b,c){
    console.log("\n--------------------------------------------------------------------------------------")
    console.log("Most recent IOTA transaction for address: ",myAddress);
    console.log("--------------------------------------------------------------------------------------\n")
    console.log("From:  ",b[0].address.substring(0,10),"...\nValue: ",b[0].value/1000000, "Mi")
});