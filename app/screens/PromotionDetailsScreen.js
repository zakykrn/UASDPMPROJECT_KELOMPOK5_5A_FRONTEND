// PromotionDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

const PromotionDetailsScreen = ({ route, navigation }) => {
  const { title, description, discount } = route.params; // Receive the promotion data (including discount)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Kembali</Text>
      </TouchableOpacity>

      {/* New Order Now button */}
      <TouchableOpacity 
        style={[styles.button, styles.orderButton]} 
        onPress={() => 
          navigation.navigate('Home', { promotion: { title, discount } }) // Pass promotion data
        }
      >
        <Text style={styles.buttonText}>Pesan Sekarang</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    padding: SPACING,
  },
  title: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: SPACING,
  },
  description: {
    color: Colors['white-smoke'],
    fontSize: 16,
    marginBottom: SPACING * 2,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
    marginBottom: SPACING,
  },
  orderButton: {
    backgroundColor: Colors.secondary, // Choose a different color for "Pesan Sekarang" button
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default PromotionDetailsScreen;
