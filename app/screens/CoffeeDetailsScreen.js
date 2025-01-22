import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useCart } from '../components/CartContext';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

export default function CoffeeDetailsScreen({ route, navigation }) {
  const { coffee } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(coffee.isFavorite || false);

  const handleQuantityChange = (increment) => {
    setQuantity(prev => {
      const newQuantity = prev + increment;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  const handleAddToCart = () => {
    addToCart(coffee, quantity);
    navigation.navigate('Cart');
  };

  const calculateTotal = () => {
    return (parseFloat(coffee.price) * quantity).toFixed(3);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={coffee.image} style={styles.image} />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"}
            size={28}
            color={isFavorite ? Colors.primary : Colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{coffee.name}</Text>
        <Text style={styles.description}>{coffee.description}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Harga:</Text>
          <Text style={styles.price}>Rp {coffee.price}</Text>
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Jumlah:</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(-1)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>Rp {calculateTotal()}</Text>
        </View>

        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={24} color={Colors.white} />
          <Text style={styles.addToCartText}>Tambah ke Keranjang</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buyNowButton}
          onPress={() => navigation.navigate('Payment', { coffee, quantity })}
        >
          <Text style={styles.buyNowText}>Beli Sekarang</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING,
    right: SPACING,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: SPACING / 2,
    borderRadius: SPACING,
  },
  detailsContainer: {
    padding: SPACING * 2,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING,
  },
  description: {
    color: Colors['white-smoke'],
    fontSize: 16,
    marginBottom: SPACING * 2,
    lineHeight: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING * 2,
  },
  priceLabel: {
    color: Colors.white,
    fontSize: 18,
    marginRight: SPACING,
  },
  price: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING * 2,
  },
  quantityLabel: {
    color: Colors.white,
    fontSize: 18,
    marginRight: SPACING,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: Colors.primary,
    width: 35,
    height: 35,
    borderRadius: SPACING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    color: Colors.white,
    fontSize: 18,
    marginHorizontal: SPACING * 2,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING * 2,
  },
  totalLabel: {
    color: Colors.white,
    fontSize: 18,
    marginRight: SPACING,
  },
  totalPrice: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING,
    borderRadius: SPACING,
    marginBottom: SPACING,
  },
  addToCartText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: SPACING,
  },
  buyNowButton: {
    backgroundColor: Colors.darkLight,
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
  },
  buyNowText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});