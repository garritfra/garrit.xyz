import React, { Component } from 'react';
import { Card, Button, Modal, Image, Header } from 'semantic-ui-react';
import propTypes from 'prop-types';
import Block from '../Block';

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
    const ViewButton = () => (
      <Modal trigger={<Button>View</Button>}>
        <Modal.Header>Block ID: {(this.block.id === 0) ? 'Genesis' : this.block.id}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
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
          <ViewButton />
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
