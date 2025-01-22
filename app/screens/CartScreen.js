// CartScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../components/CartContext';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

const CartScreen = ({ navigation }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    clearCart 
  } = useCart();

  // Menangani proses checkout
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigation.navigate('Payment', { 
        cartItems: cartItems,  // Kirim semua item dari keranjang
        totalAmount: getCartTotal() // Kirim total keseluruhan
      });
    }
  };

  const handleClearCart = () => {
    Alert.alert(
      "Hapus Keranjang",
      "Apakah anda yakin ingin mengosongkan keranjang?",
      [
        {
          text: "Batal",
          style: "cancel"
        },
        { 
          text: "Ya", 
          onPress: () => clearCart() 
        }
      ]
    );
  };

  const handleRemoveItem = (itemId) => {
    Alert.alert(
      "Hapus Item",
      "Apakah anda yakin ingin menghapus item ini?",
      [
        {
          text: "Batal",
          style: "cancel"
        },
        { 
          text: "Ya", 
          onPress: () => removeFromCart(itemId)
        }
      ]
    );
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={48} color={Colors.primary} />
        <Text style={styles.emptyText}>Keranjang Masih Kosong</Text>
        <TouchableOpacity 
          style={styles.shopButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.shopButtonText}>Mulai Belanja</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Keranjang Belanja</Text>
      
      <ScrollView style={styles.itemList}>
        {cartItems.map((item) => {
          if (!item || !item.coffee) return null;
          
          return (
            <View key={item.coffee.id} style={styles.cartItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.coffee.name}</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>
                  {item.coffee.description}
                </Text>
                <Text style={styles.itemPrice}>Rp {item.coffee.price}</Text>
              </View>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.coffee.id, item.quantity - 1)}
                  style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
                  disabled={item.quantity <= 1}
                >
                  <Ionicons name="remove" size={20} color={Colors.white} />
                </TouchableOpacity>
                
                <Text style={styles.quantityText}>{item.quantity}</Text>
                
                <TouchableOpacity
                  onPress={() => updateQuantity(item.coffee.id, item.quantity + 1)}
                  style={styles.quantityButton}
                >
                  <Ionicons name="add" size={20} color={Colors.white} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleRemoveItem(item.coffee.id)}
                  style={styles.removeButton}
                >
                  <Ionicons name="trash-outline" size={20} color={Colors.white} />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.itemSubtotal}>
                Subtotal: Rp {(item.coffee.price * item.quantity).toFixed(3)}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Pembayaran:</Text>
          <Text style={styles.totalAmount}>Rp {getCartTotal()}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.buttonText}>Lanjut ke Pembayaran</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearCart}
        >
          <Text style={styles.buttonText}>Hapus Semua</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Lanjut Belanja</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    padding: SPACING,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING,
  },
  emptyText: {
    color: Colors.white,
    fontSize: 18,
    marginVertical: SPACING,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING * 2,
  },
  itemList: {
    flex: 1,
  },
  cartItem: {
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    padding: SPACING,
    marginBottom: SPACING,
  },
  itemInfo: {
    marginBottom: SPACING,
  },
  itemName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: Colors['white-smoke'],
    fontSize: 14,
    marginVertical: SPACING / 2,
  },
  itemPrice: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  itemSubtotal: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'right',
    marginTop: SPACING,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  quantityButton: {
    backgroundColor: Colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING / 2,
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityText: {
    color: Colors.white,
    fontSize: 16,
    marginHorizontal: SPACING,
  },
  removeButton: {
    backgroundColor: '#dc3545',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.darkLight,
    paddingTop: SPACING,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING,
  },
  totalLabel: {
    color: Colors.white,
    fontSize: 18,
  },
  totalAmount: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
    marginBottom: SPACING,
  },
  clearButton: {
    backgroundColor: '#dc3545',
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
    marginBottom: SPACING,
  },
  continueButton: {
    backgroundColor: Colors.darkLight,
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  shopButton: {
    backgroundColor: Colors.primary,
    padding: SPACING,
    borderRadius: SPACING,
    minWidth: 150,
    alignItems: 'center',
  },
  shopButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;