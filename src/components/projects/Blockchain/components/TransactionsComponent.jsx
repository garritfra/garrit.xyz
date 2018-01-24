import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';
import ItemGroup from 'semantic-ui-react/dist/commonjs/views/Item/ItemGroup';

export default class TransactionsComponent extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.transactions = this.props.transactions;
  }

  render() {
    return (
      <ItemGroup>
        {this.transactions.map(transaction => (
          <Item>
            <Item.Content verticalAlign="middle">
              <p>{transaction.sender}</p>
              <p>{transaction.receiver}</p>
              <p>{transaction.amount}</p>
            </Item.Content>
            <Divider />
          </Item>))}
      </ItemGroup>
    );
  }
}
