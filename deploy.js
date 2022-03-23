const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

//setting up HDWallet Provider
//requires two argument 1.account menumonic  2.url for connection

const provider = new HDWalletProvider(
    'brass pool wrestle swallow clinic neglect volcano draw tennis seed side salute',
    'https://rinkeby.infura.io/v3/789238c5cc2b44ac8e418fbd7a1e11e6',
);

const web3 = new Web3(provider);

//so we will use a function to deploy a contract 
//as we can use async and await with it

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("attempting to login to account ", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ["Hi There"] } )
    .send({gas: 1000000, from: accounts[0]});

    console.log("Contract address ", result.options.address);

    //to prevent a hanging deployment
    provider.engine.stop();

};

deploy();