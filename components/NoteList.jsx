import {View, FlatList } from 'react-native';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';

const NoteList = ({ notes, onDelete, onEdit}) => { 
    return(
        <View>

               <FlatList
                      data={notes}
                      keyExtractor={(item) => item.$id}
                      renderItem={({ item }) => <NoteItem note={item}
                      onDelete={onDelete}
                      onEdit={onEdit} />}
                    />
        </View>
    )

}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default NoteList;