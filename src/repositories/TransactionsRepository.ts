import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface transaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions = this.transactions;
    let income = 0;
    let outcome = 0;
    let total = 0;

    transactions.map(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value;
        total += transaction.value;
      } else {
        outcome += transaction.value;
        total -= transaction.value;
      }

      return null;
    });

    const balance = { income, outcome, total }

    return balance;
  }

  public create({ title, value, type }: transaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
