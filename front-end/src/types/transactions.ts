import type { Category, CategorySummary } from "./category";

export enum TransactionType {
    EXPENSE = "expense",
    INCOME = "income",
}

export interface TransactionFilter {
    month: number;
    year: number;
    categoryId?: string;
    type?: TransactionType;
}

export interface Transaction {
    id: string;
    userId: string;
    description: string;
    amount: number;
    date: string | Date;
    categoryId: string;
    category: Category;
    type: TransactionType;
    updatedAt: Date | string;
    createdAt: Date | string;
}

export interface TransactionSummary {
    totalExpense: number,
    totalIncome: number,
    balance: number,
    expesesByCategory: CategorySummary[];
}

export interface MonthlyItem {
    name: string,
    expenses: number,
    income: number,
}


export interface CreateTransactionDataDTO {
    //DTO -> data transfer object
    amount: number;
    description: string;
    date: Date | string;
    categoryId: string;
    type: TransactionType;
}