import Block from './Block';

export default class Blockchain {
  constructor() {
    this.blocks = [];
    this.genesisBlock = Block.createGenesisBlock();

    this.addBlock(this.genesisBlock);
  }

  addBlock(block) {
    this.blocks.push(block);
  }

  getLastBlock() {
    const lastBlock = this.blocks[this.blocks.length - 1];
    return lastBlock;
  }
}
