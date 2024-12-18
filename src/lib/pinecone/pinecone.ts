
import { vectorData } from '@/types/pinecone.types';
import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
  apiKey: process.env.NEXT_VECTOR_DB_API_KEY,
});
const index = pc.index(process.env.NEXT_VECTOR_DB_NAMESPACE);


export async function insertVector(userId: string, insertData: vectorData) {
  try {
    const { records } = await index.fetch([userId]);
    const userIdData = records[0];
    const vectorInsertResponse = await index.namespace(userId).upsert([
      insertData,
    ]);
    return { success: true, vectorInsertResponse };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in pinecone insertVector", error.message);
    }
    return { sucess: false };
  }

}