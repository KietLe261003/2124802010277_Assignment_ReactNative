import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Menu, IconButton } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDoc, doc, deleteDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/app/Config/firebaseconfig';

const db = getFirestore(app);

const DetailService = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { idService } = route.params;
  const [service, setService] = useState<any>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Service detail',
      headerStyle: { backgroundColor: '#f44336' },
      headerTintColor: '#fff',
      headerRight: () => (
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <IconButton
              icon="dots-vertical"
              iconColor="#fff"
              onPress={() => setMenuVisible(true)}
            />
          }
        >
          <Menu.Item onPress={handleEdit} title="Edit" />
          <Menu.Item onPress={handleDelete} title="Delete" />
        </Menu>
      ),
    });
  }, [navigation, menuVisible]);

  useEffect(() => {
    const fetchService = async () => {
      const docRef = doc(db, 'services', idService);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setService({ id: docSnap.id, ...docSnap.data() });
      } else {
        Alert.alert('Service not found');
      }
    };
    fetchService();
  }, [idService]);

  const handleEdit = () => {
    setMenuVisible(false);
    navigation.navigate('EditService', { idService });
  };

  const handleDelete = async () => {
    setMenuVisible(false);
    Alert.alert('Confirm delete', 'Are you sure you want to delete this service?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'services', idService));
            Alert.alert('Deleted successfully');
            navigation.goBack();
          } catch (error) {
            console.error('Error deleting document:', error);
            Alert.alert('Error deleting service');
          }
        },
      },
    ]);
  };

  if (!service) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}><Text style={styles.bold}>Service name:</Text> {service.name}</Text>
      <Text style={styles.text}><Text style={styles.bold}>Price:</Text> {service.price.toLocaleString()} ₫</Text>
      <Text style={styles.text}><Text style={styles.bold}>Creator:</Text> {service.createtor}</Text>
      <Text style={styles.text}><Text style={styles.bold}>Time:</Text> {formatDate(service.createdAt?.toDate())}</Text>
      <Text style={styles.text}><Text style={styles.bold}>Final update:</Text> {formatDate(service.updateAt?.toDate())}</Text>
    </View>
  );
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(date);
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginVertical: 6,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default DetailService;
