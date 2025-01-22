import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

export default function SettingsScreen({ navigation }) {
  // State untuk switch toggles
  const [notifications, setNotifications] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [location, setLocation] = useState(false);

  // Fungsi untuk handle logout
  const handleLogout = () => {
    navigation.replace('Login');
  };

  const renderSettingItem = ({ icon, title, value, onValueChange, type = 'switch' }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={Colors.primary} />
        <Text style={styles.settingText}>{title}</Text>
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: Colors.darkLight, true: Colors.primary }}
          thumbColor={Colors.white}
        />
      ) : (
        <Ionicons name="chevron-forward" size={24} color={Colors.white} />
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Pengaturan Notifikasi */}
      <Text style={styles.sectionTitle}>Notifikasi</Text>
      {renderSettingItem({
        icon: 'notifications-outline',
        title: 'Notifikasi Push',
        value: notifications,
        onValueChange: setNotifications
      })}
      {renderSettingItem({
        icon: 'mail-outline',
        title: 'Email Notifikasi',
        value: emailNotif,
        onValueChange: setEmailNotif
      })}
      {renderSettingItem({
        icon: 'pricetag-outline',
        title: 'Notifikasi Promo',
        value: promoNotif,
        onValueChange: setPromoNotif
      })}

      {/* Pengaturan Privasi */}
      <Text style={styles.sectionTitle}>Privasi & Keamanan</Text>
      {renderSettingItem({
        icon: 'location-outline',
        title: 'Izinkan Akses Lokasi',
        value: location,
        onValueChange: setLocation
      })}
      {renderSettingItem({
        icon: 'moon-outline',
        title: 'Mode Gelap',
        value: darkMode,
        onValueChange: setDarkMode
      })}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('ChangePassword')}
      >
        <View style={styles.settingLeft}>
          <Ionicons name="key-outline" size={24} color={Colors.primary} />
          <Text style={styles.settingText}>Ubah Password</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.white} />
      </TouchableOpacity>

      {/* Pengaturan Akun */}
      <Text style={styles.sectionTitle}>Akun</Text>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('Language')}
      >
        <View style={styles.settingLeft}>
          <Ionicons name="language-outline" size={24} color={Colors.primary} />
          <Text style={styles.settingText}>Bahasa</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('PaymentMethods')}
      >
        <View style={styles.settingLeft}>
          <Ionicons name="card-outline" size={24} color={Colors.primary} />
          <Text style={styles.settingText}>Metode Pembayaran</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.white} />
      </TouchableOpacity>

      {/* Informasi & Bantuan */}
      <Text style={styles.sectionTitle}>Informasi & Bantuan</Text>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('About')}
      >
        <View style={styles.settingLeft}>
          <Ionicons name="information-circle-outline" size={24} color={Colors.primary} />
          <Text style={styles.settingText}>Tentang Aplikasi</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('Help')}
      >
        <View style={styles.settingLeft}>
          <Ionicons name="help-circle-outline" size={24} color={Colors.primary} />
          <Text style={styles.settingText}>Bantuan</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.white} />
      </TouchableOpacity>

      {/* Tombol Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>

      {/* Version Info */}
      <Text style={styles.versionText}>Versi 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    padding: SPACING,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: SPACING * 2,
    marginBottom: SPACING,
  },
  settingItem: {
    backgroundColor: Colors.darkLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING,
    borderRadius: SPACING,
    marginBottom: SPACING,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: SPACING,
  },
  logoutButton: {
    backgroundColor: '#FF4B4B',
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
    marginTop: SPACING * 2,
    marginBottom: SPACING,
  },
  logoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionText: {
    color: Colors['white-smoke'],
    textAlign: 'center',
    fontSize: 14,
    marginBottom: SPACING * 2,
  },
});