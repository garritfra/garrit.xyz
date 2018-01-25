import React, { Component } from 'react';
import { CardGroup, Card } from 'semantic-ui-react';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';
import propTypes from 'prop-types';
import Transaction from '../Transaction';

export default class TransactionsComponent extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.transactions = this.props.transactions;
  }

  render() {
    return (
      <CardGroup>
        {this.transactions.map(transaction => (
          <Card>
            <Card.Content className="container" verticalAlign="middle">
              <p>Sender: {transaction.sender}</p>
              <p>Receiver: {transaction.receiver}</p>
              <p>Amount: {transaction.amount} coins</p>
            </Card.Content>
          </Card>))}
      </CardGroup>
    );
  }
}

Transaction.propTypes = {
  transaction: propTypes.instanceOf(Transaction),
};
