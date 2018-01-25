import { SHA256 } from 'crypto-js';
import propTypes from 'prop-types';
import Transaction from './Transaction';
import Blockchain from './Blockchain';

export default class Block {
  /**
     * Construct a Block object
     * @constructor
     * @param {number} id
     * @param {string} previousHash
     */
  constructor(id, previousHash) {
    this.id = id;
    this.timestamp = new Date();
    this.data = [];
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  /**
     * Concatenates the timestamp, previous hash and transaction data of a block and
     * calculates the according SHA256 Hash
     * @returns hash
     */
  calculateHash() {
    const hashStr = this.timestamp + this.previousHash + this.data;
    const hash = SHA256(hashStr).toString();
    return hash;
  }

  /**
     * Creates the first block in a blockchain.
     * It has a stub transaction with an amount of 0 coins.
     *
     * Called automatically upon blockchain creation
     *
     * @returns genesisBlock
     */
  static createGenesisBlock() {
    const genesisTransaction = new Transaction('Genesis', 'Genesis', 0);
    const genesisBlock = new Block(0, '0');
    genesisBlock.addTransaction(genesisTransaction);
    return genesisBlock;
  }


  /**
     * Pushes a transaction to the Block
     * @param {Transaction} transaction
     */
  addTransaction(transaction) {
    this.data.push(transaction);
  }
}

Block.propTypes = {
  hash: propTypes.string,
  genesisBlock: propTypes.instanceOf(Block),
  blockchain: propTypes.instanceOf(Blockchain),
};
