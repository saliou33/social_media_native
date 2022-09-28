import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Posts from './screens/Posts';
import PostDetail from './screens/PostDetail';
import Profile from './screens/Profile';
import Login from './screens/Login';
import PostForm from './screens/PostForm';
import AppContext from './context/AppContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
      tabBarIcon: ({ color, size }) => {
        const iconName =
          (route.name === 'Posts' && 'feed') ||
          (route.name === 'PostForm' && 'plus-square') ||
          (route.name === 'Profile' && 'user');

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Stack.Screen name="Posts" component={Posts} options={{ headerShown: false }} />
    <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    <Stack.Screen
      name="PostForm"
      component={PostForm}
      options={{ headerShown: false, tabBarLabel: 'Add post' }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <AppContext>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ route }) => ({
              headerTitle: getFocusedRouteNameFromRoute(route),
            })}
          />
          <Stack.Screen name="PostDetail" component={PostDetail} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext>
  );
};

export default App;
