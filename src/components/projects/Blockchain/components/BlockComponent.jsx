import React, { Component } from 'react';
import { Card, Button, Modal } from 'semantic-ui-react';
import propTypes from 'prop-types';
import Block from '../Block';
import TransactionComponent from './TransactionsComponent';

export default class BlockComponent extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.block = this.props.block;
    this.state = {
    };
    this.style = {
      textAlign: 'left',
    };
  }

  render() {
    const ViewBlock = () => (
      <Modal trigger={<Button>View</Button>}>
        <Modal.Header>Block ID: {(this.block.id === 0) ? 'Genesis' : this.block.id}</Modal.Header>
        <Modal.Content>
          <Modal.Header>Hash: {this.block.hash}</Modal.Header>
          <Modal.Header>Previous Hash: {this.block.previousHash}</Modal.Header>
          <Modal.Description>
            <TransactionComponent transactions={this.block.data} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
    return (
      <Card style={this.style}>
        <Card.Content>
          <Card.Meta>Block ID: {(this.block.id === 0) ? 'Genesis' : this.block.id}</Card.Meta>
          <Card.Description>Hash: {`${this.block.hash.substring(0, 20)}...`}</Card.Description>
          <Card.Description>Date: {this.block.timestamp.toUTCString()}</Card.Description>
          <Card.Description>Transaction Count: {this.block.data.length}</Card.Description>
          <br />
          <ViewBlock />
          <Button>Change</Button>
        </Card.Content>
      </Card>
    );
  }
}

BlockComponent.propTypes = {
  block: propTypes.instanceOf(Block),
};

BlockComponent.defaultProps = {
  block: new Block(),
};
