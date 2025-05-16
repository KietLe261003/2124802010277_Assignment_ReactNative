import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/app/Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { UserLogin } from '@/app/Type/UserType';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const nav = useNavigation<any>();
    const handleLogin = ()=>{
        const data:UserLogin={
            email,
            password
        }
        login(data);
    }
  return (
    <View style={styles.container}>
        <Image source={{uri: 'https://cdn.dribbble.com/users/11063009/screenshots/17737174/book_store-01_4x.jpg'}} resizeMode='contain' style={styles.logo} />
        <Text style={styles.title}>Login</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
            style={styles.input}
            placeholder={"Vui lòng nhập email"}
            placeholderTextColor="#666"
            onChangeText={setEmail}
            value={email}
        />
        <TextInput
            style={styles.input}
            placeholder={"Vui lòng nhập mật khẩu"}
            placeholderTextColor="#666"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={isLoading}>
            {isLoading ? (
                <Text style={styles.buttonText}>Loading...</Text>
            ) : (
                <Text style={styles.buttonText}>Đăng nhập</Text>
            )}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{nav.navigate('Register')}}>
            <Text style={styles.forgotPassword}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.forgotPassword}>Quên mật khẩu</Text>
        </TouchableOpacity>
    </View >
);
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: '#333',
        marginBottom: 40,
        fontFamily: 'Cairo-Bold',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        fontFamily: 'Cairo-Regular',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#53045F',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Cairo-SemiBold',
    },
    forgotPassword: {
        color: '#53045F',
        fontSize: 16,
        fontFamily: 'Cairo-Regular',
        textDecorationLine: 'underline',
        marginVertical: 10,
    },
    error: {
        color: 'red'
    }
});