import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../config/colors';

const CustomDrawerContent = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.link}>Beranda</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Manage Coffee')}>
        <Text style={styles.link}>Kelola Kopi</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
        <Text style={styles.link}>Umpan Balik</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: Colors.dark },
  link: { fontSize: 18, color: Colors.white, marginBottom: 20 },
  logout: { fontSize: 18, color: Colors.primary, marginTop: 20 },
});

export default CustomDrawerContent;
