import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../Config/firebaseconfig'; // Đường dẫn đến tệp firebase
const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleCreateUser = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        name,
        email,
        phone,
        createdAt: new Date()
      });
      Alert.alert('Tạo user thành công!');
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Lỗi khi tạo user:', error);
      Alert.alert('Có lỗi xảy ra khi tạo user');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nhập tên"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Nhập email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
      />
      <Button title="Tạo user" onPress={handleCreateUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CreateUserForm;
