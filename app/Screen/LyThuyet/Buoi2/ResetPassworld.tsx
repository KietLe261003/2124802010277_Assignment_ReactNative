import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

const ResetPassworld = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const checkEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 10,
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'left'}}>
        Reset your password!
      </Text>
      <TextInput
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        left={<TextInput.Icon icon="email" />}
      />
      <HelperText visible={checkEmail(email)} type={'error'}>
        Email không hợp lệ
      </HelperText>
      <TouchableOpacity
        onPress={() => {
          console.log('Quên mật khẩu');
        }}
        style={{backgroundColor: 'orange', padding: 10, borderRadius: 5}}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
          Send Reset Email
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login' as never);
        }}>
        <Text style={{color: 'blue', textAlign: 'center'}}>
          Go back to login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassworld;