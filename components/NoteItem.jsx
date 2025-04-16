import { useState,useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput } from 'react-native';

const noteItem = ({ note, onDelete, onEdit }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedContent, setEditedContent] = useState(note.content);
    const titleRef = useRef(null); //the useRef hook is used to create a mutable object that persists for the full lifetime of the component.
    const contentRef = useRef(null);

    const handleSave = () => {
        if (editedTitle.trim() === "" || editedContent.trim() === "") {
            alert("Please fill in all fields.");
            return;
        }
        onEdit(note.$id, { title: editedTitle, content: editedContent });
        setIsEditing(false);
    }


    return (
        <View style={styles.noteItem}>
            {isEditing ? (
                <View>
                    <TextInput
                        ref={titleRef}
                        style={styles.noteTitle}
                        value={editedTitle}
                        onChangeText={(text) => setEditedTitle(text)}
                        autoFocus
                        onSubmitEditing={handleSave}

                    />
                    <TextInput
                        ref={contentRef}
                        style={styles.noteContent}
                        value={editedContent}
                        onChangeText={(text) => setEditedContent(text)}
                        autoFocus
                        onSubmitEditing={handleSave}
                    />
                </View>
            ):(
                <View>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <Text style={styles.noteContent}>{note.content}</Text>
            </View>
            )}
            
            
            <View style={styles.actions}>
                {isEditing ? (
                    <TouchableOpacity onPress={()=>{
                         handleSave()
                        titleRef.current.blur();
                        contentRef.current.blur();
                    }
                    }>
                        <Text style={styles.save}>💾</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <Text style={styles.edit}>✏️</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => {onDelete(note.$id)}}>
                    <Text style={styles.delete}>❌</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    noteItem: {
        backgroundColor: "#fff",
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#343a40",
    },
    delete: {
        fontSize: 20,
        color: "#dc3545",
        // marginTop: 10,
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
    },
    edit: {
        fontSize: 20,
        color: "#007bff",
        marginRight: 10,
    },
    save: {
        fontSize: 20,
        color: "#28a745",
        marginRight: 10,
    },
})

export default noteItem;