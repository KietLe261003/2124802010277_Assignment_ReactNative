import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { app } from '@/app/Config/firebaseconfig';
import { Service } from '../Type/Service';

const db = getFirestore(app);

const UserScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
      const serviceList: Service[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
      setServices(serviceList);
      setFilteredServices(serviceList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredServices(filtered);
  }, [searchQuery, services]);

  const renderItem = ({ item }: { item: Service }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{Number(item.price).toLocaleString()} đ</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dịch vụ</Text>
      <TextInput
        placeholder="Tìm kiếm theo tên dịch vụ..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      {filteredServices.length === 0 ? (
        <Text style={styles.noResult}>Không tìm thấy dịch vụ nào</Text>
      ) : (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
    color: '#f44336',
  },
  noResult: {
    marginTop: 20,
    color: '#666',
    textAlign: 'center',
  },
});
