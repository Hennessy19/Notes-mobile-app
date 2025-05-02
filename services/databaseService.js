import { database } from "./appwrite";

const databaseService = {
    async getAllDocuments(dbId, colId, queries = []) {
        try {
            
            const response = await database.listDocuments(dbId, colId); 
            // this listDocuments method is used to get all documents from a collection,
            // it takes two parameters, the database ID and the collection ID.
            //it is part of the appwrite SDK.
            // The response will contain an array of documents in the collection.

            return {data: response.documents || [], error: null};

        } catch (error) {
            console.error('Error fetching documents:', error);
            // throw new Error('Failed to fetch documents');
            return {error: error.message};   
        }
    },

    // Add data
    async addDocument(dbId, colId, id ,data) {
        try {
            const response = await database.createDocument(dbId, colId, id , data);
            return response;
        } catch (error) {
            console.error('Error adding document:', error);
            return {error: error.message};
        }
    },

    // Delete Document
    async deleteDocument(dbId, colId, docId) {
        try {
             await database.deleteDocument(dbId, colId, docId);
            return {success: true};
        } catch (error) {
            console.error('Error deleting document:', error);
            return {error: error.message};
        }
    },

    // Update Document
    async updateDocument(dbId, colId, docId, data) {
        try {
            const response = await database.updateDocument(dbId, colId, docId, data);
            return response;
        } catch (error) {
            console.error('Error updating document:', error);
            return {error: error.message};
        }
    },
    
};

export default databaseService;