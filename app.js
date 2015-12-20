/**
 * EXPANSE BLOCKNOTIFY
 * Created by Christopher Franko on 12/18/2015.
 * This nodejs app mimics bitcoins blocknotify, for expanse.
 */

//load modules
var requestify = require('requestify');
var Web3 = require('web3');
var web3 = new Web3();


var apiurl = 'http://yourcallbackurl';

//set expanse node
web3.setProvider(new web3.providers.HttpProvider('http://localhost:9656'));

var coinbase = web3.eth.coinbase;
console.log("coinbase: " + coinbase);

var balance = web3.eth.getBalance(coinbase);
console.log("balance: " + balance.toString(10));

var eth = web3.eth;

web3.eth.filter('latest').watch(function(error, block) {
    if(error) {
        console.log("watch err:", error);
        return;
    }

    //send the block to the exp.life api
    //TODO: make this dynamic based on if its expanse or ethereum
    requestify.get( apiurl + block).then(function(response) {
        // Get the response body (JSON parsed - JSON response or jQuery object in case of XML response)
        response.getBody();
    });

});

