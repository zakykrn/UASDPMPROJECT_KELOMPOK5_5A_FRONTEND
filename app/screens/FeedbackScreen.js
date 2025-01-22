import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (!feedback) {
      Alert.alert('Kesalahan', 'Silakan masukkan umpan balik Anda.');
      return;
    }
    Alert.alert('Terima kasih!', 'Umpan balik Anda telah dikirim.');
    setFeedback('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Umpan Balik</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Tulis umpan balik Anda di sini..."
        placeholderTextColor={Colors['white-smoke']}
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Kirim Umpan Balik</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: SPACING, backgroundColor: Colors.dark, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.white, marginBottom: SPACING * 2 },
  textArea: { width: '90%', height: 150, padding: SPACING, backgroundColor: Colors.darkLight, borderRadius: SPACING, color: Colors.white, marginBottom: SPACING },
  button: { backgroundColor: Colors.primary, padding: SPACING, borderRadius: SPACING, width: '90%' },
  buttonText: { color: Colors.white, fontWeight: 'bold', textAlign: 'center' },
});

export default FeedbackScreen;
