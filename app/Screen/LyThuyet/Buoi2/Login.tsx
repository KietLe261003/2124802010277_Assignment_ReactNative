import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const checkEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
      }}>
      <Image
        source={{
          uri: 'https://firebase.google.com/images/brand-guidelines/logo-vertical.png?hl=es',
        }}
        resizeMode="contain"
        style={{alignSelf: 'center', width: 300, height: 300}}
      />
      <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center'}}>
        Welcome back!
      </Text>

      <TextInput
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        left={<TextInput.Icon icon="email" />}
      />
      <HelperText visible={email !== '' && !checkEmail(email)} type="error">
        Email không hợp lệ
      </HelperText>

      <TextInput
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isShowPassword}
        placeholder="Password"
        left={<TextInput.Icon icon="key" />}
        right={
          <TextInput.Icon
            icon={!isShowPassword ? 'eye-off' : 'eye'}
            onPress={() => setIsShowPassword(!isShowPassword)}
          />
        }
      />
      <HelperText visible={password !== '' && !checkPassword(password)} type="error">
        Password không hợp lệ
      </HelperText>

      <TouchableOpacity
        onPress={() => {
          Alert.alert('Login Info', `Email: ${email}\nPassword: ${password}`);
        }}
        style={{backgroundColor: 'orange', padding: 10, borderRadius: 5}}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register' as never);
        }}>
        <Text style={{color: 'blue', textAlign: 'center'}}>Create a new account?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ResetPassworld' as never);
        }}>
        <Text style={{color: 'blue', textAlign: 'center'}}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
