import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';
import { API_URL } from '../../backend/config/config';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !name) {
      Alert.alert('Error', 'Mohon isi semua field.');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password tidak cocok.');
      return;
    }
  
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Simpan data user ke AsyncStorage dengan role
        const userData = {
          name,
          email,
          role: email === 'admin@dinedash.com' ? 'admin' : 'user' // Tambahkan pengecekan role
        };
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        
        Alert.alert('Sukses', 'Registrasi berhasil!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } else {
        Alert.alert('Error', data.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Tidak dapat terhubung ke server');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nama"
        placeholderTextColor={Colors['white-smoke']}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors['white-smoke']}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors['white-smoke']}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Konfirmasi Password"
        placeholderTextColor={Colors['white-smoke']}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginLinkText}>
          Sudah punya akun? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: Colors.dark,
    padding: SPACING * 2
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: Colors.white, 
    marginBottom: SPACING * 2 
  },
  input: { 
    width: '100%', 
    padding: SPACING, 
    backgroundColor: Colors.darkLight, 
    borderRadius: SPACING, 
    color: Colors.white, 
    marginBottom: SPACING 
  },
  button: { 
    backgroundColor: Colors.primary, 
    padding: SPACING, 
    borderRadius: SPACING, 
    alignItems: 'center', 
    width: '100%',
    marginTop: SPACING
  },
  buttonText: { 
    color: Colors.white, 
    fontWeight: 'bold' 
  },
  loginLink: {
    marginTop: SPACING * 2
  },
  loginLinkText: {
    color: Colors.primary,
    fontWeight: '600'
  }
});

export default RegisterScreen;