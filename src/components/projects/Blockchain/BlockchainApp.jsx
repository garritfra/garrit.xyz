import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { CardGroup, Popup, Button } from 'semantic-ui-react/';
import Block from './Block';
import BlockComponent from './components/BlockComponent';
import Blockchain from './Blockchain';
import Transaction from './Transaction';
import AddBlockComponent from './components/AddBlockComponent'

export default class BlockChainApp extends Component {
  constructor() {
    super();
    this.blockchain = new Blockchain();
    this.state = {
    };
  }

  render() {
    const transaction = new Transaction('Garrit', 'Alicia', 10);
    const transaction2 = new Transaction('Alicia', 'Ravel', 5);
    const lastBlock = this.blockchain.getLastBlock();
    const block = new Block(lastBlock.id + 1, lastBlock.hash);
    block.addTransaction(transaction);
    block.addTransaction(transaction2);
    this.blockchain.addBlock(block);
    const blocksPreview = [];
    this.blockchain.blocks.forEach((blockElement) => {
      blocksPreview.push(<BlockComponent block={blockElement} />);
    });

    return (
      <div className="app">
        <Popup
          trigger={<Button>Add Block</Button>}
          content="Not Yet Implemented"
        />
        <CardGroup style={{ margin: '1em' }}>
          {blocksPreview}
        </CardGroup>
        {/* <BlockComponent block={this.blockchain.blocks[1]} /> */}
        {/* <ReactJson src={this.blockchain} /> */}
      </div>
    );
  }
}

