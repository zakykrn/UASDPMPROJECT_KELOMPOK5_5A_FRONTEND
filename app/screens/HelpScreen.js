import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

// Panduan Pemesanan Component
const OrderGuideContent = () => {
  const steps = [
    {
      number: '1',
      title: 'Pilih Menu',
      description: 'Pilih menu kopi favorit Anda dari berbagai kategori yang tersedia'
    },
    {
      number: '2',
      title: 'Atur Jumlah',
      description: 'Tentukan jumlah pesanan yang Anda inginkan'
    },
    {
      number: '3',
      title: 'Keranjang',
      description: 'Tambahkan ke keranjang dan periksa pesanan Anda'
    },
    {
      number: '4',
      title: 'Pembayaran',
      description: 'Pilih metode pembayaran dan selesaikan transaksi'
    }
  ];

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.contentTitle}>Panduan Pemesanan</Text>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>{step.number}</Text>
          </View>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// Kebijakan Privasi Component
const PrivacyPolicyContent = () => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.contentTitle}>Kebijakan Privasi</Text>
      <Text style={styles.contentText}>
        DineDash Coffee berkomitmen untuk melindungi privasi pengguna. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
      </Text>

      <Text style={styles.sectionTitle}>Informasi yang Kami Kumpulkan</Text>
      <Text style={styles.contentText}>
        • Data pribadi (nama, email, nomor telepon){'\n'}
        • Informasi pesanan dan riwayat transaksi{'\n'}
        • Preferensi dan pilihan menu{'\n'}
        • Data penggunaan aplikasi
      </Text>

      <Text style={styles.sectionTitle}>Penggunaan Informasi</Text>
      <Text style={styles.contentText}>
        • Memproses pesanan dan pembayaran{'\n'}
        • Mengirim notifikasi terkait pesanan{'\n'}
        • Meningkatkan layanan kami{'\n'}
        • Program loyalitas dan promosi
      </Text>

      <Text style={styles.sectionTitle}>Keamanan Data</Text>
      <Text style={styles.contentText}>
        Kami menggunakan langkah-langkah keamanan yang ketat untuk melindungi data Anda dari akses yang tidak sah atau pengungkapan.
      </Text>
    </View>
  );
};

// Syarat dan Ketentuan Component
const TermsContent = () => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.contentTitle}>Syarat dan Ketentuan</Text>

      <Text style={styles.sectionTitle}>1. Penggunaan Aplikasi</Text>
      <Text style={styles.contentText}>
        Dengan menggunakan aplikasi ini, Anda menyetujui untuk terikat oleh syarat dan ketentuan yang berlaku. Anda bertanggung jawab untuk menjaga kerahasiaan akun Anda.
      </Text>

      <Text style={styles.sectionTitle}>2. Pemesanan dan Pembayaran</Text>
      <Text style={styles.contentText}>
        • Harga yang tercantum adalah harga final{'\n'}
        • Pembayaran harus dilakukan sebelum pesanan diproses{'\n'}
        • Pembatalan pesanan tunduk pada kebijakan yang berlaku
      </Text>

      <Text style={styles.sectionTitle}>3. Pengiriman</Text>
      <Text style={styles.contentText}>
        • Waktu pengiriman dapat bervariasi{'\n'}
        • Kami tidak bertanggung jawab atas keterlambatan di luar kendali kami
      </Text>

      <Text style={styles.sectionTitle}>4. Program Loyalitas</Text>
      <Text style={styles.contentText}>
        • Poin reward tidak dapat ditukar dengan uang{'\n'}
        • Kami berhak mengubah ketentuan program loyalitas
      </Text>
    </View>
  );
};

// Main Help Screen Component
export default function HelpScreen({ navigation }) {
  const [activeSection, setActiveSection] = useState(null);

  const helpCategories = [
    {
      title: 'Panduan Pemesanan',
      icon: 'book',
      content: OrderGuideContent
    },
    {
      title: 'Kebijakan Privasi',
      icon: 'shield-checkmark',
      content: PrivacyPolicyContent
    },
    {
      title: 'Syarat dan Ketentuan',
      icon: 'document-text',
      content: TermsContent
    },
    {
      title: 'Customer Service',
      icon: 'headset',
      screen: 'CustomerService'
    }
  ];

  const renderContent = () => {
    if (!activeSection) return null;
    const category = helpCategories.find(cat => cat.title === activeSection);
    if (category?.content) {
      const ContentComponent = category.content;
      return <ContentComponent />;
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bantuan</Text>
        <View style={styles.categoriesContainer}>
          {helpCategories.map((category, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.categoryItem}
              onPress={() => {
                if (category.screen) {
                  navigation.navigate(category.screen);
                } else {
                  setActiveSection(category.title);
                }
              }}
            >
              <Ionicons name={category.icon} size={24} color={Colors.primary} />
              <Text style={styles.categoryText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {renderContent()}

      {activeSection && (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setActiveSection(null)}
        >
          <Text style={styles.backButtonText}>Kembali ke Menu Utama</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  section: {
    padding: SPACING * 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: SPACING * 2,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: Colors.darkLight,
    padding: SPACING * 1.5,
    borderRadius: SPACING,
    marginBottom: SPACING,
    alignItems: 'center',
  },
  categoryText: {
    color: Colors.white,
    marginTop: SPACING,
    fontSize: 14,
    textAlign: 'center',
  },
  contentContainer: {
    padding: SPACING * 2,
    backgroundColor: Colors.darkLight,
    margin: SPACING * 2,
    borderRadius: SPACING,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: SPACING * 2,
  },
  contentText: {
    color: Colors['white-smoke'],
    fontSize: 14,
    lineHeight: 20,
    marginBottom: SPACING,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: SPACING * 2,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING,
  },
  stepNumber: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: SPACING / 2,
  },
  stepDescription: {
    color: Colors['white-smoke'],
    fontSize: 14,
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: Colors.primary,
    padding: SPACING,
    borderRadius: SPACING,
    alignItems: 'center',
    margin: SPACING * 2,
  },
  backButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
});