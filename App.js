import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { CartProvider } from './app/components/CartContext';
import HomeScreen from './app/screens/HomeScreen';
import CoffeeDetailsScreen from './app/screens/CoffeeDetailsScreen';
import ManageCoffeeScreen from './app/screens/ManageCoffeeScreen';
import FeedbackScreen from './app/screens/FeedbackScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import PaymentScreen from './app/screens/PaymentScreen';
import CartScreen from './app/screens/CartScreen';
import NotificationsScreen from './app/screens/NotificationsScreen';
import PromotionsScreen from './app/screens/PromotionsScreen';
import LoyaltyRewardsScreen from './app/screens/LoyaltyRewardsScreen';
import NotificationDetail from './app/screens/NotificationDetail';
import RewardDetailScreen from './app/screens/RewardDetailScreen';
import AccountMenu from './app/screens/AccountMenu';
import AccountScreen from './app/screens/AccountScreen';
import EditProfileScreen from './app/screens/EditProfileScreen';
import SettingsScreen from './app/screens/SettingScreen';
import FavoritesScreen from './app/screens/FavoritesScreen';
import PromotionDetailsScreen from './app/screens/PromotionDetailsScreen';
import ChangePasswordScreen from './app/screens/ChangePasswordScreen';
import LanguageScreen from './app/screens/LanguageScreen';
import PaymentMethodsScreen from './app/screens/PaymentMethodsScreen';
import AboutScreen from './app/screens/AboutScreen';
import HelpScreen from './app/screens/HelpScreen';
import CustomerServiceScreen from './app/screens/CustomerServiceScreen';
import OrderHistoryScreen from './app/screens/OrderHistoryScreen';
import OrderDetailScreen from './app/screens/OrderDetailScreen';

const Stack = createStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await getLoginStatus();
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

  const getLoginStatus = async () => {
    return false;
  };

  return (
    <CartProvider>
      <ActionSheetProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isLoggedIn ? "Home" : "Login"}
            screenOptions={{
              headerStyle: {
                backgroundColor: '#1e1e1e',
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
            }}
          >
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{
                headerShown: false
              }}
            />
            
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{
                title: 'DineDash Coffee'
              }}
            />
            
            <Stack.Screen 
              name="Details" 
              component={CoffeeDetailsScreen}
              options={{
                title: 'Detail Produk'
              }}
            />
            
            <Stack.Screen 
              name="Cart" 
              component={CartScreen}
              options={{
                title: 'Keranjang Belanja'
              }}
            />

            <Stack.Screen 
              name="OrderHistory" 
              component={OrderHistoryScreen}
              options={{
                title: 'Riwayat Pesanan',
                headerShown: false
              }}
            />
            <Stack.Screen 
              name="OrderDetail" 
              component={OrderDetailScreen}
              options={{
                headerShown: false
              }}
            />
            
            {/* Rest of your screens */}
            <Stack.Screen name="Manage Coffee" component={ManageCoffeeScreen} />
            <Stack.Screen name="Feedback" component={FeedbackScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="LoyaltyRewards" component={LoyaltyRewardsScreen} />
            <Stack.Screen name="Promotions" component={PromotionsScreen} />
            <Stack.Screen name="PromotionDetails" component={PromotionDetailsScreen} />
            <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
            <Stack.Screen name="RewardDetailScreen" component={RewardDetailScreen} />
            <Stack.Screen name="AccountMenu" component={AccountMenu} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Ubah Password' }} />
            <Stack.Screen name="Language" component={LanguageScreen} options={{ title: 'Bahasa' }} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ title: 'Metode Pembayaran' }} />
            <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Tentang Aplikasi' }} />
            <Stack.Screen name="Help" component={HelpScreen} options={{ title: 'Bantuan' }} />
            <Stack.Screen 
              name="CustomerService" 
              component={CustomerServiceScreen} 
              options={{ 
                title: 'Customer Service',
                headerShown: true 
              }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ActionSheetProvider>
    </CartProvider>
  );
}

export default App;