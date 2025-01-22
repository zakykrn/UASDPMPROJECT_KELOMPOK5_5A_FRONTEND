import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';
import BottomNav from '../components/BottomNav';

export default function LoyaltyRewardsScreen({ navigation, route }) {
  const [points, setPoints] = useState(150);
  const { newPoints } = route.params || {};

  useEffect(() => {
    if (newPoints) {
      setPoints((prevPoints) => prevPoints + newPoints);
    }
  }, [newPoints]);

  const handleRedeem = () => {
    if (points >= 100) {
      setPoints(points - 100);
      navigation.navigate('RewardDetailScreen', {
        rewardMessage: 'Selamat! Anda telah menerima voucher diskon 50%.'
      });
    } else {
      Alert.alert('Poin Tidak Cukup', 'Anda membutuhkan minimal 100 poin.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Loyalty Rewards</Text>
        <Text style={styles.points}>Poin Anda: {points}</Text>
        <TouchableOpacity style={styles.redeemButton} onPress={handleRedeem}>
          <Text style={styles.redeemButtonText}>Tukar 100 Poin</Text>
        </TouchableOpacity>
      </View>
      <BottomNav navigation={navigation} activeScreen="LoyaltyRewards" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  content: {
    flex: 1,
    padding: SPACING,
    paddingBottom: 80, // Memberikan ruang untuk bottom navigation
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING,
  },
  points: {
    color: Colors.white,
    fontSize: 18,
    marginBottom: SPACING * 2,
  },
  redeemButton: {
    backgroundColor: Colors.primary,
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
  },
  redeemButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  }
});