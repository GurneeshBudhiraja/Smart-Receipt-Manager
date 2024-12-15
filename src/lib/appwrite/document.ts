export async function getDoc(clientSessionDb, documentId) {
  try {
    const doc = await clientSessionDb.getDocument(
      process.env.NEXT_APPWRITE_DB_ID,
      process.env.NEXT_APPWRITE_IMAGE_COLLECTION_ID,
      documentId
    )
    return doc
  } catch {
    return null
  }
}