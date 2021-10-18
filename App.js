import React, { Component } from "react";
import { View, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import EntryDetail from "./components/EntryDetail";
import Live from "./components/Live";
import { setLocalNotification } from "./utils/helpers";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === "ios" ? 78 : 56,
          backgroundColor: Platform.OS === "ios" ? white : purple,
          shadowColor: "rgba(0, 0, 0, 0.24)",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
        tabBarActiveTintColor: Platform.OS === "ios" ? purple : white,
      }}
    >
      <Tabs.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: "HISTORY",
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddEntry"
        component={AddEntry}
        options={{
          tabBarLabel: "ADD ENTRY",
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="plus-square" size={30} color={tintColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="Live"
        component={Live}
        options={{
          tabBarLabel: "Live",
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-speedometer" size={30} color={tintColor} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EntryDetail"
          component={EntryDetail}
          options={{
            headerTintColor: white,
            headerStyle: {
              backgroundColor: purple,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MyStack />
        </View>
      </Provider>
    );
  }
}
