export const baseUrl = "http://localhost:8080/api/v1";

export enum snackType {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

export const TABCHOICE = {
  EXPENSES: "EXPENSES",
  BALANCE: "BALANCE",
  SETTINGS: "SETTINGS",
} as const;

export type TabChoice = typeof TABCHOICE[keyof typeof TABCHOICE];
