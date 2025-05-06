import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { fetchUserContact } from '@/app/Service/api';
import ContactThumbnail from '../Component/ContactThumbnail';

const User = () => {
  const [user, setUser] = useState<{
    avatar: string;
    name: string;
    phone: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //Load du lieu
  useEffect(() => {
    fetchUserContact()
      .then((users: any) => {
        setUser(users);
        setLoading(false);
        setError(false);
      })
      .catch(e => {
        setLoading(false);
        setError(true);
      });
  },[]);

  const {avatar, name, phone} = user || {};

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && user && (
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
  },
});
export default User;