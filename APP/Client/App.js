import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Main from "./screens/Common/Main";
import SignUp from "./screens/Common/SignUp"
import SignIn from "./screens/Common/SignIn"
import TempleTab from "./components/NavTab/TempleTab.js"
import BelieverTab from "./components/NavTab/BelieverTab.js"
import WelfareTab from "./components/NavTab/WelfareTab.js"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from 'react-native-paper';
import { UserProvider } from "./components/Context/UserContext.js";

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent";
  if (!fontsLoaded && !error) {
    return null;
  }
// test 
  return (
    <>
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator 
              screenOptions = {{ headerShown: false }}
              initialRouteName = "Main"
            >
              <Stack.Screen 
                name = "Main"
                component = { Main }
                options = {{ headerShown: false }}
              />
              <Stack.Screen
                name = "SignIn"
                component = { SignIn }
                options = {{ headerShown: false }}
              />
              <Stack.Screen
                name = "SignUp"
                component = { SignUp }
                options = {{ headerShown: false }}
              />
              <Stack.Screen
                name = "TempleTab"
                component = { TempleTab }
                options = {{ headerShown: false }}
              />
              <Stack.Screen
                name = "BelieverTab"
                component = { BelieverTab }
                options = {{ headerShown: false }}
              />
              <Stack.Screen
                name = "WelfareTab"
                component = { WelfareTab }
                options = {{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </UserProvider>
    </>
  );
};

const styles = StyleSheet.create({
    barStyle: {
        backgroundColor: "#FFF"
    }
})
export default App;