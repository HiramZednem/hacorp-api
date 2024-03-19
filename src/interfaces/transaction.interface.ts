

export interface createTransaction { 
    date: Date,
    amount: number,
    description: string,
    categoryId: number, 
    tddId: Number,
} 

export interface updateTransaction {
    date?: Date,
    amount?: number,
    description?: string,
    categoryId?: number, 
    tddId?: Number,
}