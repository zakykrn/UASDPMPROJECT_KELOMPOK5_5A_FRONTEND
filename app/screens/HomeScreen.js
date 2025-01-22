import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';
import SearchField from '../components/SearchField';
import coffees from '../config/coffees';
import categories from '../config/categories';
import { useActionSheet } from '@expo/react-native-action-sheet';

export default function HomeScreen({ navigation }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const [filteredCoffees, setFilteredCoffees] = useState(coffees);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fungsi untuk menampilkan action sheet
  const handleActionSheet = () => {
    const options = ['Keluar', 'Batal'];
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          navigation.replace('Login');
        }
      }
    );
  };

  // Header kustom
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Text style={styles.headerTitle}>DineDash Coffee</Text>
      ),
      headerTitle: () => null, // Menghilangkan title default
      headerRight: () => (
        <View style={styles.headerRight}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('OrderHistory')}
        >
          <Ionicons name="receipt-outline" size={24} color={Colors.white} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={handleActionSheet}
        >
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
      ),
    });
  }, [navigation]);

  const filterCoffees = (categoryId) => {
    const filtered = categoryId === null
      ? coffees
      : coffees.filter((coffee) => coffee.categoryId === categoryId);
    setFilteredCoffees(filtered);
    setSelectedCategory(categoryId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = query
      ? coffees.filter((coffee) =>
          coffee.name.toLowerCase().includes(query.toLowerCase())
        )
      : coffees;
    setFilteredCoffees(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.content}>
          <SearchField onSearch={handleSearch} />
          
          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => filterCoffees(category.id)}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
              >
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Coffee List */}
          <View style={styles.coffeeGrid}>
            {filteredCoffees.map((coffee) => (
              <TouchableOpacity
                key={coffee.id}
                style={styles.coffeeCard}
                onPress={() => navigation.navigate('Details', { coffee })}
              >
                <Image source={coffee.image} style={styles.coffeeImage} />
                <Text style={styles.coffeeName}>{coffee.name}</Text>
                <Text style={styles.coffeePrice}>Rp {coffee.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.bottomNavItem} 
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home" size={24} color={Colors.primary} />
          <Text style={styles.bottomNavText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('Promotions')}
        >
          <Ionicons name="pricetag" size={24} color={Colors.white} />
          <Text style={styles.bottomNavText}>Promo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('LoyaltyRewards')}
        >
          <Ionicons name="gift" size={24} color={Colors.white} />
          <Text style={styles.bottomNavText}>Rewards</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('Account')}
        >
          <Ionicons name="person" size={24} color={Colors.white} />
          <Text style={styles.bottomNavText}>Akun</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: SPACING, // Menambahkan margin kiri
    flex: 1, // Memastikan text mengambil ruang yang tersedia
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING,
  },
  iconButton: {
    marginLeft: SPACING,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 70, // Memberikan ruang untuk bottom navigation
  },
  content: {
    padding: SPACING,
  },
  categoriesScroll: {
    marginVertical: SPACING,
  },
  categoryButton: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 2,
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    marginRight: SPACING,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    color: Colors.white,
    fontSize: 16,
  },
  coffeeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  coffeeCard: {
    width: '48%',
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    padding: SPACING,
    marginBottom: SPACING,
  },
  coffeeImage: {
    width: '100%',
    height: 150,
    borderRadius: SPACING,
    marginBottom: SPACING / 2,
  },
  coffeeName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  coffeePrice: {
    color: Colors.primary,
    marginTop: SPACING / 2,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: Colors.darkLight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
  },
  bottomNavItem: {
    alignItems: 'center',
  },
  bottomNavText: {
    color: Colors.white,
    fontSize: 12,
    marginTop: 2,
  },
});