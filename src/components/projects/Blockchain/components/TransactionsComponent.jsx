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
              <p>{transaction.sender}</p>
              <p>{transaction.receiver}</p>
              <p>{transaction.amount}</p>
            </Card.Content>
            <Divider />
          </Card>))}
      </CardGroup>
    );
  }
}

Transaction.propTypes = {
  transaction: propTypes.instanceOf(Transaction),
};
