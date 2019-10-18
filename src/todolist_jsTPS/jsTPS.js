class jsTPS_Transaction
{
    doTransaction()
    {

    }

    undoTransaction()
    {

    }
}

class jsTPS
{
    constructor()
    {
        this.transactions = [];
        this.mostRecentTransaction = -1;
        this.performingDo = false;
        this.performingUndo = false;
    }

    isPerformingDo()
    {
        return this.performingDo;
    }

    isPerformingUndo()
    {
        return this.performingUndo;
    }

    getSize()
    {
        return this.transactions.length;
    }

    getTransactions()
    {
        return this.transactions;
    }

    addTransaction(transaction)
    {
        if ((this.mostRecentTransaction < 0) || (this.mostRecentTransaction < (this.getSize() - 1)))
        {
            for (var i = this.getSize() - 1; i > this.mostRecentTransaction; i--)
            {
                this.transactions.splice(i, 1);
            }
        }

        this.transactions.push(transaction);

        this.doTransaction();
    }

    hasTransactionToRedo()
    {
        return this.mostRecentTransaction < (this.getSize() - 1);
    }

    hasTransactionToUndo()
    {
        return this.mostRecentTransaction >= 0;
    }

    doTransaction()
    {
        if (this.hasTransactionToRedo())
        {
            this.performingDo = true;
            let transaction = this.transactions[this.mostRecentTransaction + 1];
            let list = transaction.doTransaction();
            this.mostRecentTransaction++;
            this.performingDo = false;

            return list;
        }
    }

    peekUndo()
    {
        if (this.hasTransactionToUndo())
        {
            return this.transactions[this.mostRecentTransaction];
        }
        else
        {
            return null;
        }
    }

    peekDo()
    {
        if (this.hasTransactionToRedo())
        {
            return this.transactions[this.mostRecentTransaction + 1];
        }
        else
        {
            return null;
        }
    }

    undoTransaction()
    {
        if (this.hasTransactionToUndo())
        {
            this.performingUndo = true;
            let transaction = this.transactions[this.mostRecentTransaction];
            let list = transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.performingUndo = false;

            return list;
        }
    }

    clearAllTransactions()
    {
        this.transactions.splice(0, this.getSize());
        this.mostRecentTransaction = -1;
    }

    getRedoSize()
    {
        return this.getSize() - this.mostRecentTransaction - 1;
    }

    getUndoSize()
    {
        return this.mostRecentTransaction + 1;
    }

    toString()
    {
        let text = "CURRENT jsTPS:<br>--Number of Transactions: " + this.getSize() + "<br>";
        text += "--Current Index on Stack: " + this.mostRecentTransaction + "<br>";
        text += "--Current Transaction Stack:<br>";
        
        for (var i = 0; i <= this.mostRecentTransaction; i++)
        {
            let jT = this.transactions[i];
            text += "----" + jT.toString() + "<br>";
        }

        return text;
    }

}

export {jsTPS_Transaction, jsTPS};