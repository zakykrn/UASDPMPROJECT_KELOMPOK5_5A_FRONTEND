import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

const SearchField = ({ onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        style={styles.searchIcon}
        size={SPACING * 2}
        color={Colors.black}  // Ganti warna ikon menjadi hitam
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Cari Kopi..."
        placeholderTextColor={Colors.black}  // Ganti warna placeholder menjadi hitam
        onChangeText={onSearch}  // Memanggil fungsi pencarian setiap kali teks diubah
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',  // Mengatur teks dan ikon dalam satu baris
    backgroundColor: 'white',  // Warna latar belakang container putih
    borderRadius: SPACING,  // Memberikan sudut melengkung pada container
    paddingHorizontal: SPACING,  // Memberikan ruang di kiri dan kanan
    alignItems: 'center',  // Menyusun ikon dan input di tengah secara vertikal
    marginHorizontal: SPACING,  // Memberikan ruang margin horizontal agar tidak menempel pada sisi layar
    marginBottom: SPACING,  // Memberikan jarak bawah agar lebih rapi
  },
  searchInput: {
    flex: 1,  // Menggunakan seluruh ruang yang tersisa setelah ikon
    color: 'black',  // Menentukan warna teks menjadi hitam
    fontSize: SPACING * 1.7,
    paddingVertical: SPACING / 2,  // Menambah ruang atas dan bawah pada input
    paddingLeft: SPACING * 2,  // Memberikan jarak antara teks dan ikon pencarian
  },
  searchIcon: {
    marginRight: SPACING,  // Memberikan jarak antara ikon dan input
  },
});

export default SearchField;
