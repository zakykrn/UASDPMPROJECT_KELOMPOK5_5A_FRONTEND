// components/BottomNav.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

const BottomNav = ({ navigation, activeScreen }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.bottomNavItem} 
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons 
          name="home" 
          size={24} 
          color={activeScreen === 'Home' ? Colors.primary : Colors.white} 
        />
        <Text style={[styles.bottomNavText, activeScreen === 'Home' && styles.activeText]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.bottomNavItem}
        onPress={() => navigation.navigate('Promotions')}
      >
        <Ionicons 
          name="pricetag" 
          size={24} 
          color={activeScreen === 'Promotions' ? Colors.primary : Colors.white} 
        />
        <Text style={[styles.bottomNavText, activeScreen === 'Promotions' && styles.activeText]}>Promo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.bottomNavItem}
        onPress={() => navigation.navigate('LoyaltyRewards')}
      >
        <Ionicons 
          name="gift" 
          size={24} 
          color={activeScreen === 'LoyaltyRewards' ? Colors.primary : Colors.white} 
        />
        <Text style={[styles.bottomNavText, activeScreen === 'LoyaltyRewards' && styles.activeText]}>Rewards</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.bottomNavItem}
        onPress={() => navigation.navigate('Account')}
      >
        <Ionicons 
          name="person" 
          size={24} 
          color={activeScreen === 'Account' ? Colors.primary : Colors.white} 
        />
        <Text style={[styles.bottomNavText, activeScreen === 'Account' && styles.activeText]}>Akun</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: Colors.darkLight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },
  bottomNavItem: {
    alignItems: 'center',
  },
  bottomNavText: {
    color: Colors.white,
    fontSize: 12,
    marginTop: 2,
  },
  activeText: {
    color: Colors.primary,
  }
});

export default BottomNav;