import { User } from "@/types/user";

export type Expense = {
  _id: string;
  name: string;
  category: Category;
  amount: number;

  /*
   * UserId of the user who paid for the expense
   */
  paidBy: User;

  /*
   * Array of user ids who benefited from the expense
   * The paidBy user is automatically added to the list of beneficiaries
   */
  beneficiaries: User[];

  /*
   * Timestamp of the expense
   */
  createdAt: string;

  /*
   * Timestamp of the expense
   */
  updatedAt: string;

  refunded: boolean;
};
