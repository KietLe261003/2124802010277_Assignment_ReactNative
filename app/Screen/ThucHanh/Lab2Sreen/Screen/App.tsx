import { fetchContacts } from '@/app/Service/api';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ContactItem from '../Component/ContactItem';


const keyExtractor = ({phone}: any) => phone;

const ContactApp = ({navigation}: any) => {
  // state
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Load dữ liệu
  useEffect(() => {
    setLoading(true);
    fetchContacts()
      .then(contacts => {
        console.log("haha");
        setContacts(contacts);
        setLoading(false);
        setError(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
        setError(true);
      });
  }, []);

  // sort
  const contactsSorted = contacts.sort((a: any, b: any) =>
    a.name.localeCompare(b.name),
  );
  

  const renderContact = ({item}: any) => {
    const {name, avatar, phone} = item;
    return (
      <ContactItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('Profile', {contact: item})}
      />
    );
  };

  // Render
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={contactsSorted}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
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
});

export default ContactApp;