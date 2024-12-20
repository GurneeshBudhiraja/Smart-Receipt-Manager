import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
  apiKey: process.env.NEXT_VECTOR_DB_API_KEY,
});

const index = pc.index(process.env.NEXT_VECTOR_DB_NAMESPACE);


export async function insertVector(id: string, userId: string, vectorData: number[], metadata: Record<string, string>) {
  try {
    await index.namespace(userId).upsert([{
      id,
      values: vectorData,
      metadata
    }])
    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in pinecone insertVector", error.message);
    }
    return { success: false };
  }

}


export async function deleteVector(userId: string, id: string,) {
  try {
    await index.namespace(userId).deleteOne(id)
    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to delete the vector", error.message)
    }
    return { success: false };
  }
}

export async function queryVectors(userId: string, queryVector: number[]) {
  try {
    return await index.namespace(userId).query({
      vector: queryVector,
      topK: 3,
      includeMetadata: true,
    })
  } catch (error) {
    console.log("Failed to query closest vector", error)
    return {};
  }
}