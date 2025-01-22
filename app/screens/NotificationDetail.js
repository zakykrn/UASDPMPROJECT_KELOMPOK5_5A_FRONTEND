// NotificationDetail.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

export default function NotificationDetail({ route }) {
  const { notification } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{notification.title}</Text>
      <Text style={styles.description}>{notification.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    padding: SPACING,
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING,
  },
  description: {
    color: Colors['white-smoke'],
    fontSize: 16,
  },
});