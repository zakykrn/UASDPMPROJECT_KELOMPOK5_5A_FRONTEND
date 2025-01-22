import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/logo.jpg')} 
          style={styles.logo}
        />
        <Text style={styles.appName}>DineDash Coffee</Text>
        <Text style={styles.version}>Versi 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tentang Kami</Text>
        <Text style={styles.description}>
          DineDash Coffee adalah aplikasi pemesanan kopi yang dirancang untuk memberikan pengalaman menikmati kopi berkualitas dengan cara yang mudah dan nyaman. Kami berkomitmen untuk menghadirkan berbagai pilihan kopi terbaik langsung ke tangan Anda.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fitur Utama</Text>
        <View style={styles.featureItem}>
          <Ionicons name="cafe" size={24} color={Colors.primary} />
          <Text style={styles.featureText}>Berbagai pilihan kopi premium</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="cart" size={24} color={Colors.primary} />
          <Text style={styles.featureText}>Pemesanan mudah dan cepat</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="gift" size={24} color={Colors.primary} />
          <Text style={styles.featureText}>Program loyalty rewards</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="notifications" size={24} color={Colors.primary} />
          <Text style={styles.featureText}>Notifikasi promo spesial</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hubungi Kami</Text>
        <View style={styles.contactItem}>
          <Ionicons name="mail" size={24} color={Colors.primary} />
          <Text style={styles.contactText}>support@dinedash.com</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="call" size={24} color={Colors.primary} />
          <Text style={styles.contactText}>+62 822-8578-0132</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="location" size={24} color={Colors.primary} />
          <Text style={styles.contactText}>Jl. Marpoyan Damai No. 265, Pekanbaru</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  logoContainer: {
    alignItems: 'center',
    padding: SPACING * 2,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: SPACING,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: SPACING / 2,
  },
  version: {
    color: Colors['white-smoke'],
    fontSize: 16,
  },
  section: {
    padding: SPACING * 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkLight,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: SPACING,
  },
  description: {
    color: Colors.white,
    lineHeight: 24,
    fontSize: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING,
  },
  featureText: {
    color: Colors.white,
    marginLeft: SPACING,
    fontSize: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING,
  },
  contactText: {
    color: Colors.white,
    marginLeft: SPACING,
    fontSize: 16,
  },
});