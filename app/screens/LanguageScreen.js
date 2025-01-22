import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Tambahkan import ini
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

// ... rest of the code remains the same

export default function LanguageScreen({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState('id');

  const languages = [
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'en', name: 'English' },
  ];

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    Alert.alert('Sukses', 'Bahasa berhasil diubah', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={styles.languageItem}
          onPress={() => handleLanguageSelect(lang.code)}
        >
          <Text style={styles.languageText}>{lang.name}</Text>
          {selectedLanguage === lang.code && (
            <Ionicons name="checkmark" size={24} color={Colors.primary} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    padding: SPACING,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING,
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    marginBottom: SPACING,
  },
  languageText: {
    color: Colors.white,
    fontSize: 16,
  },
});