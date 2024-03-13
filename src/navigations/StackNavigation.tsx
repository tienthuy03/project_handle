import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Post from '../screens/Post';
import Bookmark from '../screens/Bookmark';

const Stack = createStackNavigator();

function App() {
   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName="Home"
         >
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Post" component={Post} options={{ headerShown: false }} />
            <Stack.Screen name="Bookmark" component={Bookmark} options={{ headerShown: false }} />

         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default App;