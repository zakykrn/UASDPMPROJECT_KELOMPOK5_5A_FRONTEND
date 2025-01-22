// NotificationsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

const notifications = [
    { id: '1', title: 'Diskon Spesial 20%', description: 'Nikmati diskon 20% untuk semua kopi hari ini!' },
    { id: '2', title: 'Promo Weekend', description: 'Dapatkan promo menarik setiap weekend di gerai kami!' },
    { id: '3', title: 'Loyalty Points', description: 'Kumpulkan loyalty points untuk mendapatkan hadiah menarik!' },
    { id: '4', title: 'Coffee Subscription', description: 'Langganan kopi kami dan nikmati kopi setiap hari dengan harga spesial!' },
    { id: '5', title: 'New Menu Alert', description: 'Kami baru saja menambahkan menu kopi baru. Cek sekarang!' },
    { id: '6', title: 'Free Delivery', description: 'Nikmati layanan pengantaran gratis untuk pembelian di atas Rp 50.000.' },
    { id: '7', title: 'Flash Sale', description: 'Jangan lewatkan flash sale kopi spesial hanya hari ini!' },
    { id: '8', title: 'Tunjukkan Bukti Pembelian', description: 'Tunjukkan bukti pembelian kopi dan dapatkan hadiah menarik!' },
    { id: '9', title: 'Exclusive Member Offer', description: 'Dapatkan penawaran eksklusif hanya untuk member kami!' },
    { id: '10', title: 'Happy Hour', description: 'Nikmati diskon 30% pada setiap pembelian mulai jam 3 sore hingga 5 sore.' },
  ];

export default function NotificationsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifikasi</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notificationItem}
            onPress={() => navigation.navigate('NotificationDetail', { notification: item })}
          >
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    padding: SPACING,
  },
  header: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING,
  },
  notificationItem: {
    backgroundColor: Colors.darkLight,
    padding: SPACING,
    borderRadius: SPACING,
    marginBottom: SPACING,
  },
  notificationTitle: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationDescription: {
    color: Colors['white-smoke'],
    fontSize: 14,
    marginTop: SPACING / 2,
  },
});
