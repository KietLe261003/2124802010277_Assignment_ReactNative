import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import ContactThumbnail from '../Component/ContactThumbnail';
import { fetchContacts } from '@/app/Service/api';

const keyExtractor = ({phone}: any) => phone;
const Favorites = ({navigation}: any) => {
  //state
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //Load du lieu
  useEffect(() => {
    fetchContacts()
      .then(contacts => {
        setContacts(contacts);
        setLoading(false);
        setError(false);
      })
      .catch(e => {
        setLoading(false);
        setError(true);
      });
  });
  const renderFavoriteThumbnail = ({item}: any) => {
    const {avatar} = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigation.navigate('Profile', {contact: item})}
      />
    );
  };

  const favorites = contacts.filter((contact: any) => contact.favorite);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
});

export default Favorites;