import { Expense } from "@/types/expense";

export const getTotalAmount = (expenses: Expense[]) => {
  return expenses?.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);
};

export const getExpensesWhereUserIsBeneficiary = (
  expenses: Expense[],
  userId: string
) => {
  return expenses?.filter((expense) =>
    expense.beneficiaries.map((beneficiary) => beneficiary._id).includes(userId)
  );
};

export const getUserShares = (expenses: Expense[], userId: string) => {
  const expensesUser = getExpensesWhereUserIsBeneficiary(expenses, userId);
  return expensesUser?.reduce((acc, expense) => {
    const myShare = expense.amount / expense.beneficiaries.length;
    return acc + myShare;
  }, 0);
};
