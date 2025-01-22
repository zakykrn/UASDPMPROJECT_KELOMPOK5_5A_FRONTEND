import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';
import BottomNav from '../components/BottomNav';
import { API_URL } from '../../backend/config/config';

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Fetch orders from API and update local storage
  const fetchOrders = async () => {
    try {
      setError(null);
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(userDataString);

      if (!userData?.email) {
        throw new Error('User not logged in');
      }

      const response = await fetch(`${API_URL}/api/orders/user/${userData.email}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const ordersData = await response.json();
      
      // Sort orders by date (newest first)
      const sortedOrders = ordersData.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(sortedOrders);
      await AsyncStorage.setItem('orders', JSON.stringify(sortedOrders));
      
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.message);
      
      // Try to load from cache if API fails
      try {
        const cachedOrders = await AsyncStorage.getItem('orders');
        if (cachedOrders) {
          setOrders(JSON.parse(cachedOrders));
        }
      } catch (cacheError) {
        console.error('Error loading from cache:', cacheError);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchOrders();
  }, []);

  // Refresh when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchOrders();
    });
    return unsubscribe;
  }, [navigation]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return '#1e90ff';
      case 'completed':
        return '#32cd32';
      case 'cancelled':
        return '#dc143c';
      default:
        return '#ffd700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'Diproses';
      case 'completed':
        return 'Selesai';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return 'Menunggu';
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetail', { order: item })}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderNumber}>Order #{item.orderNumber}</Text>
          <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <View style={styles.itemsList}>
        {item.items.map((orderItem, index) => (
          <View key={index} style={styles.orderItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{orderItem.coffee.name}</Text>
              <Text style={styles.itemQuantity}>x{orderItem.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>
              Rp {(parseFloat(orderItem.coffee.price) * orderItem.quantity).toFixed(3)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.orderFooter}>
        <View>
          <Text style={styles.paymentLabel}>Total Pembayaran</Text>
          <Text style={styles.paymentMethod}>
            Via {item.paymentMethod ? item.paymentMethod.toUpperCase() : 'TUNAI'}
          </Text>
        </View>
        <Text style={styles.totalAmount}>
          Rp {parseFloat(item.totalAmount).toFixed(3)}
        </Text>
      </View>
      
      {item.points > 0 && (
        <View style={styles.pointsEarned}>
          <Ionicons name="star" size={16} color={Colors.primary} />
          <Text style={styles.pointsText}>
            Mendapatkan {item.points} poin
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Memuat riwayat pesanan...</Text>
      </View>
    );
  }

  if (error && orders.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="warning" size={48} color={Colors.primary} />
        <Text style={styles.errorText}>Gagal memuat pesanan</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchOrders}
        >
          <Text style={styles.retryButtonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Riwayat Pesanan</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="home-outline" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color={Colors.primary} />
            <Text style={styles.emptyText}>Belum ada pesanan</Text>
            <TouchableOpacity 
              style={styles.orderButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.orderButtonText}>Pesan Sekarang</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={item => item.orderNumber}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={Colors.primary}
              />
            }
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <BottomNav navigation={navigation} activeScreen="Account" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  content: {
    flex: 1,
    padding: SPACING,
    paddingBottom: 70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING * 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  backButton: {
    backgroundColor: Colors.darkLight,
    padding: SPACING,
    borderRadius: SPACING,
  },
  orderCard: {
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    padding: SPACING * 1.5,
    marginBottom: SPACING,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING,
  },
  orderNumber: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDate: {
    color: Colors['white-smoke'],
    fontSize: 12,
    marginTop: 4,
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
  itemsList: {
    marginBottom: SPACING,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING / 2,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    color: Colors.white,
    flex: 1,
  },
  itemQuantity: {
    color: Colors['white-smoke'],
    marginHorizontal: SPACING,
  },
  itemPrice: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark,
    marginVertical: SPACING,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  paymentLabel: {
    color: Colors.white,
    fontSize: 14,
  },
  paymentMethod: {
    color: Colors['white-smoke'],
    fontSize: 12,
    marginTop: 4,
  },
  totalAmount: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointsEarned: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING,
    padding: SPACING / 2,
    backgroundColor: Colors.dark,
    borderRadius: SPACING / 2,
    alignSelf: 'flex-start',
  },
  pointsText: {
    color: Colors.white,
    fontSize: 12,
    marginLeft: SPACING / 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark,
  },
  loadingText: {
    color: Colors.white,
    marginTop: SPACING,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark,
    padding: SPACING,
  },
  errorText: {
    color: Colors.white,
    fontSize: 16,
    marginVertical: SPACING,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: Colors.primary,
    padding: SPACING,
    borderRadius: SPACING,
    marginTop: SPACING,
  },
  retryButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.white,
    fontSize: 16,
    marginVertical: SPACING,
  },
  orderButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: SPACING * 2,
    paddingVertical: SPACING,
    borderRadius: SPACING,
    marginTop: SPACING,
  },
  orderButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: SPACING * 2,
  }
});

export default OrderHistoryScreen;