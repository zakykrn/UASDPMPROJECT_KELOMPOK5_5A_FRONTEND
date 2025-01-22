// app/screens/ManageCoffeeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import Colors from '../config/colors';
import SPACING from '../config/SPACING';

const ManageCoffeeScreen = () => {
  const [coffees, setCoffees] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleAddCoffee = () => {
    if (!name || !description || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    const newCoffee = { id: Date.now(), name, description, price };
    setCoffees([...coffees, newCoffee]);
    setName('');
    setDescription('');
    setPrice('');
  };

  const handleDeleteCoffee = (id) => {
    setCoffees(coffees.filter((coffee) => coffee.id !== id));
  };

  return (
    <View style={{ flex: 1, padding: SPACING, backgroundColor: Colors.dark }}>
      <Text style={{ color: Colors.white, fontSize: 20 }}>Manage Coffees</Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor={Colors['white-smoke']}
        style={{ backgroundColor: Colors.darkLight, padding: SPACING, borderRadius: SPACING, color: Colors.white, marginBottom: SPACING }}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Description"
        placeholderTextColor={Colors['white-smoke']}
        style={{ backgroundColor: Colors.darkLight, padding: SPACING, borderRadius: SPACING, color: Colors.white, marginBottom: SPACING }}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Price"
        placeholderTextColor={Colors['white-smoke']}
        keyboardType="numeric"
        style={{ backgroundColor: Colors.darkLight, padding: SPACING, borderRadius: SPACING, color: Colors.white, marginBottom: SPACING }}
        value={price}
        onChangeText={setPrice}
      />
      <TouchableOpacity onPress={handleAddCoffee} style={{ backgroundColor: Colors.primary, padding: SPACING, borderRadius: SPACING }}>
        <Text style={{ color: Colors.white, textAlign: 'center' }}>Add Coffee</Text>
      </TouchableOpacity>
      <FlatList
        data={coffees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: SPACING }}>
            <Text style={{ color: Colors.white }}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleDeleteCoffee(item.id)}>
              <Text style={{ color: Colors.primary }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ManageCoffeeScreen;
