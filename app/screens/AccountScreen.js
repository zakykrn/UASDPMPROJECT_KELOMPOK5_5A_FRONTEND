import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';
import BottomNav from '../components/BottomNav';
import { API_URL } from '../../backend/config/config';

export default function AccountScreen({ navigation }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profileImage: null
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const parsedData = JSON.parse(userDataString);
        setUserData(parsedData);
        
        // Fetch fresh data from API
        const response = await fetch(`${API_URL}/api/profile/${parsedData.email}`);
        if (response.ok) {
          const profileData = await response.json();
          setUserData(profileData);
          await AsyncStorage.setItem('userData', JSON.stringify(profileData));
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // AccountScreen.js
const handleChangePhoto = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Menggunakan MediaTypeOptions
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      selectionLimit: 1,
      presentationStyle: 'fullScreen',
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      await uploadProfileImage(result.assets[0].uri);
    }
  } catch (error) {
    console.error('Error picking image:', error);
    Alert.alert('Error', 'Failed to pick image');
  }
};

const uploadProfileImage = async (imageUri) => {
  try {
    setLoading(true);

    // Create form data
    const formData = new FormData();
    const filename = imageUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('profileImage', {
      uri: imageUri,
      type: type,
      name: filename || 'profile.jpg',
    });

    const response = await fetch(`${API_URL}/api/profile/${userData.email}/image`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const updatedUser = await response.json();
    
    // Update both state and AsyncStorage
    setUserData(prev => ({ ...prev, profileImage: updatedUser.profileImage }));
    
    const storedUserData = await AsyncStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      await AsyncStorage.setItem('userData', JSON.stringify({
        ...parsedUserData,
        profileImage: updatedUser.profileImage
      }));
    }

  } catch (error) {
    console.error('Error uploading image:', error);
    Alert.alert('Error', 'Failed to upload profile image');
  } finally {
    setLoading(false);
  }
};

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const getProfileImageSource = () => {
    if (userData.profileImage) {
      if (userData.profileImage.startsWith('http')) {
        return { uri: userData.profileImage };
      }
      return { uri: `${API_URL}${userData.profileImage}` };
    }
    return require('../../assets/default-avatar.jpg');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleChangePhoto} style={styles.imageContainer}>
            <Image 
              source={getProfileImageSource()} 
              style={styles.profileImage} 
            />
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera" size={20} color={Colors.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('EditProfile', { userData })}
          >
            <Text style={styles.optionText}>Edit Profil</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.optionText}>Pengaturan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.optionText}>Keluar</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <BottomNav navigation={navigation} activeScreen="Account" />
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
    paddingBottom: 70,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: SPACING * 3,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: SPACING,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.darkLight,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    padding: SPACING / 2,
    borderRadius: SPACING,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: SPACING / 2,
  },
  email: {
    fontSize: 16,
    color: Colors['white-smoke'],
  },
  optionsContainer: {
    marginTop: SPACING * 2,
  },
  optionButton: {
    backgroundColor: Colors.darkLight,
    padding: SPACING,
    borderRadius: SPACING,
    marginBottom: SPACING,
  },
  logoutButton: {
    backgroundColor: '#FF4B4B',
    marginTop: SPACING,
  },
  optionText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});