import { Account, Databases } from "node-appwrite";

// Type for the session client
export type SessionClient = {
  account: Account,
  storage: Storage,
  db: Databases
} | null;