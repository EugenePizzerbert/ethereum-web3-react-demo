import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider); // requires MetaMask in browser

export default web3;