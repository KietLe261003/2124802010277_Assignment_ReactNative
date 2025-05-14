import React from 'react';
import { List, IconButton } from 'react-native-paper';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/app/Config/firebaseconfig';

export interface TodoItem {
  id: string;
  title: string;
  complete: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}

const db = getFirestore(app);

const Todo: React.FC<TodoItem> = ({ id, title, complete, onDelete, onEdit }) => {
  const toggleComplete = async () => {
    await updateDoc(doc(db, 'todos', id), { complete: !complete });
  };

  return (
    <List.Item
      title={title}
      onPress={toggleComplete}
      left={(props) => (
        <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
      )}
      right={(props) => (
        <>
          <IconButton icon="pencil" onPress={onEdit} />
          <IconButton icon="delete" onPress={onDelete} />
        </>
      )}
    />
  );
};

export default Todo;
