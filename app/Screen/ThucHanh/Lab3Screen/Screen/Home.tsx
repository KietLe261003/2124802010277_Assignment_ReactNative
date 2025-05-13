import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Service } from '../Type/Service';
import { collection, getFirestore, onSnapshot } from '@firebase/firestore';
import { app } from '@/app/Config/firebaseconfig';

const db = getFirestore(app);

const Home = () => {
  const [services, setServices] =useState<Service[]>([]);
  const navigation = useNavigation<any>();
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DetailService', { idService: item.id })}>
      <Text style={styles.serviceText}>{item.name}</Text>
      <Text style={styles.priceText}>{item.price}</Text>
    </TouchableOpacity>
  );
  const fetchServices = () => {
    const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
      const serviceList: Service[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
      setServices(serviceList);
    }, (error) => {
      console.error('Lỗi khi lắng nghe services:', error);
    });
  
    return unsubscribe;
  };
  useEffect(() => {
    const unsubscribe = fetchServices();
    return () => unsubscribe(); 
  }, []);
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>HUYỀN TRINH</Text>
        <MaterialIcons name="account-circle" size={28} color="#fff" />
      </View>

      {/* Logo */}
      <Image
        source={{uri: 'https://media-cdn.tripadvisor.com/media/photo-s/12/8a/a2/cb/kame-home-spa.jpg'}} // Cần thay đúng đường dẫn
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title + Add Icon */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Danh sách dịch vụ</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("AddService" as never)}>
          <MaterialIcons name="add-circle" size={24} color="#f44336" />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    backgroundColor: '#f44336',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: '100%',
    height: 80,
    marginVertical: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceText: {
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
  },
  priceText: {
    fontWeight: '600',
    marginLeft: 10,
  },
});
