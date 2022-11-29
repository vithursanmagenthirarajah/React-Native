import React, {useEffect} from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput, ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";
import ProgressBar from 'react-native-progress/Bar';
import axios from "axios";

export default function Screen5(props) {
    const details = props.route.params.item;
    const heading = props.route.params.head;
let arr2=[]
    console.log("details",details)
   let arr=[1,2,3];
  
    for (var key in details) {
        if (details.hasOwnProperty(key)) {
            console.log(key + " -> " + details[key]);
            let ar = []
            ar.push(key)
            ar.push(details[key])
            arr2.push(ar)
        }
    }

    console.log("details",arr2)
    //arr2=details
    return (
        <SafeAreaView style={styles.container}>
            {/* https://docs.expo.io/versions/latest/sdk/status-bar */}
            <StatusBar style="light" />

            <View style={{ paddingHorizontal: 30,flex:1,flexDirection:"column"}}>
                <View style={{alignItems:"center", flex:1}}>
                <Text style={{fontSize:35, fontWeight:"bold",marginTop:20}}>{heading}</Text>
                </View>
                <View style={{alignItems:"center",marginTop:20, flex:7}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
 
                         {arr2.map((item) => {
                            return(
                        <View style={{ padding:10, borderColor:"#c4c4c4",marginBottom:20, minWidth:"100%",flex:1,flexDirection:"column",alignItems:'center'}}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <View style={{flex:5,alignItems:'center'}}>
                                    <Text style={{fontSize:22, color:'#626262', }}>{item[0]}</Text>
                                </View>
                                <View style={{flex:2}}>
                                    <Text style={{fontSize:22, color:'#626262',alignItems:'center' }}>{item[1]}KgCO2</Text>
                                </View>
                            </View>
                            <View style={{flex:1,flexDirection:'row',marginTop:20}}>
                                <ProgressBar progress={0.3} width={250} height={15} color='#0F9500'/>
                            </View>

                        </View>
                            )
                        })}
                    </ScrollView>

                </View>

            </View>
        </SafeAreaView>
    );
}

const TEXT = {
    color: "#fff",
    textAlign: "center",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: Constants.statusBarHeight,
    },
    content: {
        paddingHorizontal: 30,
    },
    textWrapper: {
        marginTop: 60,
        marginBottom: 30,
    },
    hiText: {
        ...TEXT,
        fontSize: 20,
        lineHeight: 50,
        fontWeight: "bold",
    },
    userText: {
        ...TEXT,
        fontSize: 15,
        lineHeight: 30,
    },
    form: {
        marginBottom: 30,
    },
    iconLock: {
        color: "#929292",
        position: "absolute",
        fontSize: 16,
        top: 22,
        left: 22,
        zIndex: 10,
    },
    inputPassword: {
        height: 60,
        borderRadius: 30,
        paddingHorizontal: 30,
        fontSize: 20,
        color: "#929292",
        backgroundColor: "#fff",
        textAlign: "center",
        textAlignVertical: "center",
    },
    buttonLogin: {
        height: 50,
        borderRadius: 25,
        backgroundColor: "#8d015a",
        justifyContent: "center",
        marginTop: 15,
    },
    buttonLoginText: {
        ...TEXT,
    },
    action: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
