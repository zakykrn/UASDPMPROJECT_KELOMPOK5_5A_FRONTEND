// RewardDetailScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

export default function RewardDetailScreen({ route, navigation }) {
  const { rewardMessage } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hadiah Anda</Text>
      <Text style={styles.message}>{rewardMessage}</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    padding: SPACING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING,
  },
  message: {
    color: Colors['white-smoke'],
    fontSize: 16,
    textAlign: 'center',
    marginBottom: SPACING * 2,
  },
  backButton: {
    backgroundColor: Colors.primary,
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
  },
  backButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});
