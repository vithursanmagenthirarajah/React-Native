import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Screen4 from "./Screen4";
import Screen3 from "./Screen3";
import Screen5 from "./Screen5";


const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='S1'
                component={Screen1}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='S2'
                component={Screen2}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='S3'
                component={Screen3}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='S4'
                component={Screen4}
                options={{
                    headerShown: false,
                }}
            />
             <Stack.Screen
                name='S5'
                component={Screen5}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function SNavigator() {
    return <MyStack />;
}
