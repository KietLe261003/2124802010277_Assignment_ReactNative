import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import {
  Appbar,
  Button,
  TextInput,
  Dialog,
  Portal,
  Paragraph,
} from 'react-native-paper';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getFirestore,
  DocumentData,
} from 'firebase/firestore';
import { app } from '@/app/Config/firebaseconfig';
import Todo, { TodoItem } from './Component/Todo';

const db = getFirestore(app);

const LyThuyetBuoi5: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (querySnapshot) => {
      const list: TodoItem[] = [];
      querySnapshot.forEach((doc) => {
        const { title, complete } = doc.data() as DocumentData;
        list.push({ id: doc.id, title, complete });
      });

      setTodos(list);
      if (loading) setLoading(false);
    });

    return unsubscribe;
  }, [loading]);

  const addTodo = async () => {
    if (todo.trim().length === 0) return;

    await addDoc(collection(db, 'todos'), {
      title: todo.trim(),
      complete: false,
    });

    setTodo('');
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const startEditTodo = (todo: TodoItem) => {
    setEditingTodo(todo);
    setEditText(todo.title);
    setShowEditDialog(true);
  };

  const confirmEdit = async () => {
    if (!editingTodo) return;
    await updateDoc(doc(db, 'todos', editingTodo.id), {
      title: editText.trim(),
    });
    setShowEditDialog(false);
    setEditingTodo(null);
    setEditText('');
  };

  if (loading) return null;

  return (
    <View style={{ flex: 1 }}>
      <Appbar>
        <Appbar.Content title="TODOs List" />
      </Appbar>

      <FlatList
        style={{ flex: 1 }}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Todo
            {...item}
            onDelete={() =>
              Alert.alert('Xác nhận', 'Xóa TODO này?', [
                { text: 'Hủy' },
                { text: 'Xóa', onPress: () => deleteTodo(item.id) },
              ])
            }
            onEdit={() => startEditTodo(item)}
          />
        )}
      />

      <TextInput
        label="New Todo"
        value={todo}
        onChangeText={setTodo}
        style={{ margin: 10 }}
      />
      <Button mode="contained" onPress={addTodo} style={{ margin: 10 }}>
        Add TODO
      </Button>

      {/* Edit Dialog */}
      <Portal>
        <Dialog visible={showEditDialog} onDismiss={() => setShowEditDialog(false)}>
          <Dialog.Title>Chỉnh sửa TODO</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Tên mới"
              value={editText}
              onChangeText={setEditText}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowEditDialog(false)}>Hủy</Button>
            <Button onPress={confirmEdit}>Lưu</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default LyThuyetBuoi5;
