import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore';
import { app } from '@/app/Config/firebaseconfig';


const db = getFirestore(app);
const auth = getAuth(app);

const AddService = () => {
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddService = async () => {
    if (!serviceName.trim() || !price) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setIsLoading(true);
    try {
      const user = auth.currentUser;
      const displayName = user?.displayName || user?.email || 'Unknown';
      const userInfo = await getDoc(doc(db, 'users', user?.uid || ''));
      if (!userInfo.exists()) {
        Alert.alert('Người dùng không tồn tại trong cơ sở dữ liệu.');
        return;
      }
      const docRef = await addDoc(collection(db, 'services'), {
        name: serviceName.trim(),
        price: parseFloat(price),
        createtor: userInfo.data()?.name || displayName,
        createdAt: new Date(),
        updateAt: new Date(),
      });
      await updateDoc(doc(db, 'services', docRef.id), {
        id: docRef.id,
      });
  
      Alert.alert('Thêm dịch vụ thành công!');
      setServiceName('');
      setPrice('0');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Lỗi khi thêm dịch vụ:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service name *</Text>
      <TextInput
        placeholder="Input a service name"
        value={serviceName}
        onChangeText={setServiceName}
        style={styles.input}
      />

      <Text style={styles.label}>Price *</Text>
      <TextInput
        placeholder="0"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddService} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Adding...' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f3f3f6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f44336',
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
