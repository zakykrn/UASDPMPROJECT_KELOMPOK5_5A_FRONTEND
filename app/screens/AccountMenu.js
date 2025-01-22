import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../config/colors';

export default function AccountMenu({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Account')}
      >
        <Text style={styles.menuText}>Akun</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.menuText}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark,
  },
  menuItem: {
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.darkLight,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  menuText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
