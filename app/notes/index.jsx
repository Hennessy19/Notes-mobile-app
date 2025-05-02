import {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import NoteList from "@/components/NoteList";
import AddNoteModal from "@/components/AddNoteModal";
import noteService from "@/services/noteService";
import  {useRouter} from "expo-router"; 
import { useAuth } from "@/contexts/AuthContext";

const NotesScreen = () => {
    const router = useRouter();
    const {user, loading:authLoading} = useAuth();


    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState({title: "", content: ""});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        if(!authLoading && !user){
            router.push("/auth");
        }
    },[authLoading, user]);

    useEffect(() => {
        if (user){
            fetchNotes();
        }
    },[user]);

    const fetchNotes = async () => {
        setLoading(true);
        // console.log("Fetching notes...");
        const response = await noteService.getAllNotes(user.$id);
        // console.log("Fetched notes:", response);
        if (response.error) {
            setError(response.error);
            Alert.alert("Error", response.error);
        } else {
            setNotes(response.data);
            setError(null);
        }
        setLoading(false);
    }

    // Add new Note function
    const addNote = async() => {
        if (newNote.title && newNote.content) {
            // console.log("Adding note: ✅✅✅", newNote);

            const response = await noteService.addNote(user.$id, newNote);
            console.log("Added note:", response);
            if (response.error) {
                Alert.alert("Error", response.error);
            }
            else{
                setNotes([...notes, response.data]);
            }

            // setNotes([...notes, { ...newNote}]);
            setNewNote({title: "", content: ""});
            setModalVisible(false);
        } else {
            alert("Please fill in all fields.");
        }
    };

    // delete note function
    const deleteNote = async (id) => {
        // console.log("Deleting note: ", id);
        Alert.alert(
            "Delete Note",
            "Are you sure you want to delete this note?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        const response = await noteService.deleteNote(id);
                        console.log("Deleted note:", response);
                        if (response.error) {
                            Alert.alert("Error", response.error);
                        } else {
                            setNotes(notes.filter(note => note.$id !== id));
                        }
                    },
                },
            ]
        );
    }

    // Edit note function
    const editNote = async (id, updatedNote) => {
        if (!updatedNote.title || !updatedNote.content) {
            alert("Please fill in all fields.");
            return;
        }
        // console.log("Editing note: ", id, updatedNote);
        const response = await noteService.updateNote(id, updatedNote);
        console.log("Updated note:", response);
        if (response.error) {
            Alert.alert("Error", response.error);
        } else {
            setNotes((prevNotes)=>prevNotes.map(note => note.$id === id ? {...note, ...updatedNote} : note));
        }
    }

    return (
      <View style={styles.container}>
        {/* Notes List */}
        {loading ? (<ActivityIndicator size="large" color="#007bff" />) :( 
        <>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {/* <Text style={{fontSize: 24, fontWeight: "bold", marginBottom: 20}}>My Notes</Text> */}
        {notes.length === 0 ? (
            <Text style={styles.emptyNotes}>No notes available. Please add a note.</Text>
        ) :
         (
        <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
        )
        }
        </>
        )}
     
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Note</Text>
        </TouchableOpacity>

        {/* Add Note Modal */}
        <AddNoteModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
        />

      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    addButton: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginTop: 20,
        alignSelf: "center",    
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    emptyNotes: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#6c757d",
        textAlign: "center",
        marginTop: 20,
    },
})
export default NotesScreen;