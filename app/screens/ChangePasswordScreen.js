// screens/ChangePasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Mohon isi semua field');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Password baru tidak cocok');
      return;
    }

    Alert.alert(
      'Sukses',
      'Password berhasil diubah',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Password Saat Ini"
        placeholderTextColor={Colors['white-smoke']}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Password Baru"
        placeholderTextColor={Colors['white-smoke']}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Konfirmasi Password Baru"
        placeholderTextColor={Colors['white-smoke']}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Ubah Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    padding: SPACING,
  },
  input: {
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    padding: SPACING,
    color: Colors.white,
    marginBottom: SPACING,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
    marginTop: SPACING,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});