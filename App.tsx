import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import { RootStackParamsList } from './screens/RootStackParams';

const RootStack = createStackNavigator<RootStackParamsList>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          options={{
            headerShown: false
          }}
          name="Home"
          component={HomeScreen} />
        <RootStack.Screen
          options={{
            headerShown: false
          }}
          name="ProductDetail"
          component={ProductDetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
