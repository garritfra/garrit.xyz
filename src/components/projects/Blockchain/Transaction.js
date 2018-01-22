
export default class Transaction {
/**
 * creates a transaction object
 *
 * @constructor
 * @param {string} sender
 * @param {string} receiver
 * @param {number} amount
 */
  constructor(sender, receiver, amount) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
  }
}
