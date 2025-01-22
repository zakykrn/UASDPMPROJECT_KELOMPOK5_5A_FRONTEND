import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';
import { API_URL } from '../../backend/config/config';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthDate: new Date(),
    profileImage: null
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const storedUserData = JSON.parse(userDataString);
        
        // Fetch fresh data from API
        const response = await fetch(`${API_URL}/api/profile/${storedUserData.email}`);
        if (response.ok) {
          const profileData = await response.json();
          setUserData({
            ...profileData,
            birthDate: profileData.birthDate ? new Date(profileData.birthDate) : new Date()
          });
          
          // Update local storage with fresh data
          await AsyncStorage.setItem('userData', JSON.stringify(profileData));
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      Alert.alert('Error', 'Gagal memuat profil');
    }
  };

  const handleImagePick = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow access to your photo library');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        await uploadProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const uploadProfileImage = async (uri) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('profileImage', {
        uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });

      const response = await fetch(`${API_URL}/api/profile/${userData.email}/image`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(prev => ({ ...prev, profileImage: updatedUser.profileImage }));
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
        Alert.alert('Success', 'Profile image updated successfully');
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload profile image');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/profile/${userData.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          birthDate: userData.birthDate.toISOString(),
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
        Alert.alert('Success', 'Profile updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setUserData(prev => ({ ...prev, birthDate: selectedDate }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleImagePick} disabled={loading}>
          {userData.profileImage ? (
            <Image 
              source={{ uri: `${API_URL}${userData.profileImage}` }} 
              style={styles.profileImage} 
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="person" size={60} color={Colors.white} />
            </View>
          )}
          <View style={styles.editIconContainer}>
            <Ionicons name="camera" size={20} color={Colors.white} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nama</Text>
        <TextInput
          style={styles.input}
          value={userData.name}
          onChangeText={(text) => setUserData(prev => ({ ...prev, name: text }))}
          placeholder="Masukkan nama"
          placeholderTextColor={Colors['white-smoke']}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={userData.email}
          editable={false}
        />

        <Text style={styles.label}>Nomor Telepon</Text>
        <TextInput
          style={styles.input}
          value={userData.phoneNumber}
          onChangeText={(text) => setUserData(prev => ({ ...prev, phoneNumber: text }))}
          placeholder="Masukkan nomor telepon"
          placeholderTextColor={Colors['white-smoke']}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Alamat</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={userData.address}
          onChangeText={(text) => setUserData(prev => ({ ...prev, address: text }))}
          placeholder="Masukkan alamat"
          placeholderTextColor={Colors['white-smoke']}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Tanggal Lahir</Text>
        <TouchableOpacity 
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {userData.birthDate.toLocaleDateString('id-ID')}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={userData.birthDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.disabledButton]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: SPACING * 2,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.darkLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    padding: SPACING / 2,
    borderRadius: SPACING,
  },
  formContainer: {
    padding: SPACING * 2,
  },
  label: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: SPACING / 2,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    padding: SPACING,
    color: Colors.white,
    fontSize: 16,
    marginBottom: SPACING * 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  disabledInput: {
    opacity: 0.7,
  },
  datePickerButton: {
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    padding: SPACING,
    marginBottom: SPACING * 2,
  },
  dateText: {
    color: Colors.white,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
    marginTop: SPACING,
  },
  disabledButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;