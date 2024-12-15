import { cookies } from "next/headers";
import { Client, Account, Storage, Databases } from "node-appwrite";

// TODO: fix this ts any
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_APPWRITE_PROJECT_ID);

  const session = (await cookies()).get("session");
  if (!session || !session.value) {
    return null
  }

  client.setSession(session.value)

  return {
    get account() {
      return new Account(client);
    },
    get storage() {
      return new Storage(client);
    },
    get db() {
      return new Databases(client)
    }
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_APPWRITE_API_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get storage() {
      return new Storage(client);
    },
    get db() {
      return new Databases(client)
    }
  };
}
