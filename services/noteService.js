import databaseService from "./databaseService";
import { ID, Query } from 'react-native-appwrite';

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
    async getAllNotes(userId){
        if(!userId){
            console.error("Empty user Id")
            return{data:[], error: "User ID is missing"}
        }

        try {
            const response = await databaseService.getAllDocuments(dbId, colId, [Query.equal('user_id', userId)]); // Fetch all notes for the user
            return response;
            
        } catch (error) {
            console.error("Error fetching Notes :", error);
            return {data: [], error: "Error fetching notes"};
            
        }
        // console.log("Fetching all notes...");
        // console.log("Fetched notes:", response);
        // if (response.error) {
        //     console.error('Error fetching notes:', response.error);
        //     return {error: response.error};
        // }
        // return {data: response};
    },

    async addNote(user_id,data){
        if(!data) {
            console.error('No data provided to addNote');
            return {error: 'No data provided'};
        }
        const newNote = {
            title: data.title,
            content: data.content,
            createdAt: new Date().toISOString(),
            user_id: user_id,
        };

        const response = await databaseService.addDocument(dbId, colId, ID.unique(), newNote);
        // console.log("Added note:", response);
        if (response.error) {
            console.error('Error adding note:', response.error);
            return {error: response.error};
        }
        return {data: response};

    },

    async deleteNote(noteId) {
        if(!noteId) {
            console.error('No note ID provided to deleteNote');
            return {error: 'No note ID provided'};
        }
        const response = await databaseService.deleteDocument(dbId, colId, noteId);
        // console.log("Deleted note:", response);
        if (response.error) {
            console.error('Error deleting note:', response.error);
            return {error: response.error};
        }
        return {success: true};
    },

    // Update Note
    async updateNote(noteId, data) {
        if(!noteId || !data) {
            console.error('No note ID or data provided to updateNote');
            return {error: 'No note ID or data provided'};
        }
        const updatedNote = {
            title: data.title,
            content: data.content,
            // updatedAt: new Date().toISOString(),
        };
        const response = await databaseService.updateDocument(dbId, colId, noteId, updatedNote);
        // console.log("Updated note:", response);
        if (response.error) {
            console.error('Error updating note:', response.error);
            return {error: response.error};
        }
        return {data: response};
    },
};

export default noteService;