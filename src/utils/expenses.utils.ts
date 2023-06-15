import { Expense } from "@/types/expense";

// Various utils, may need a refactor to put these in the backend
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
  const expensesUser = getExpensesWhereUserIsBeneficiary(
    expenses,
    userId
  ).filter((expense) => expense.paidBy._id !== userId);
  return expensesUser?.reduce((acc, expense) => {
    const myShare = expense.amount / expense.beneficiaries.length;
    return acc + myShare;
  }, 0);
};
