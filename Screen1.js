import React, {useCallback, useState} from "react";
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
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";

export default function Screen1(props) {

   let arr=[1,2,3];
    const [arr2, setArr2] = useState([]);
    useFocusEffect(
        useCallback(async () => {

                        await axios.get('http://192.168.8.179:5000/read').then((res)=>{
                            console.log("read",res.data)
                            setArr2(res.data)

                        }).catch((err)=>{
                            console.log("err",err)
                        })

        }, []))


    const x = async function () {
        await axios.get('http://localhost:5000/read')
            .then((res) => {
                console.log(res.json())
            })
            .then((data) => console.log(data))
            .catch((error) => {
                console.log(error)
            })
    }

    const handleView = async function () {
        await axios.get('http://192.168.8.179:5000/readOne')
            .then((data) => {console.log("data",data.data)
             props.navigation.navigate("S5", {item:data})})
            .catch((error) => {
                console.log(error)
            })
         //props.navigation.navigate("S2")
        console.log("ok")
    }


    return (
        <SafeAreaView style={styles.container}>
            {/* https://docs.expo.io/versions/latest/sdk/status-bar */}
            <StatusBar style="light" />
            <View style={{ paddingHorizontal: 30,flex:1,flexDirection:"column"}}>
                <View style={{alignItems:"center", flex:1}}>

                <Text style={{fontSize:35, fontWeight:"bold",marginTop:20}}>Optimization</Text>
                </View>
                <View style={{alignItems:"center",marginTop:20, flex:7}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {arr2.map((item) => {
                    return(
                        <TouchableOpacity onPress={()=> {
                            console.log(item.Output)
                            props.navigation.navigate("S5", {item:item.Output,head:item.optimization_name})

                        }} style={{borderRadius:5, border:2, padding:15, borderWidth:1, borderColor:"#0F9500",marginBottom:30, minWidth:"100%",alignItems:'center'}}>
                            <Text style={{fontSize:20, color:'#0F9500', fontWeight:'bold'}}> {item.optimization_name}</Text>
                        </TouchableOpacity>
                    )
                })}
                    </ScrollView>
                </View>
<View style={{flex:1,alignItems:'center'}}>
    <TouchableOpacity
        onPress={() =>
            props.navigation.navigate("S2")
        }
        style={{borderRadius:5,  padding:15,  backgroundColor:"#0F9500",marginBottom:10, minWidth:"100%",alignItems:'center'}}>
        <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}> Create Optimization</Text>
    </TouchableOpacity>
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
