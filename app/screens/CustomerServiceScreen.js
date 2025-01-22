import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

export default function CustomerServiceScreen() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'cs',
      message: 'Halo! Ada yang bisa kami bantu?',
      time: '10:00',
      type: 'text'
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [csRating, setCsRating] = useState(0);
  const scrollViewRef = useRef();

  // Fungsi untuk mengirim pesan
  const sendMessage = async (content, type = 'text') => {
    if ((type === 'text' && !content.trim()) || !content) return;

    const newMessage = {
      id: chatHistory.length + 1,
      sender: 'user',
      message: content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type
    };

    setChatHistory(prev => [...prev, newMessage]);
    setMessage('');

    // Auto reply dari CS
    setTimeout(() => {
      const csResponse = {
        id: chatHistory.length + 2,
        sender: 'cs',
        message: 'Terima kasih atas pesan Anda. Customer service kami akan segera merespons.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setChatHistory(prev => [...prev, csResponse]);
    }, 1000);
  };

  // Fungsi untuk upload gambar
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        sendMessage(result.assets[0].uri, 'image');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memilih gambar');
    }
  };

  // Fungsi untuk voice message
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow microphone access');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setIsRecording(false);
      setRecording(null);
      sendMessage(uri, 'audio');
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  // Fungsi untuk rating CS
  const handleRating = (rating) => {
    setCsRating(rating);
    Alert.alert('Terima kasih!', 'Rating Anda telah dikirim');
  };

  const renderMessage = (item) => {
    const isCS = item.sender === 'cs';

    return (
      <View
        key={item.id}
        style={[
          styles.messageContainer,
          isCS ? styles.csMessage : styles.userMessage
        ]}
      >
        {item.type === 'text' && (
          <Text style={styles.messageText}>{item.message}</Text>
        )}
        {item.type === 'image' && (
          <Image source={{ uri: item.message }} style={styles.imageMessage} />
        )}
        {item.type === 'audio' && (
          <TouchableOpacity style={styles.audioContainer}>
            <Ionicons name="play" size={24} color={Colors.white} />
            <Text style={styles.audioText}>Voice Message</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.csInfo}>
          <View style={styles.csAvatar}>
            <Ionicons name="headset" size={24} color={Colors.white} />
          </View>
          <View>
            <Text style={styles.csName}>Customer Service</Text>
            <Text style={styles.csStatus}>Online</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleRating(star)}
            >
              <Ionicons
                name={star <= csRating ? 'star' : 'star-outline'}
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {chatHistory.map(renderMessage)}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.attachButton}>
          <Ionicons name="image" size={24} color={Colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPressIn={startRecording}
          onPressOut={stopRecording}
          style={styles.micButton}
        >
          <Ionicons
            name={isRecording ? "radio-button-on" : "mic"}
            size={24}
            color={isRecording ? Colors.primary : Colors.white}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Ketik pesan..."
          placeholderTextColor={Colors['white-smoke']}
          multiline
        />

        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={() => sendMessage(message)}
        >
          <Ionicons name="send" size={24} color={message.trim() ? Colors.primary : Colors['white-smoke']} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  header: {
    padding: SPACING,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkLight,
  },
  csInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  csAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING,
  },
  csName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  csStatus: {
    color: '#4CAF50',
    fontSize: 14,
  },
  chatContainer: {
    flex: 1,
    padding: SPACING,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: SPACING,
    padding: SPACING,
    borderRadius: SPACING,
  },
  csMessage: {
    backgroundColor: Colors.darkLight,
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
  },
  messageText: {
    color: Colors.white,
    fontSize: 16,
  },
  timeText: {
    color: Colors['white-smoke'],
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: SPACING,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.darkLight,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    padding: SPACING,
    color: Colors.white,
    maxHeight: 100,
    marginRight: SPACING,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
    imageMessage: {
      width: 200,
      height: 200,
      borderRadius: SPACING,
      marginBottom: SPACING / 2,
    },
    audioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.darkLight,
      padding: SPACING,
      borderRadius: SPACING,
    },
    audioText: {
      color: Colors.white,
      marginLeft: SPACING,
    },
    attachButton: {
      padding: SPACING / 2,
    },
    micButton: {
      padding: SPACING / 2,
    },
    ratingContainer: {
      flexDirection: 'row',
      marginTop: SPACING / 2,
    },
});