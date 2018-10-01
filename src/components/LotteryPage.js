import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import lottery from '../ethereum/lottery';

class LotteryPage extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    valueInEther: '',
    message: '',
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const { valueInEther } = this.state;
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting for transaction to complete...', valueInEther: '' });
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(valueInEther, 'ether'),
      });
      this.setState({ message: 'Transaction completed, you entered the contract' });
      this.loadContractData();
    } catch (e) {
      console.log(e);
      this.setState({ message: 'Transaction aborted' });
    }
  };

  onPickWinnerClick = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Picking a winner...' });
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });
      this.setState({ message: 'Winner picked' });
      this.loadContractData();
    } catch (e) {
      console.log(e);
      this.setState({ message: 'Failed to pick a winner' });
    }
  };

  loadContractData = async () => {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  };

  componentDidMount() {
    this.loadContractData();
  }

  render() {
    const { manager, players, balance, valueInEther, message } = this.state;
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {manager}.
          There are currently {players.length} people entered
          competing to win ${web3.utils.fromWei(balance, 'ether')} ether.
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={valueInEther}
              onChange={event => this.setState({ valueInEther: event.target.value })}
            />
          </div>
          <button type='submit'>Enter</button>
        </form>
        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onPickWinnerClick}>Pick winner</button>
        <hr />
        <h4>App status:</h4>
        <p>{message}</p>
      </div>
    );
  }
}

export default LotteryPage;
