import Block from './Block';

export default class Blockchain {
  /**
   * Blockchain
   *@constructor
   */
  constructor() {
    this.blocks = [];
    this.genesisBlock = Block.createGenesisBlock();

    this.addBlock(this.genesisBlock);
  }

  /**
   * Add a block to the blockchain
   * @param {Block} block
   */
  addBlock(block) {
    this.blocks.push(block);
  }

  /**
   * Finds the last block of a blockchain
   * @returns {Block}
   */
  getLastBlock() {
    const lastBlock = this.blocks[this.blocks.length - 1];
    return lastBlock;
  }
}
