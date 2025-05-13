import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { useAuth } from '@/app/Config/AuthContext';

const Setting = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đăng xuất', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>
      <Button title="Đăng xuất" onPress={handleLogout} color="#f44336" />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
