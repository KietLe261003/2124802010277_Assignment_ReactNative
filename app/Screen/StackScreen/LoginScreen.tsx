import InputText from '@/app/Component/InputText';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ImageBackground,
  Image
} from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Logging in with: Username: ${username}, Password: ${password}`);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://tse2.mm.bing.net/th?id=OIP.BQiwUsWr-ClVmFWlRSWuDAHaEK&pid=Api&P=0&h=180' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image style={styles.banner} source={{uri: 'https://a-static.besthdwallpaper.com/itachi-uchiha-from-naruto-shippuden-for-desktop-wallpaper-1600x900-56031_47.jpg'}}></Image>
        <View style={{width: '80%'}}>
          <Text style={{textAlign: 'right'}}>REGISTER</Text>
        </View>
        <InputText content={username} setContent={setUsername} placeholder='User Name'/>
        <InputText content={password} setContent={setPassword} placeholder='Password' />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    padding: 20,
  },
  banner: {
    width: '80%',
    height: 200
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#FF4500', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  registerButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFD700', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;