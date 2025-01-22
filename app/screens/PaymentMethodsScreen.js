// screens/PaymentMethodsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Tambahkan import ini
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

// ... rest of the code remains the same
export default function PaymentMethodsScreen({ navigation }) {
  const paymentMethods = [
    { id: 'dana', name: 'DANA', image: require('../../assets/payment/dana.png') },
    { id: 'gopay', name: 'GoPay', image: require('../../assets/payment/gopay.png') },
    { id: 'qris', name: 'Qris', image: require('../../assets/payment/qris.png') },
    { id: 'cash', name: 'Tunai', icon: 'cash' },
  ];

  return (
    <View style={styles.container}>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={styles.methodItem}
          onPress={() => Alert.alert('Info', `${method.name} dipilih sebagai metode pembayaran utama`)}
        >
          {method.image ? (
            <Image source={method.image} style={styles.methodImage} />
          ) : (
            <Ionicons name={method.icon} size={24} color={Colors.primary} />
          )}
          <Text style={styles.methodText}>{method.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    padding: SPACING,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING,
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    marginBottom: SPACING,
  },
  methodImage: {
    width: 40,
    height: 40,
    marginRight: SPACING,
  },
  methodText: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: SPACING,
  },
});