import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert, 
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
// Tambahkan import ini di bagian atas file
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';
import { API_URL } from '../../backend/config/config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Mohon isi email dan password.');
      return;
    }
  
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Cek apakah email adalah admin
        const isAdmin = email === 'admin@dinedash.com'; // atau sesuaikan dengan email admin Anda
        
        // Simpan data user ke AsyncStorage termasuk role
        const userData = {
          name: data.user.name,
          email: data.user.email,
          role: isAdmin ? 'admin' : 'user', // Menambahkan role
        };
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
  
        // Navigate berdasarkan role
        if (isAdmin) {
          navigation.replace('Admin');
        } else {
          navigation.replace('Home');
        }
      } else {
        Alert.alert('Error', data.error || 'Email atau password salah');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Tidak dapat terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.welcomeText}>Selamat datang di DineDash!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors['white-smoke']}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            placeholderTextColor={Colors['white-smoke']}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Belum punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupLink}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    padding: SPACING,
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING * 2,
    alignItems: 'center',
  },
  welcomeText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: SPACING * 2,
  },
  input: {
    width: '100%',
    padding: SPACING,
    backgroundColor: Colors.dark,
    borderRadius: SPACING,
    marginBottom: SPACING,
    color: Colors.white,
    fontSize: 16,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  passwordInput: {
    paddingRight: SPACING * 3,
  },
  eyeIcon: {
    position: 'absolute',
    right: SPACING,
    top: '30%',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: SPACING,
    borderRadius: SPACING,
    width: '100%',
    alignItems: 'center',
    marginTop: SPACING,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: SPACING,
  },
  signupText: {
    color: Colors['white-smoke'],
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default LoginScreen;