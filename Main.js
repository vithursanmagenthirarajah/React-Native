import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Stacks
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Screen4 from "./Screen4";
import Screen3 from "./Screen3";
import SNavigator from "./Navigator";


const Tab = createBottomTabNavigator();

const Main = () => {

    return (
        <Tab.Navigator
            initialRouteName="Screen1"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: '#0F9500',
            }}
        >
            <Tab.Screen
                name="Screen1"
                component={SNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                    ),
                    headerShown:false
                }}
            />

            <Tab.Screen
                name="Screen2"

                component={Screen2}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="user" color={color} size={30} />
                    ),
                    headerShown:false
                }}
            />

            <Tab.Screen
                name="Screen3"

                component={Screen3}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="bell" color={color} size={30} />
                    ),
                    headerShown:false
                }}
            />


            <Tab.Screen
                name="Screen4"

                component={Screen4}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="lock" color={color} size={30} />
                    ),
                    headerShown:false
                }}
            />


        </Tab.Navigator>
    );
};

export default Main;
