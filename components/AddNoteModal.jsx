import {View, Text, StyleSheet, TouchableOpacity, Modal, TextInput} from "react-native";
import PropTypes from 'prop-types';

const AddNoteModal = ({ modalVisible, setModalVisible, newNote, setNewNote, addNote  }) => {
    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a New Note</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newNote.title}
              onChangeText={(text) => setNewNote({ ...newNote, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Content"
              value={newNote.content}
              onChangeText={(text) =>
                setNewNote({ ...newNote, content: text })
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={addNote}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.14)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        // marginTop: 20,
    },
    cancelButton: {
        backgroundColor: "#dc3545",
        padding: 10,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    saveButton: {
        backgroundColor: "#28a745",
        padding: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
})

AddNoteModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  newNote: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  setNewNote: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired
};

export default AddNoteModal;