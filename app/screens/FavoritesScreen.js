import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

export default function FavoritesScreen({ route }) {
  const { favorites } = route.params; // Mengambil daftar kopi favorit yang dikirim

  // Filter kopi yang memiliki isFavorite: true
  const favoriteCoffees = favorites.filter(coffee => coffee.isFavorite);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Kopi Favorit</Text>
      {favoriteCoffees.length === 0 ? (
        <Text style={styles.noResultsText}>Belum ada kopi favorit</Text>
      ) : (
        <FlatList
          data={favoriteCoffees}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.coffeeCard}>
              <Image source={item.image} style={styles.coffeeImage} />
              <Text style={styles.coffeeName}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text> 
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    padding: SPACING,
  },
  pageTitle: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: SPACING * 2,
  },
  coffeeCard: {
    backgroundColor: Colors.darkLight,
    borderRadius: SPACING,
    padding: SPACING,
    marginBottom: SPACING,
  },
  coffeeImage: {
    width: '100%',
    height: 180,
    borderRadius: SPACING,
    resizeMode: 'cover',
  },
  coffeeName: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginTop: SPACING,
  },
  noResultsText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginTop: SPACING * 2,
  },
  description: {
    color: Colors.white, // Set description text color to white
    fontSize: 14,
    marginTop: SPACING,
  },
});
