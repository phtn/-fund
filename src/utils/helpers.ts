import { type ReactElement } from "react";

export function generateAccountNumber() {
  // Ensure bankCode and branchCode are 2 digits

  const bankCode = 80; // Represents a specific bank
  const branchCode = new Date().getFullYear() - 2000; // Represents a specific branch
  const formattedBankCode = bankCode.toString().padStart(2, "0");
  const formattedBranchCode = branchCode.toString().padStart(2, "0");

  // Generate a random 4-digit unique identifier (between 1000 and 9999)
  const uniqueId = Math.floor(1000 + Math.random() * 9000);
  const midId = Math.floor(1000 + Math.random() * 9000);
  const lastId = Math.floor(1000 + Math.random() * 9000);

  // Combine all parts to form the 8-digit account number
  const accountNumber = `${formattedBankCode}${formattedBranchCode}-${uniqueId}-${midId}-${lastId}`;

  return accountNumber;
}

export const opts = (...args: ReactElement[]) => {
  return new Map([
    [true, args[0]],
    [false, args[1]],
  ]);
};
