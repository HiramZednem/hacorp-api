import { createTransaction, updateTransaction } from "../interfaces/transaction.interface";
import { BudgetModel, CategoryModel, TddModel, TransactionModel, UserModel } from "../models";


export const transactionService = {
    createTransaction: async ( entity: createTransaction ) => {

        const tdd = await TddModel.findById( entity.tddId );
        if (!tdd) {
            throw new Error('Tdd not found');
        }

        const category = await CategoryModel.findById( entity.categoryId );
        if (!category) {
            throw new Error('Category not found');
        }

        const budget = await BudgetModel.findById( category.budgetId );
        if (!budget) {
            throw new Error('Budget not found');
        }

        const user = await UserModel.findById( budget.userId );
        if (!user) {
            throw new Error('User not found');
        }

        if ( category.type == 'spent' ) {
            tdd.amount -= entity.amount;
        } else {
            tdd.amount += entity.amount;
        }

        const transaction = {
            date: entity.date,
            amount: entity.amount,
            description: entity.description,
            budgetId: budget._id,
            categoryId: category._id,
            TddId: tdd._id,
            userId: user._id,
        }

        const newTransaction = await TransactionModel.create( transaction );
        
        tdd.transactions.push(newTransaction._id);
        category.transactions.push(newTransaction._id);
        budget.transactions.push(newTransaction._id);
        user.transactions.push(newTransaction._id);

        tdd.save();
        category.save();
        budget.save();
        user.save();

        return newTransaction.populate('categoryId');
    },

    updateTransaction: async (transactionId: string, update: updateTransaction) => {
        if (Object.keys(update).length > 1) { throw new Error('Only one property can be updated at a time'); }

        const transaction = await TransactionModel.findById(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }


        if ( update.amount ) {
            const category = await CategoryModel.findById(transaction.categoryId);
            if (!category) {
                throw new Error('Category not found');
            }

            const tdd = await TddModel.findById( transaction.TddId );
            if (!tdd) {
                throw new Error('Tdd not found');
            }


            if ( category.type == 'spent' ) {
                // aqui estoy retirando lo que se le resto previamente
                tdd.amount += transaction.amount;
                // aqui agrego el nuevo monto
                tdd.amount -= update.amount;
            } else {
                tdd.amount -= transaction.amount;
                tdd.amount += update.amount;
            }


            transaction.amount = update.amount;
            transaction.save();
            tdd.save();

            return transaction.populate('categoryId');
        }

        if ( update.categoryId ) {
            const newCategory = await CategoryModel.findById(update.categoryId);
            if (!newCategory) {
                throw new Error('Updated Category not found');
            }

            const category = await CategoryModel.findById(transaction.categoryId);
            if (!category) {
                throw new Error('Category not found');
            }

            const tdd = await TddModel.findById( transaction.TddId );
            if (!tdd) {
                throw new Error('Tdd not found');
            }


            if ( category.type == 'spent' ) {
                // aqui estoy sumando lo que se le resto previamente
                tdd.amount += transaction.amount;
            } else {
                // aqui estoy restando lo que se le sumo previamente
                tdd.amount -= transaction.amount;
            }

            // aqui elimino la transaccion
            category.transactions.pull(transaction._id);
            category.save();

            newCategory.transactions.push(transaction._id);
            newCategory.save();

            if ( newCategory.type == 'spent' ) {
                tdd.amount -= transaction.amount;
            } else {
                tdd.amount += transaction.amount;
            }
            tdd.save();

            transaction.categoryId = update.categoryId;
            transaction.save();

            return transaction.populate('categoryId');

        }

        if ( update.tddId ) {
            const category = await CategoryModel.findById(transaction.categoryId);
            if (!category) {
                throw new Error('Category not found');
            }

            const tdd = await TddModel.findById( transaction.TddId );
            if (!tdd) {
                throw new Error('Tdd not found');
            }

            const newTdd = await TddModel.findById(update.tddId);
            if (!newTdd) {
                throw new Error('Updated Tdd not found');
            }

            tdd.transactions.pull(transaction._id);

            if ( category.type == 'spent' ) {
                // aqui estoy sumando lo que se le resto previamente
                tdd.amount += transaction.amount;
                // aqui si estoy haciendo bin el cargo a la tarjeta nueva
                newTdd.amount -= transaction.amount;
            } else {
                // aqui estoy restando lo que se le sumo previamente
                tdd.amount -= transaction.amount;
                // aqui si estoy haciendo bin el cargo a la tarjeta nueva
                newTdd.amount += transaction.amount;
            }

            tdd.save();
            newTdd.save();
            transaction.TddId = update.tddId;
            transaction.save();

            return transaction.populate('categoryId');
        }

        if ( update.date ) {
            return await TransactionModel.findByIdAndUpdate(transactionId, update, { new: true })
        }

        if ( update.description ) {
            return await TransactionModel.findByIdAndUpdate(transactionId, update, { new: true })
        }

    },

    deleteTransaction: async (transactionId: string) => {
        const transaction = await TransactionModel.findById(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        const tdd = await TddModel.findById( transaction.TddId );
        if (!tdd) {
            throw new Error('Tdd not found');
        }

        const category = await CategoryModel.findById( transaction.categoryId );
        if (!category) {
            throw new Error('Category not found');
        }

        const budget = await BudgetModel.findById( category.budgetId );
        if (!budget) {
            throw new Error('Budget not found');
        }

        const user = await UserModel.findById( budget.userId );
        if (!user) {
            throw new Error('User not found');
        }

        // aqui estoy eliminando el gasto/ingreso de la transaccion
        if ( category.type == 'spent' ) {
            tdd.amount += transaction.amount;
        } else {
            tdd.amount -= transaction.amount;
        }

        category.transactions.pull(transaction._id);
        tdd.transactions.pull(transaction._id);
        budget.transactions.pull(transaction._id);
        user.transactions.pull(transaction._id);
        category.save();
        tdd.save();
        budget.save();
        user.save();
        return await TransactionModel.deleteOne({ _id: transactionId });
    },

    getTransactionByUserId: async (userId: string) => {
        const user = await UserModel.findById(userId);
        if (!user) {
            console.log('User not found');
            throw new Error('User not found');
        }
        return await TransactionModel.find({ userId });
    },

};