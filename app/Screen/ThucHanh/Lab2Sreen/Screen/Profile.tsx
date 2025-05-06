import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ContactThumbnail from '../Component/ContactThumbnail';
import DetailListItem from '../Component/DetailListItem';


const Profile = ({route, navigation}: any) => {
  const {contact} = route.params;

  const {avatar, name, email, phone, cell} = contact;
  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        <DetailListItem icon="mail" title="Email" subtitle={email ?? ''} />
        <DetailListItem icon="phone" title="Work" subtitle={phone ?? ''} />
        <DetailListItem
          icon="smartphone"
          title="Personal"
          subtitle={cell ?? ''}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});