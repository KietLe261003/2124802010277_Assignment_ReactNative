import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/Config/firebaseconfig';
import { Picker } from '@react-native-picker/picker';

interface Appointment {
  id: string;
  customerName: string;
  serviceName: string;
  time: string;
}

const Appointment = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [time, setTime] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]); // List of available services

  const fetchAppointments = async () => {
    const snapshot = await getDocs(collection(db, 'appointments'));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Appointment, 'id'>),
    }));
    setAppointments(data);
  };

  const fetchServices = async () => {
    const snapshot = await getDocs(collection(db, 'services'));
    const data = snapshot.docs.map((doc) => doc.data().name);
    setServices(data); // Set available services
  };

  useEffect(() => {
    fetchAppointments();
    fetchServices();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!customerName || !serviceName || !time) {
      Alert.alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (editingId) {
      await updateDoc(doc(db, 'appointments', editingId), {
        customerName,
        serviceName,
        time,
      });
      setEditingId(null);
    } else {
      await addDoc(collection(db, 'appointments'), {
        customerName,
        serviceName,
        time,
      });
    }

    setCustomerName('');
    setServiceName('');
    setTime('');
    fetchAppointments();
  };

  const handleEdit = (item: Appointment) => {
    setCustomerName(item.customerName);
    setServiceName(item.serviceName);
    setTime(item.time);
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'appointments', id));
    fetchAppointments();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý Lịch hẹn</Text>

      {/* Form nhập liệu */}
      <TextInput
        style={styles.input}
        placeholder="Tên khách hàng"
        value={customerName}
        onChangeText={setCustomerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Thời gian (ví dụ: 10:00 12/05/2025)"
        value={time}
        onChangeText={setTime}
      />

      {/* Picker cho tên dịch vụ */}
      <Text style={styles.label}>Chọn dịch vụ</Text>
      <Picker
        selectedValue={serviceName}
        onValueChange={(itemValue) => setServiceName(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Chọn dịch vụ" value="" />
        {services.map((service, index) => (
          <Picker.Item key={index} label={service} value={service} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleAddOrUpdate}>
        <Text style={styles.buttonText}>
          {editingId ? 'Cập nhật lịch hẹn' : 'Thêm lịch hẹn'}
        </Text>
      </TouchableOpacity>

      {/* Danh sách lịch hẹn */}
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.customerName} - {item.serviceName}</Text>
            <Text>🕐 {item.time}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.edit}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#f44336',
  },
  label: {
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  edit: {
    color: 'blue',
  },
  delete: {
    color: 'red',
  },
});
