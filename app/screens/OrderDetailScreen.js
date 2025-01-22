import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffd700';
      case 'processing':
        return '#1e90ff';
      case 'completed':
        return '#32cd32';
      case 'cancelled':
        return '#dc143c';
      default:
        return Colors.white;
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Pesanan</Text>
      </View>

      <View style={styles.orderInfo}>
        <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: getStatusColor(order.status) }
        ]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Waktu Pesanan</Text>
        <Text style={styles.sectionText}>{formatDate(order.createdAt)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detail Pesanan</Text>
        {order.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.coffee.name}</Text>
              <Text style={styles.itemDescription} numberOfLines={1}>
                {item.coffee.description}
              </Text>
            </View>
            <View style={styles.itemPriceInfo}>
              <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              <Text style={styles.itemPrice}>
                Rp {(item.coffee.price * item.quantity).toFixed(3)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pembayaran</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Metode Pembayaran</Text>
          <Text style={styles.paymentValue}>{order.paymentMethod}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Status Pembayaran</Text>
          <Text style={[
            styles.paymentValue,
            { color: order.paymentStatus === 'paid' ? '#32cd32' : Colors.primary }
          ]}>
            {order.paymentStatus}
          </Text>
        </View>
      </View>

      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Pesanan</Text>
          <Text style={styles.totalAmount}>
            Rp {order.totalAmount.toFixed(3)}
          </Text>
        </View>
      </View>

      {order.status === 'completed' && (
        <TouchableOpacity 
          style={styles.orderAgainButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.orderAgainText}>Pesan Lagi</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.dark,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: SPACING,
      backgroundColor: Colors.darkLight,
    },
    backButton: {
      marginRight: SPACING,
    },
    headerTitle: {
      color: Colors.white,
      fontSize: 20,
      fontWeight: 'bold',
    },
    orderInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: SPACING,
      backgroundColor: Colors.darkLight,
      marginBottom: SPACING,
    },
    orderNumber: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    statusBadge: {
      paddingHorizontal: SPACING,
      paddingVertical: SPACING / 4,
      borderRadius: SPACING / 2,
    },
    statusText: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: 'bold',
    },
    section: {
      backgroundColor: Colors.darkLight,
      marginBottom: SPACING,
      padding: SPACING,
      borderRadius: SPACING,
    },
    sectionTitle: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: SPACING,
    },
    sectionText: {
      color: Colors['white-smoke'],
      fontSize: 14,
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: SPACING,
      borderBottomWidth: 1,
      borderBottomColor: Colors.dark,
    },
    itemInfo: {
      flex: 1,
      marginRight: SPACING,
    },
    itemName: {
      color: Colors.white,
      fontSize: 16,
      marginBottom: 4,
    },
    itemDescription: {
      color: Colors['white-smoke'],
      fontSize: 12,
    },
    itemPriceInfo: {
      alignItems: 'flex-end',
    },
    itemQuantity: {
      color: Colors.white,
      marginBottom: 4,
    },
    itemPrice: {
      color: Colors.primary,
      fontWeight: 'bold',
    },
    paymentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING,
    },
    paymentLabel: {
      color: Colors['white-smoke'],
      fontSize: 14,
    },
    paymentValue: {
      color: Colors.white,
      fontWeight: 'bold',
    },
    totalSection: {
      backgroundColor: Colors.darkLight,
      padding: SPACING,
      borderRadius: SPACING,
      marginBottom: SPACING * 2,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalLabel: {
      color: Colors.white,
      fontSize: 18,
      fontWeight: 'bold',
    },
    totalAmount: {
      color: Colors.primary,
      fontSize: 20,
      fontWeight: 'bold',
    },
    orderAgainButton: {
      backgroundColor: Colors.primary,
      padding: SPACING,
      borderRadius: SPACING,
      alignItems: 'center',
      marginHorizontal: SPACING,
      marginBottom: SPACING * 2,
    },
    orderAgainText: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default OrderDetailScreen;