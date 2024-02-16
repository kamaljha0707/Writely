const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    projectId : String(import.meta.env.VITE_PROJECT_ID),
    databaseId : String(import.meta.env.VITE_DATABASE_ID),
    collectionId : String(import.meta.env.VITE_COLLECTION_ID),
    bucketId : String(import.meta.env.VITE_BUCKET_ID),
    editorApiKey: String(import.meta.env.VITE_TINY_MCE_EDITOR_KEY)
}

export default conf;