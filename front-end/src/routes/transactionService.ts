import { Api } from "../services/Api";
import type { MonthlyItem, Transaction, CreateTransactionDataDTO, TransactionFilter } from "../types/transactions";
import type { TransactionSummary } from "../types/transactions";

export async function getTransactions(filter?: Partial<TransactionFilter>): Promise<Transaction[]> {
    const { data } = await Api.get<Transaction[]>('/transactions', {
        params: filter
    });

    return data;
}
export const getTransactionsSummary = async (month: number, year: number): Promise<TransactionSummary> => {
    const { data } = await Api.get<TransactionSummary>('/transactions/resume', {
        params: { month, year }
    })
    return data;
}

export const getTransactionsMonthly = async (
    month: number,
    year: number,
    months?: number
): Promise<{ history: MonthlyItem[] }> => {
    const { data } = await Api.get('/transactions/historical', {
        params: {
            month,
            year,
            months
        }
    });
    return data;
}

export const deleteTransaction = async (id: string): Promise<void> => {
    await Api.delete(`/transactions/${id}`)
}

export const createTransaction = async (transactionData: CreateTransactionDataDTO): Promise<Transaction> => {
    const { data } = await Api.post<Transaction>(`/transactions`, transactionData)
    return data;

}
