declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_APPWRITE_PROJECT_ID: string;
    NEXT_APPWRITE_ENDPOINT: string;
    NEXT_APPWRITE_BUCKET_ID: string;
    NEXT_APPWRITE_API_KEY: string;
    NEXT_APPWRITE_DB_ID: string;
    NEXT_APPWRITE_IMAGE_COLLECTION_ID: string;
  }
}