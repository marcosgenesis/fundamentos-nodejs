import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const income = this.transactions.reduce(
      (previousElement, transaction): number => {
        if (transaction.type === 'income') {
          const total = transaction.value + previousElement;
          return total;
        }
        return previousElement;
      },
      0,
    );
    const outcome = this.transactions.reduce(
      (previousElement, transaction): number => {
        if (transaction.type === 'outcome') {
          const total = transaction.value + previousElement;
          return total;
        }
        return previousElement;
      },
      0,
    );
    const balance = { income, outcome, total: income - outcome };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    console.log(this.transactions);
    return transaction;
  }
}

export default TransactionsRepository;
