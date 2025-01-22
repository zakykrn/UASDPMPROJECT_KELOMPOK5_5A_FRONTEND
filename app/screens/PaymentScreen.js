import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';
import { API_URL } from '../../backend/config/config';

const paymentMethods = [
  { id: 'dana', name: 'Dana', image: require('../../assets/payment/dana.png') },
  { id: 'qris', name: 'QRIS', image: require('../../assets/payment/qris.png') },
  { id: 'brimo', name: 'BRI', image: require('../../assets/payment/brimo.png') },
  { id: 'bni', name: 'BNI', image: require('../../assets/payment/bni.png') },
  { id: 'gopay', name: 'GoPay', image: require('../../assets/payment/gopay.png') },
  { id: 'bca', name: 'BCA', image: require('../../assets/payment/bca.png') },
];

const PaymentScreen = ({ route, navigation }) => {
  const { cartItems, coffee, quantity, totalAmount } = route.params;
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedTransfer, setSelectedTransfer] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk menghitung total pembayaran
  const calculateTotal = () => {
    if (totalAmount) return parseFloat(totalAmount);
    if (cartItems) {
      return cartItems.reduce((sum, item) => 
        sum + (parseFloat(item.coffee.price) * item.quantity), 0
      );
    }
    return parseFloat(coffee.price) * quantity;
  };

  // Fungsi untuk menghitung poin
  const calculatePoints = () => {
    const totalItems = cartItems 
      ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
      : quantity;
    return Math.floor(totalItems * 10); // 10 poin per item
  };

  // Fungsi untuk menyimpan pesanan ke database
  const saveOrder = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(userDataString);

      if (!userData) {
        throw new Error('User data not found');
      }

      const orderItems = cartItems ? cartItems : [{ coffee, quantity }];
      
      const orderData = {
        userId: userData.email,
        orderNumber: `ORD-${Date.now()}`,
        items: orderItems.map(item => ({
          coffee: {
            id: item.coffee.id,
            name: item.coffee.name,
            price: item.coffee.price,
            description: item.coffee.description,
          },
          quantity: item.quantity
        })),
        totalAmount: calculateTotal(),
        paymentMethod: selectedTransfer || paymentMethod || 'TUNAI',
        paymentStatus: 'paid',
        status: 'processing',
        points: calculatePoints(),
        createdAt: new Date().toISOString()
      };

      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to save order');
      }

      const savedOrder = await response.json();

      // Update local cache
      const existingOrders = await AsyncStorage.getItem('orders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(savedOrder);
      await AsyncStorage.setItem('orders', JSON.stringify(orders));

      return savedOrder;

    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  };

  // Handle pembayaran
  const handlePayment = async () => {
    if (!paymentMethod && !selectedTransfer) {
      Alert.alert('Error', 'Silakan pilih metode pembayaran');
      return;
    }

    try {
      setIsLoading(true);
      const points = calculatePoints();
      const total = calculateTotal();
      const orderData = await saveOrder();

      // Clear cart if payment is successful
      if (cartItems) {
        await AsyncStorage.removeItem('cartItems');
      }

      setModalContent({
        title: paymentMethod === 'cash' ? 'Pembayaran Tunai' : 'Pembayaran Berhasil',
        message: `Total: Rp ${total.toFixed(3)}\nMetode: ${orderData.paymentMethod}\nPoin: ${points} poin\n\nTerima kasih atas pesanan Anda!`
      });
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Error', 'Gagal memproses pembayaran. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Ringkasan Pesanan */}
      <View style={styles.orderSummary}>
        <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
        
        {cartItems ? (
          cartItems.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.coffee.name}</Text>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>
                Rp {(parseFloat(item.coffee.price) * item.quantity).toFixed(3)}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{coffee.name}</Text>
              <Text style={styles.itemQuantity}>x{quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>
              Rp {(parseFloat(coffee.price) * quantity).toFixed(3)}
            </Text>
          </View>
        )}

        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Pembayaran:</Text>
          <Text style={styles.totalAmount}>
            Rp {calculateTotal().toFixed(3)}
          </Text>
        </View>
        <View style={styles.pointsInfo}>
          <Ionicons name="star" size={20} color={Colors.primary} />
          <Text style={styles.pointsText}>
            Anda akan mendapatkan {calculatePoints()} poin!
          </Text>
        </View>
      </View>

      {/* Metode Pembayaran */}
      <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
      
      {/* Opsi Tunai */}
      <TouchableOpacity
        style={[styles.paymentOption, paymentMethod === 'cash' && styles.selectedOption]}
        onPress={() => {
          setPaymentMethod('cash');
          setSelectedTransfer('');
        }}
      >
        <Ionicons name="cash-outline" size={24} color={Colors.white} />
        <Text style={styles.paymentText}>Tunai</Text>
      </TouchableOpacity>

      {/* Opsi E-Wallet */}
      <TouchableOpacity
        style={[styles.paymentOption, paymentMethod === 'transfer' && styles.selectedOption]}
        onPress={() => setPaymentMethod('transfer')}
      >
        <Ionicons name="wallet-outline" size={24} color={Colors.white} />
        <Text style={styles.paymentText}>E-Wallet</Text>
      </TouchableOpacity>

      {/* Pilihan E-Wallet */}
      {paymentMethod === 'transfer' && (
        <View style={styles.walletOptions}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.walletOption,
                selectedTransfer === method.id && styles.selectedWallet
              ]}
              onPress={() => setSelectedTransfer(method.id)}
            >
              <Image source={method.image} style={styles.walletImage} />
              <Text style={styles.walletText}>{method.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Tombol Bayar */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={handlePayment}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.payButtonText}>Bayar Sekarang</Text>
        )}
      </TouchableOpacity>

      {/* Modal Konfirmasi */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalContent.title}</Text>
            <Text style={styles.modalMessage}>{modalContent.message}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.reset({
                  index: 1,
                  routes: [
                    { name: 'Home' },
                    { name: 'OrderHistory' }
                  ],
                });
              }}
            >
              <Text style={styles.modalButtonText}>Lihat Pesanan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    padding: SPACING,
  },
  orderSummary: {
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    padding: SPACING * 2,
    marginBottom: SPACING * 2,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: SPACING,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  itemQuantity: {
    color: Colors['white-smoke'],
    fontSize: 14,
    marginTop: 4,
  },
  itemPrice: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark,
    marginVertical: SPACING,
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  pointsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark,
    padding: SPACING,
    borderRadius: SPACING / 2,
    marginTop: SPACING,
  },
  pointsText: {
    color: Colors.white,
    marginLeft: SPACING / 2,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkLight,
    padding: SPACING,
    borderRadius: SPACING,
    marginBottom: SPACING,
  },
  selectedOption: {
    backgroundColor: Colors.primary,
  },
  paymentText: {
    color: Colors.white,
    marginLeft: SPACING,
    fontSize: 16,
  },
  walletOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SPACING,
  },
  walletOption: {
    width: '31%',
    backgroundColor: Colors.darkLight,
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
    marginBottom: SPACING,
  },
  selectedWallet: {
    backgroundColor: Colors.primary,
  },
  walletImage: {
    width: 40,
    height: 40,
    marginBottom: SPACING / 2,
  },
  walletText: {
    color: Colors.white,
    fontSize: 14,
  },
  payButton: {
    backgroundColor: Colors.primary,
    padding: SPACING * 1.5,
    borderRadius: SPACING,
    alignItems: 'center',
    marginTop: SPACING * 2,
  },
  payButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    padding: SPACING * 2,
    width: '80%',
  },
  modalTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: SPACING,
  },
  modalMessage: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: SPACING * 2,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: Colors.primary,
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
  },
  modalButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;