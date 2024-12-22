export async function getDoc(db, documentId, collectionId,) {
  try {
    const doc = await db.getDocument(
      process.env.NEXT_APPWRITE_DB_ID,
      collectionId,
      documentId,
    )
    return doc
  } catch (error) {
    console.dir(error, { depth: null })
    return null
  }
}

export async function createDoc(db, storage, documentId, uploadedImageId, collectionId, props) {
  try {
    await db.createDocument(
      process.env.NEXT_APPWRITE_DB_ID,
      collectionId,
      documentId,
      props,
    )
  } catch (error) {
    console.error(error);
    console.log("DELETING THE IMAGE FROM STORAGE");
    await storage.deleteFile(
      process.env.NEXT_APPWRITE_BUCKET_ID,
      uploadedImageId,
    )
    console.log("IMAGE DELETED FROM STORAGE");
    return null
  }
}



export async function updateDoc(db, storage, category, uploadedImageId, image_ids, documentId) {
  try {
    await db.updateDocument(
      process.env.NEXT_APPWRITE_DB_ID,
      process.env.NEXT_APPWRITE_IMAGE_COLLECTION_ID,
      documentId,
      {
        "image_ids": [`${uploadedImageId}`, ...image_ids,]
      }
    )
  } catch (error) {
    console.error(error);
    console.log("DELETING THE IMAGE FROM STORAGE");
    await storage.deleteFile(
      process.env.NEXT_APPWRITE_BUCKET_ID,
      uploadedImageId,
    )
    console.log("IMAGE DELETED FROM STORAGE");
    return null
  }
}


