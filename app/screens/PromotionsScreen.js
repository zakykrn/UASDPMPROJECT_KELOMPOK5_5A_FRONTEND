import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';
import BottomNav from '../components/BottomNav';

const promotions = [
  { id: '1', title: 'Diskon 50% untuk Minuman Kedua', description: 'Berlaku untuk pembelian hingga 31 Desember 2024.', icon: 'pricetag' },
  { id: '2', title: 'Promo Hari Ulang Tahun', description: 'Dapatkan minuman gratis di hari ulang tahun Anda!', icon: 'gift' },
  { id: '3', title: 'Cashback 20%', description: 'Dapatkan cashback 20% untuk pembayaran menggunakan GoPay.', icon: 'card' }
];

export default function PromotionsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Promosi Terkini</Text>
      <FlatList
        data={promotions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.promotionItem}
            onPress={() => navigation.navigate('PromotionDetails', { 
              title: item.title, 
              description: item.description 
            })}
          >
            <View style={styles.promotionHeader}>
              <Ionicons name={item.icon} size={30} color={Colors.primary} />
              <Text style={styles.promotionTitle}>{item.title}</Text>
            </View>
            <Text style={styles.promotionDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <BottomNav navigation={navigation} activeScreen="Promotions" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  listContent: {
    padding: SPACING,
    paddingBottom: 80, // Memberikan ruang untuk bottom navigation
  },
  header: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    padding: SPACING,
  },
  promotionItem: {
    backgroundColor: Colors.darkLight,
    padding: SPACING,
    borderRadius: SPACING,
    marginBottom: SPACING,
  },
  promotionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING / 2,
  },
  promotionTitle: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: SPACING,
    flex: 1,
  },
  promotionDescription: {
    color: Colors.white,
    fontSize: 14,
  }
});